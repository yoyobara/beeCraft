import { Link, To } from 'react-router-dom';
import styles from './Navbar.module.scss';

interface NavbarLinkProps {
    name: string;
    to: To;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

export function NavbarLink({ name, to, onClick }: NavbarLinkProps) {
    return (
        <Link to={to} className={styles.navbar_link} onClick={onClick}>
            {name}
        </Link>
    );
}
