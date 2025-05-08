import { useCallback, useEffect, useState } from 'react';
import useLocalStorage from 'use-local-storage';
import axios from 'axios';
import styles from './WorldsPage.module.scss';
import { WorldEntry } from './WorldEntry';

interface World {
    id: number;
    name: string;
}

export function WorldsPage() {
    const [worlds, setWorlds] = useState<World[]>([]);
    const [selectedWorldId, setSelectedWorldId] = useLocalStorage<
        null | number
    >('selected_world_id', null);

    const fetchWorlds = useCallback(async () => {
        const fetchedWorlds = (
            await axios.get<World[]>('http://localhost:3333/world/all', {
                withCredentials: true,
            })
        ).data;

        setWorlds(fetchedWorlds);

        setSelectedWorldId((prevWorldId) => {
            if (fetchedWorlds.length > 0) {
                if (
                    prevWorldId === null ||
                    fetchedWorlds.every((world) => world.id !== prevWorldId)
                ) {
                    return fetchedWorlds[0].id;
                }

                return prevWorldId;
            } else {
                return null;
            }
        });
    }, [setSelectedWorldId]);

    const renameWorldFactory = (id: number) => {
        return async (newName: string) => {
            const { status } = await axios.post(
                'http://localhost:3333/world/rename',

                { worldId: id, newName },

                {
                    withCredentials: true,

                    validateStatus: (status) => [200, 409].includes(status),
                }
            );

            await fetchWorlds();

            return status === 200;
        };
    };

    const deleteWorldFactory = (id: number) => {
        return async () => {
            const { status } = await axios.post(
                'http://localhost:3333/world/delete',

                { worldId: id },

                {
                    withCredentials: true,
                    validateStatus: (status) =>
                        [200, 404, 403].includes(status),
                }
            );

            await fetchWorlds();

            return status === 200;
        };
    };

    useEffect(() => {
        fetchWorlds();
    }, [fetchWorlds]);

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            const currentIndex = worlds.findIndex(
                (world) => world.id === selectedWorldId
            );

            if (event.key === 'ArrowUp' && currentIndex > 0) {
                setSelectedWorldId(worlds[currentIndex - 1].id);
            } else if (
                event.key === 'ArrowDown' &&
                currentIndex < worlds.length - 1
            ) {
                setSelectedWorldId(worlds[currentIndex + 1].id);
            }
        };

        window.addEventListener('keydown', handleKeyDown);

        // Cleanup the event listener
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [selectedWorldId, setSelectedWorldId, worlds]);

    return (
        <div className={styles.worlds_page}>
            <div className={styles.sidebar}>
                {worlds.map((world) => (
                    <WorldEntry
                        key={world.id}
                        name={world.name}
                        isSelected={world.id === selectedWorldId}
                        onClick={() => {
                            setSelectedWorldId(world.id);
                        }}
                        renameWorld={renameWorldFactory(world.id)}
                        deleteWorld={deleteWorldFactory(world.id)}
                    />
                ))}
            </div>

            <div className={styles.mainframe}>
                this is the mainframe for id {selectedWorldId}
            </div>
        </div>
    );
}
