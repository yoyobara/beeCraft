import axios from 'axios';
import { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { useNavigate } from 'react-router-dom';

export function SignInPage() {
    const { setIsLoggedIn } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await axios.post(
                'http://localhost:3333/user/login',
                {
                    email,
                    password,
                },
                { withCredentials: true }
            );
            setIsLoggedIn(true);
            navigate('/');
        } catch (e: unknown) {
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
                        type="password"
                        required
                        placeholder="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" value="Sign In" />
                </div>
            </form>
        </div>
    );
}
