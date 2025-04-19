import { Sidebar } from './Sidebar';
import styles from './WorldsPage.module.scss';

export function WorldsPage() {
    return (
        <div className={styles.worlds_page}>
            <Sidebar />
            <div className={styles.mainframe}>this is the mainframe</div>
        </div>
    );
}
