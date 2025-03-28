import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';

export function SignUpPage() {
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            console.log('password not matching confirm');
            return;
        }

        try {
            await axios.post(
                'http://localhost:3333/user/register',
                {
                    email,
                    username,
                    password,
                },
                { withCredentials: true }
            );

            setIsLoggedIn(true);
            navigate('/');
        } catch (e) {
            if (axios.isAxiosError(e)) {
                console.log(e);
            }
        }
    };

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        required
                        placeholder="email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="text"
                        required
                        placeholder="username"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        required
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input
                        type="password"
                        required
                        placeholder="confirm password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        onPaste={(e) => e.preventDefault()}
                    />
                </div>
                <div>
                    <input type="submit" value="Sign In" />
                </div>
            </form>
        </div>
    );
}
