import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

export function SignInPage() {
    const { refreshAuth } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const { status } = await axios.post(
            'http://localhost:3333/user/login',
            {
                email,
                password,
            },
            {
                withCredentials: true,
                validateStatus: (status) => [200, 404].includes(status),
            }
        );

        if (status === 200) {
            navigate('/');
            refreshAuth();
        } else {
            console.log('bad login');
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
