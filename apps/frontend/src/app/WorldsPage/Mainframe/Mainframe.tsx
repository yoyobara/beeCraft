import { useState } from 'react';
import styles from './Mainframe.module.scss';
import { PointEntry, PointOfInterest } from './PointEntry/PointEntry';

interface MainframeProps {
    worldId: number;
}

export function Mainframe({ worldId }: MainframeProps) {
    const [points, setPoints] = useState<PointOfInterest[]>([]);

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
                <tbody>
                    {points.map((point) => (
                        <PointEntry data={point} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
