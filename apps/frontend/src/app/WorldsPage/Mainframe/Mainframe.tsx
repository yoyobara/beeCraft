import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Mainframe.module.scss';
import { PointEntry, PointOfInterest } from './PointEntry/PointEntry';

interface MainframeProps {
    worldId: number;
}

export function Mainframe({ worldId }: MainframeProps) {
    const [points, setPoints] = useState<PointOfInterest[]>([]);

    const fetchPoints = useCallback(async () => {
        const fetchedPoints = await axios.get('http://localhost:3333/points', {
            params: {
                worldId,
            },
            withCredentials: true,
        });

        setPoints(fetchedPoints.data);
    }, [worldId]);

    useEffect(() => {
        fetchPoints();
    }, [fetchPoints]);

    return (
        <div className={styles.table_container}>
            <table className={styles.table}>
                <thead>
                    <tr className={styles.table_heading}>
                        <th style={{ width: '20%' }}>Name</th>
                        <th style={{ width: '10%' }}>X</th>
                        <th style={{ width: '10%' }}>Y</th>
                        <th style={{ width: '10%' }}>Z</th>
                        <th style={{ width: '50%' }}>Notes</th>
                    </tr>
                </thead>
                <tbody>
                    {points.map((point) => (
                        <PointEntry key={point.id} data={point} />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
