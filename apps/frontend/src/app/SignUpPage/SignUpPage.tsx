import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignUpPage.module.scss';
import { useAuth } from '../../hooks/auth';
import { Field } from '../../components/Field';
import { Button } from '../../components/Button';

export function SignUpPage() {
    const [email, setEmail] = useState<string>('');
    const [fullName, setFullName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const navigate = useNavigate();
    const { refreshAuth } = useAuth();

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
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
        <div className={styles.signup}>
            <h1>SIGN UP</h1>
            <Field
                variant="primary"
                type="email"
                placeholder="email"
                className={styles.input}
                onChange={(e) => setEmail(e.target.value)}
            />
            <Field
                variant="primary"
                type="text"
                placeholder="full name"
                className={styles.input}
                onChange={(e) => setFullName(e.target.value)}
            />
            <Field
                variant="primary"
                type="password"
                placeholder="password"
                className={styles.input}
                onChange={(e) => setPassword(e.target.value)}
            />
            <Field
                variant="primary"
                type="password"
                placeholder="confirm password"
                className={styles.input}
                onChange={(e) => setConfirmPassword(e.target.value)}
                onPaste={(e) => e.preventDefault()}
            />
            <Button
                variant="primary"
                kind="contained"
                onClick={handleSubmit}
                className={styles.submit}
            >
                SIGN UP
            </Button>
        </div>
    );
}
