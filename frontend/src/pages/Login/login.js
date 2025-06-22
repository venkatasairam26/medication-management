import { useState } from "react";
import { useHistory } from "react-router-dom";
import Cookies from 'js-cookie';
import './login.css';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const history = useHistory();
    const jwtToken = Cookies.get('jwtToken');
    if (jwtToken) {
        history.replace('/');
    }

    const onSuccess = (jwtToken) => {
        console.log(jwtToken);
        Cookies.set('jwtToken', jwtToken, { expires: 30 });
        history.replace('/');
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            const url = 'http://localhost:3001/login';
            const options = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email, password })
            };

            const response = await fetch(url, options);
            const data = await response.json();

            if (response.ok) {
                const jwtToken = data.jwtToken;
                onSuccess(jwtToken);
            } else {
                setError(data.error || 'Invalid email or password');
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred. Please try again.');
        }
        setIsLoading(false);
        setEmail('');
        setPassword('');

    }

    return (
        <div className="login-container">
            <div className="login">
                <h1>Login</h1>
                <form onSubmit={handleLogin}>

                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />

                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Logging in...' : 'Login'}
                    </button>
                    {error && <div className="error-message">{error}</div>}
                    <p>Don't have an account? <button className="signup-button" onClick={() => history.replace('/signup')}>Sign Up</button></p>
                </form>
            </div>
        </div>
    )
}
export default Login;
