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

    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    const navigate = useNavigate();
    const { refreshAuth } = useAuth();

    const validate = (): { ok: true } | { ok: false; msg: string } => {
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            return { ok: false, msg: 'please enter a valid email.' };
        }

        if (fullName.length === 0) {
            return {
                ok: false,
                msg: 'full name is empty.',
            };
        }

        if (password.length < 8) {
            return {
                ok: false,
                msg: 'password length must be 8 characters or more.',
            };
        }

        if (password !== confirmPassword) {
            return {
                ok: false,
                msg: 'passwords do not match.',
            };
        }

        return { ok: true };
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
        const formValidation = validate();

        if (!formValidation.ok) {
            setErrorMsg(formValidation.msg);
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
            setErrorMsg('passwords do not match!');
        }
    };

    return (
        <div className={styles.signup}>
            <h1>SIGN UP</h1>
            <Field
                variant="primary"
                type="text"
                placeholder="email"
                className={styles.input}
                onChange={(e) => {
                    setEmail(e.target.value);
                    setErrorMsg(null);
                }}
            />
            <Field
                variant="primary"
                type="text"
                placeholder="full name"
                className={styles.input}
                onChange={(e) => {
                    setFullName(e.target.value);
                    setErrorMsg(null);
                }}
            />
            <Field
                variant="primary"
                type="password"
                placeholder="password"
                className={styles.input}
                onChange={(e) => {
                    setPassword(e.target.value);
                    setErrorMsg(null);
                }}
            />
            <Field
                variant="primary"
                type="password"
                placeholder="confirm password"
                className={styles.input}
                onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    setErrorMsg(null);
                }}
                onPaste={(e) => e.preventDefault()}
            />
            {errorMsg && (
                <span className={styles.error_message}>{errorMsg}</span>
            )}
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
