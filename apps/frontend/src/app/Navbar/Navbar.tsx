import icon from '../../assets/beeNestIcon.png';
import { NavbarLink } from './NavbarLink';
import styles from './Navbar.module.scss';

interface NavbarProps {
    auth: boolean;
}

export function Navbar({ auth }: NavbarProps) {
    return (
        <div className={styles.navbar}>
            <div className={styles.navbar_section}>
                <img className={styles.icon} src={icon} alt="beeCraft-icon" />
                <span className={styles.title}>BeeCraft</span>
                {auth && <NavbarLink name="Worlds" />}
                <NavbarLink name="About Us" />
            </div>
            <div className={styles.navbar_section}>
                {auth ? (
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
