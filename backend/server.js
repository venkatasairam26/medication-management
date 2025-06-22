require('dotenv').config();
const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { body, validationResult } = require('express-validator');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '10kb' }));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
});

app.use('/api/', limiter);

const dbPath = path.join(__dirname, process.env.DB_PATH || "medicationManagement.db");
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const SALT_ROUNDS = 10;

let db = null;

const initializeDB = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });

        await db.exec(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                email TEXT UNIQUE NOT NULL,
                password TEXT NOT NULL,
                role TEXT NOT NULL,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            );
            
            CREATE TABLE IF NOT EXISTS medication (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                medicationName TEXT NOT NULL,
                dosage TEXT NOT NULL,
                usage_time TEXT NOT NULL,
                isTaken BOOLEAN DEFAULT 0,
                createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id)
            );
        `);

        console.log('Database connected and tables verified');
        return db;
    } catch (error) {
        console.error('Database Error:', error);
        process.exit(1);
    }
};

const authenticateToken = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        const token = authHeader && authHeader.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ error: 'Access token required' });
        }
        
        jwt.verify(token, JWT_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ error: 'Invalid or expired token' });
            }
            req.user = user;
            next();
        });
    } catch (error) {
        console.error('Authentication error:', error);
        return res.status(500).json({ error: 'Internal server error during authentication' });
    }
};

const validate = (validations) => {
    return async (req, res, next) => {
        await Promise.all(validations.map(validation => validation.run(req)));
        
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }
        
        return res.status(400).json({ errors: errors.array() });
    };
};

app.post('/api/register', [
    body('email').isEmail().normalizeEmail(),
    body('password').isLength({ min: 6 }),
    body('role').isIn(['patient', 'caretaker'])
], validate([]), async (req, res) => {
    try {
        const { email, password, role } = req.body;
        
        const existingUser = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser) {
            return res.status(409).json({ error: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        
        const result = await db.run(
            'INSERT INTO users (email, password, role) VALUES (?, ?, ?)',
            [email, hashedPassword, role]
        );
        
        const token = jwt.sign(
            { userId: result.lastID, email, role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.status(201).json({
            message: 'User registered successfully',
            token,
            user: { id: result.lastID, email, role }
        });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.post('/api/login', [
    body('email').isEmail().normalizeEmail(),
    body('password').exists()
], validate([]), async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const user = await db.get('SELECT * FROM users WHERE email = ?', [email]);
        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign(
            { userId: user.id, email: user.email, role: user.role },
            JWT_SECRET,
            { expiresIn: '24h' }
        );
        
        res.json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                email: user.email,
                role: user.role
            }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/medications', authenticateToken, async (req, res) => {
    try {
        const medications = await db.all(
            'SELECT * FROM medication WHERE user_id = ? ORDER BY usage_time',
            [req.user.userId]
        );
        res.json(medications);
    } catch (error) {
        console.error('Error fetching medications:', error);
        res.status(500).json({ error: 'Failed to fetch medications' });
    }
});

app.post('/api/medications', [
    authenticateToken,
    body('medicationName').trim().notEmpty(),
    body('dosage').trim().notEmpty(),
    body('usage_time').isISO8601().toDate()
], validate([]), async (req, res) => {
    try {
        const { medicationName, dosage, usage_time } = req.body;
        
        const result = await db.run(
            'INSERT INTO medication (user_id, medicationName, dosage, usage_time) VALUES (?, ?, ?, ?)',
            [req.user.userId, medicationName, dosage, usage_time]
        );
        
        const newMedication = await db.get(
            'SELECT * FROM medication WHERE id = ?',
            [result.lastID]
        );
        
        res.status(201).json({
            message: 'Medication added successfully',
            medication: newMedication
        });
    } catch (error) {
        console.error('Error adding medication:', error);
        res.status(500).json({ error: 'Failed to add medication' });
    }
});

app.put('/api/medications/:id', [
    authenticateToken,
    body('isTaken').isBoolean()
], validate([]), async (req, res) => {
    try {
        const { id } = req.params;
        const { isTaken } = req.body;
        
        const medication = await db.get(
            'SELECT * FROM medication WHERE id = ? AND user_id = ?',
            [id, req.user.userId]
        );
        
        if (!medication) {
            return res.status(404).json({ error: 'Medication not found' });
        }
        
        await db.run(
            'UPDATE medication SET isTaken = ? WHERE id = ?',
            [isTaken, id]
        );
        
        res.json({ message: 'Medication updated successfully' });
    } catch (error) {
        console.error('Error updating medication:', error);
        res.status(500).json({ error: 'Failed to update medication' });
    }
});

app.delete('/api/medications/:id', authenticateToken, async (req, res) => {
    try {
        const { id } = req.params;
        
        const medication = await db.get(
            'SELECT * FROM medication WHERE id = ? AND user_id = ?',
            [id, req.user.userId]
        );
        
        if (!medication) {
            return res.status(404).json({ error: 'Medication not found' });
        }
        
        await db.run('DELETE FROM medication WHERE id = ?', [id]);
        
        res.json({ message: 'Medication deleted successfully' });
    } catch (error) {
        console.error('Error deleting medication:', error);
        res.status(500).json({ error: 'Failed to delete medication' });
    }
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

app.use((req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

const PORT = process.env.PORT || 3001;

const startServer = async () => {
    try {
        await initializeDB();
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
