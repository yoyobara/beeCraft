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
    >('selected_world', null);

    const fetchWorlds = useCallback(async () => {
        const fetchedWorlds = (
            await axios.get<World[]>('http://localhost:3333/world/all', {
                withCredentials: true,
            })
        ).data;

        setWorlds(fetchedWorlds);

        if (fetchedWorlds.length > 0) {
            if (
                selectedWorldId === null ||
                fetchedWorlds.every((world) => world.id !== selectedWorldId)
            ) {
                setSelectedWorldId(fetchedWorlds[0].id);
            }
        } else {
            setSelectedWorldId(null);
        }
    }, [selectedWorldId, setSelectedWorldId]);

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

    useEffect(() => {
        fetchWorlds();
    }, [fetchWorlds]);

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
                    />
                ))}
            </div>

            <div className={styles.mainframe}>
                this is the mainframe for id {selectedWorldId}
            </div>
        </div>
    );
}
