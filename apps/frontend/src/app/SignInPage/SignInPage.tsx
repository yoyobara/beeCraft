import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    mergeValidations,
    validateEmail,
    validatePassword,
} from '@shared/validation';
import { useAuth } from '../../hooks/auth';
import { Field } from '../../components/Field';
import { Button } from '../../components/Button';
import styles from './SignInPage.module.scss';

export function SignInPage() {
    const { refreshAuth } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const validation = mergeValidations(
            validateEmail(email),
            validatePassword(password)
        );

        if (!validation.ok) {
            setErrorMsg(validation.reason);
            return;
        }

        const { status, data } = await axios.post(
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
            await refreshAuth();
            navigate('/');
        } else {
            setErrorMsg(data.message);
        }
    };

    return (
        <div className={styles.sign_in}>
            <h1>SIGN IN</h1>
            <Field
                variant="primary"
                type="email"
                placeholder="email"
                onChange={(e) => setEmail(e.target.value)}
            />
            <Field
                variant="primary"
                type="password"
                placeholder="password"
                onChange={(e) => setPassword(e.target.value)}
            />
            {errorMsg && (
                <span className={styles.error_message}>{errorMsg}</span>
            )}
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
