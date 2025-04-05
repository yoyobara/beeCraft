import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/auth';
import { Field } from '../../components/Field';
import { Button } from '../../components/Button';

export function SignInPage() {
    const { refreshAuth } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
            <div>
                <Field
                    variant="primary"
                    type="email"
                    required
                    placeholder="email"
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div>
                <Field
                    variant="primary"
                    type="password"
                    required
                    placeholder="password"
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div>
                <Button variant="accent" kind="outlined" onClick={handleSubmit}>
                    SIGN IN
                </Button>
            </div>
        </div>
    );
}
