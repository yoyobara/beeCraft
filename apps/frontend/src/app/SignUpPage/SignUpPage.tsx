import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';

export function SignUpPage() {
    const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const navigate = useNavigate();
    const { refreshAuth } = useAuth();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            console.log('password not matching confirm');
            return;
        }

        const { status } = await axios.post(
            'http://localhost:3333/user/register',
            {
                email,
                fullName,
                password,
            },
            {
                withCredentials: true,
                validateStatus: (status) => [200, 409].includes(status),
            }
        );

        if (status === 200) {
            navigate('/');
            refreshAuth();
        } else {
            console.log('signup bad');
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
                        placeholder="full name"
                        onChange={(e) => setFullName(e.target.value)}
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
