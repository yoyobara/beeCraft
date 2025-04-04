import icon from '../../assets/beeNestIcon.png';
import styles from './Navbar.module.scss';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button';
import { useNavigate } from 'react-router-dom';

export function Navbar() {
    const { fullName, isLoggedIn, setIsLoggedIn } = useAuth();
    const navgiate = useNavigate();

    const handleLogout = () => {
        setIsLoggedIn(false);
        navgiate('/');
    };

    return (
        <div className={styles.navbar}>
            <img className={styles.icon} src={icon} alt="beeCraft-icon" />
            <span className={styles.title}>BeeCraft</span>
            {isLoggedIn && (
                <Button variant="primary" kind="contained">
                    WORLDS
                </Button>
            )}
            <Button className={styles.about} variant="primary" kind="contained">
                ABOUT US
            </Button>
            {isLoggedIn ? (
                <>
                    <span>hello {fullName}</span>
                    <Button
                        variant="secondary"
                        kind="outlined"
                        onClick={handleLogout}
                    >
                        LOG OUT
                    </Button>
                </>
            ) : (
                <>
                    <Button
                        variant="accent"
                        kind="contained"
                        onClick={() => {
                            navgiate('/sign_in');
                        }}
                    >
                        SIGN IN
                    </Button>
                    <Button
                        variant="accent"
                        kind="outlined"
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
