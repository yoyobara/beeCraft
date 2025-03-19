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
                {isSignedIn && <NavbarLink name="Worlds" />}
                <NavbarLink name="About Us" />
            </div>
            <div className={styles.navbar_section}>
                {isSignedIn ? (
                    <NavbarLink name="Log out" />
                ) : (
                    <>
                        <NavbarLink name="Sign In" />
                        <NavbarLink name="Sign Up" />
                    </>
                )}
            </div>
        </div>
    );
}
