import styles from './Sidebar.module.scss';
import { WorldEntry } from './WorldEntry';

export function Sidebar() {
    const entries = [1, 2, 3];

    return (
        <div className={styles.sidebar}>
            {entries.map((entry) => (
                <WorldEntry key={entry} />
            ))}
        </div>
    );
}
