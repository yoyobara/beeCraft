import icon from '../../assets/beeNestIcon.png';
import { NavbarLink } from './NavbarLink';
import styles from './Navbar.module.scss';
import { useAuth } from '../../hooks/auth';

export function Navbar() {
    const { username, isLoggedIn, setIsLoggedIn } = useAuth();

    const handleLogout = () => {
        setIsLoggedIn(false);
    };

    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_section}>
                <img className={styles.icon} src={icon} alt="beeCraft-icon" />
                <span className={styles.title}>BeeCraft</span>
                {isLoggedIn && <NavbarLink name="Worlds" to="/worlds" />}
                <NavbarLink name="About Us" to="/about" />
            </div>
            <div className={styles.navbar_section}>
                {isLoggedIn ? (
                    <>
                        <span>hello {username}</span>
                        <NavbarLink
                            name="Log out"
                            to="/"
                            onClick={handleLogout}
                        />
                    </>
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
