import icon from '../../assets/beeNestIcon.png';
import styles from './Navbar.module.scss';
import { useAuth } from '../../hooks/auth';
import { Button } from '../../components/Button';

export function Navbar() {
    const { fullName, isLoggedIn, setIsLoggedIn } = useAuth();

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_section}>
                <img className={styles.icon} src={icon} alt="beeCraft-icon" />
                <span className={styles.title}>BeeCraft</span>
                {isLoggedIn && (
                    <Button variant="primary" kind="contained">
                        WORLDS
                    </Button>
                )}
                <Button variant="primary" kind="contained">
                    ABOUT US
                </Button>
            </div>
            <div className={styles.navbar_section}>
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
                        <Button variant="accent" kind="contained">
                            SIGN IN
                        </Button>
                        <Button variant="accent" kind="outlined">
                            SIGN UP
                        </Button>
                    </>
                )}
            </div>
        </div>
    );
}
