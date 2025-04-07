import axios from 'axios';
import styles from './SignInPage.module.scss';
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
                validateStatus: (status) => [200, 401, 404].includes(status),
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
        <div className={styles.sign_in}>
            <h1>SIGN IN</h1>
            <Field
                variant="primary"
                type="email"
                placeholder="email"
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Field
                variant="primary"
                type="password"
                placeholder="password"
                className={styles.input}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Button
                variant="primary"
                kind="contained"
                className={styles.submit}
                onClick={handleSubmit}
            >
                SIGN IN
            </Button>
        </div>
    );
}
