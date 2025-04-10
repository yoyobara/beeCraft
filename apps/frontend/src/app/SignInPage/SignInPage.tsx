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
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const validate = (): { ok: true } | { ok: false; msg: string } => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { ok: false, msg: 'please enter a valid email.' };
        }

        if (password.length < 8) {
            return {
                ok: false,
                msg: 'password length must be 8 characters or more.',
            };
        }

        return { ok: true };
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        const formValidation = validate();
        if (!formValidation.ok) {
            setErrorMsg(formValidation.msg);
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
            navigate('/');
            refreshAuth();
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
