import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import clsx from 'clsx';
import { avatarIcon, beeNestIcon } from '../../assets';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button';
import styles from './Navbar.module.scss';

export function Navbar() {
    const { fullName, isLoading, refreshAuth } = useAuth();

    const navgiate = useNavigate();
    const { pathname } = useLocation();

    const handleLogout = async () => {
        await axios.post(
            'http://localhost:3333/user/logout',
            {},
            {
                withCredentials: true,
            }
        );

        await refreshAuth();
        navgiate('/');
    };

    if (isLoading) {
        return <div className={styles.navbar}></div>;
    }

    return (
        <div className={styles.navbar}>
            <img
                className={styles.icon}
                src={beeNestIcon}
                alt="beeCraft-icon"
            />
            <span className={styles.title} onClick={() => navgiate('/')}>
                BeeCraft
            </span>
            {fullName && (
                <Button
                    variant="accent"
                    kind="text"
                    onClick={() => {
                        navgiate('/worlds');
                    }}
                    className={clsx(
                        pathname === '/worlds' && styles.current_page_button
                    )}
                >
                    WORLDS
                </Button>
            )}
            <Button
                variant="accent"
                kind="text"
                className={clsx(
                    styles.about,
                    pathname === '/about' && styles.current_page_button
                )}
            >
                ABOUT US
            </Button>
            {fullName ? (
                <>
                    <Button variant="accent" kind="text" onClick={handleLogout}>
                        LOG OUT
                    </Button>
                    <span className={styles.name}>{fullName}</span>
                    <img
                        className={styles.avatar_icon}
                        src={avatarIcon}
                        alt="👤"
                    />
                </>
            ) : (
                <>
                    <Button
                        variant="accent"
                        kind="text"
                        onClick={() => {
                            navgiate('/sign_in');
                        }}
                        className={clsx(
                            pathname === '/sign_in' &&
                                styles.current_page_button
                        )}
                    >
                        SIGN IN
                    </Button>
                    <Button
                        variant="accent"
                        kind="text"
                        onClick={() => {
                            navgiate('/sign_up');
                        }}
                        className={clsx(
                            pathname === '/sign_up' &&
                                styles.current_page_button
                        )}
                    >
                        SIGN UP
                    </Button>
                </>
            )}
        </div>
    );
}
