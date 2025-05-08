import clsx from 'clsx';
import styles from './Mainframe.module.scss';

interface MainframeProps {
    worldId: number;
}

export function Mainframe({ worldId }: MainframeProps) {
    return (
        <div className={styles.table_container}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.table_heading}>
                        <th>Name</th>
                        <th>X</th>
                        <th>Y</th>
                        <th>Z</th>
                        <th>Notes</th>
                    </tr>
                </thead>
                <tbody></tbody>
            </table>
        </div>
    );
}
