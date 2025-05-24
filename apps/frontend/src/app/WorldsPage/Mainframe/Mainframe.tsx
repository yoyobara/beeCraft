import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { plusIcon } from '../../../assets';
import styles from './Mainframe.module.scss';
import { PointEntry, PointOfInterest } from './PointEntry';
import { AdditionModal } from './AdditionModal';
import { newPointFields } from './AdditionModal/AdditionModal';

interface MainframeProps {
    worldId: number;
}

export function Mainframe({ worldId }: MainframeProps) {
    console.log(worldId);
    const [points, setPoints] = useState<PointOfInterest[]>([]);
    const [additionModalOpen, setAdditionModalOpen] = useState<boolean>(false);

    const fetchPoints = useCallback(async () => {
        const fetchedPoints = await axios.get('/points', {
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
                '/points/edit',
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
                '/points/delete',
                { pointId: id },
                { withCredentials: true }
            );

            await fetchPoints();
        },
        [fetchPoints]
    );

    const handleNew = useCallback(
        async (fields: newPointFields) => {
            await axios.post(
                '/points/new',
                {
                    worldId,
                    point: fields,
                },
                {
                    withCredentials: true,
                }
            );

            await fetchPoints();
        },
        [fetchPoints, worldId]
    );

    return (
        <div className={styles.table_container}>
            <div className={styles.actions_row}>
                <img
                    className={styles.plus_button}
                    src={plusIcon}
                    alt="new point"
                    onClick={() => {
                        setAdditionModalOpen(true);
                    }}
                />
            </div>
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
            {additionModalOpen && (
                <AdditionModal
                    onSave={(fields) => {
                        setAdditionModalOpen(false);
                        handleNew(fields);
                    }}
                    setAdditionModalOpen={setAdditionModalOpen}
                />
            )}
        </div>
    );
}
