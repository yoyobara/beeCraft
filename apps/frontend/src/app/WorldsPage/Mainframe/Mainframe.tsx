import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import styles from './Mainframe.module.scss';
import { PointEntry, PointOfInterest } from './PointEntry';
import { AdditionModal } from './AdditionModal';

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

    const handlePinning = useCallback(
        async (id: number, pin: boolean) => {
            const pinnedAt = pin ? new Date(Date.now()) : null;

            await axios.patch(
                'http://localhost:3333/points/edit',
                { pointId: id, pointPatch: { pinnedAt } },
                { withCredentials: true }
            );

            await fetchPoints();
        },
        [fetchPoints]
    );

    const handleDeletion = useCallback(
        async (id: number) => {
            await axios.post(
                'http://localhost:3333/points/delete',
                { pointId: id },
                { withCredentials: true }
            );

            await fetchPoints();
        },
        [fetchPoints]
    );

    return (
        <div className={styles.table_container}>
            <AdditionModal />
            <table className={styles.table}>
                <thead>
                    <tr className={styles.table_heading}>
                        <th style={{ width: '10%' }}></th>
                        <th style={{ width: '20%' }}>Name</th>
                        <th style={{ width: '10%' }}>X</th>
                        <th style={{ width: '10%' }}>Y</th>
                        <th style={{ width: '10%' }}>Z</th>
                        <th style={{ width: '40%' }}>Notes</th>
                        <th style={{ width: '3%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {points.map((point) => (
                        <PointEntry
                            key={point.id}
                            data={point}
                            handlePinning={handlePinning}
                            handleDeletion={handleDeletion}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}
