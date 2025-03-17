import styles from './Navbar.module.scss';

interface NavbarLinkProps {
    name: string;
    onClick?: () => void;
}

export function NavbarLink({ name, onClick }: NavbarLinkProps) {
    return (
        <button onClick={onClick} className={styles.navbar_link}>
            {name}
        </button>
    );
}
