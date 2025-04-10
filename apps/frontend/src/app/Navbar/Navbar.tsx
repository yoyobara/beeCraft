import icon from '../../assets/beeNestIcon.png';
import styles from './Navbar.module.scss';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Navbar() {
    const { fullName, isLoading, refreshAuth } = useAuth();
    const navgiate = useNavigate();

    const handleLogout = async () => {
        await axios.post(
            'http://localhost:3333/user/logout',
            {},
            {
                withCredentials: true,
            }
        );

        navgiate('/');
        refreshAuth();
    };

    if (isLoading) {
        return <div className={styles.navbar}></div>;
    }

    return (
        <div className={styles.navbar}>
            <img className={styles.icon} src={icon} alt="beeCraft-icon" />
            <span className={styles.title}>BeeCraft</span>
            {fullName && (
                <Button variant="accent" kind="text">
                    WORLDS
                </Button>
            )}
            <Button className={styles.about} variant="accent" kind="text">
                ABOUT US
            </Button>
            {fullName ? (
                <>
                    <span>hello {fullName}</span>
                    <Button variant="accent" kind="text" onClick={handleLogout}>
                        LOG OUT
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        variant="accent"
                        kind="text"
                        onClick={() => {
                            navgiate('/sign_in');
                        }}
                    >
                        SIGN IN
                    </Button>
                    <Button
                        variant="accent"
                        kind="text"
                        onClick={() => {
                            navgiate('/sign_up');
                        }}
                    >
                        SIGN UP
                    </Button>
                </>
            )}
        </div>
    );
}
