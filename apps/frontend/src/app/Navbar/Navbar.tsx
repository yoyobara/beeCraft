import icon from '../../assets/beeNestIcon.png';
import { NavbarLink } from './NavbarLink';
import styles from './Navbar.module.scss';
import { useAuth } from '../../contexts/auth';

export function Navbar() {
    const { sessionId } = useAuth();
    const isSignedIn = sessionId !== null;

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_section}>
                <img className={styles.icon} src={icon} alt="beeCraft-icon" />
                <span className={styles.title}>BeeCraft</span>
                {isSignedIn && <NavbarLink name="Worlds" to="/worlds" />}
                <NavbarLink name="About Us" to="/about" />
            </div>
            <div className={styles.navbar_section}>
                {isSignedIn ? (
                    <NavbarLink name="Log out" to="/" />
                ) : (
                    <>
                        <NavbarLink name="Sign In" to="/sign_in" />
                        <NavbarLink name="Sign Up" to="/sign_up" />
                    </>
                )}
            </div>
        </div>
    );
}
