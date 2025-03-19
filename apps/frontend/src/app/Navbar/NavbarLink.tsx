import { Link, To } from 'react-router-dom';
import styles from './Navbar.module.scss';

interface NavbarLinkProps {
    name: string;
    to: To;
}

export function NavbarLink({ name, to }: NavbarLinkProps) {
    return (
        <Link to={to} className={styles.navbar_link}>
            {name}
        </Link>
    );
}
