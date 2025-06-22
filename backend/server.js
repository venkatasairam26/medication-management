const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const app = express();
app.use(express.json());
app.use(cors());
const dbPath = path.join(__dirname, "medicationManagement.db");
let db = null;

const initializeDBAndServer = async () => {
    try {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(3001, () => {
            console.log("Server is running on http://localhost:3001");
        })
    } catch (error) {
        console.log("DB Error :", error);
        process.exit(1);
    }
}   
initializeDBAndServer();

const authenticateToken = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    if (authHeader !== undefined) {
        jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
        response.status(401).send("Unauthorized");
    } else {
        jwt.verify(jwtToken, "SECRET_KEY", (error, payload) => {
            if (error) {
                response.status(401).send("Unauthorized");
            } else {
               console.log(payload);
                next();
            }
        })
    }
}

app.post("/register", async (request, response) => {
    const { email, password,role } = request.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const selectUserQuery = `SELECT * FROM users WHERE email = "${email}"`;
    const dbUser = await db.get(selectUserQuery);
    if (dbUser === undefined) {
        const createUserQuery = `INSERT INTO users (email, password,role) VALUES ("${email}", "${hashedPassword}", "${role}")`;
        await db.run(createUserQuery);
        const selectUserQuery = `SELECT * FROM users WHERE email = "${email}"`;
        const dbUser = await db.get(selectUserQuery);
        const payload = {email:email}
        const jwtToken = jwt.sign(payload,"SECRET_KEY")
        response.send({message:"User created successfully",jwtToken});
    } else {
        response.status(400).send({error:"User already exists"});
    }
});

app.post("/login", async (request,response) => {
    const {email,password} = request.body;
    const selectUserQuery = `SELECT * FROM users WHERE email = '${email}'`
    const user = await db.get(selectUserQuery);
    if(user === undefined){
        response.status(400).send({error:"Invalid user"})
    }else{
        const isPasswordMatched = await bcrypt.compare(password,user.password);
        if(isPasswordMatched){
            const payload = {email:email}
            const jwtToken = jwt.sign(payload,"SECRET_KEY")
            response.send({message:"Login successful", jwtToken})
        }else{
            response.status(400).send({error:"Invalid password"})
        }
    }

})

app.get("/medication", authenticateToken, async (request, response) => {
    const {email} = request.body;
    console.log(email);
    const selectMedicationQuery = `SELECT medication.medicationName, medication.dosage, medication.usage_time, medication.isTaken FROM medication JOIN users ON medication.user_id = users.id WHERE users.email = "${email}"`;
    const medication = await db.all(selectMedicationQuery);
    console.log(medication);
    response.send(medication);
});

app.post("/medication", authenticateToken, async (request, response) => {
    const { medicationName, dosage, usage_time, isTaken } = request.body;
    console.log(request.body);
    const insertMedicationQuery = `INSERT INTO medication (medicationName, dosage, usage_time, isTaken) VALUES ("${medicationName}", "${dosage}", "${usage_time}", ${false})`;
    await db.run(insertMedicationQuery);
    response.send("Medication added successfully");
});

app.put("/medication/:id", authenticateToken, async (request, response) => {
    const id = request.params.id;
    const getMedicationQuery = `SELECT * FROM medication WHERE id = ${id}`;
    const medication = await db.get(getMedicationQuery);
    const { medicationName, dosage, usage_time, isTaken } = medication;
    const updateMedicationQuery = `UPDATE medication SET medicationName = "${medicationName}", dosage = "${dosage}", usage_time = "${usage_time}", isTaken = ${true} WHERE id = ${id}`;
    await db.run(updateMedicationQuery);
    response.send("Medication updated successfully");
});

app.delete("/medication/:id", authenticateToken, async (request, response) => {
    const deleteMedicationQuery = `DELETE FROM medication WHERE id = ${request.params.id}`;
    await db.run(deleteMedicationQuery);
    response.send("Medication deleted successfully");
});





