import { useEffect, useState } from 'react';
import axios from 'axios';
import useLocalStorage from 'use-local-storage';
import styles from './WorldsPage.module.scss';
import { WorldEntry } from './WorldEntry';

interface World {
    id: number;
    name: string;
}

export function WorldsPage() {
    const [worlds, setWorlds] = useState<World[]>([]);
    const [selectedWorldId, setSelectedWorldId] = useLocalStorage<
        number | null
    >('selected_world', null);

    useEffect(() => {
        const updateWorlds = async () => {
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
        };

        updateWorlds();
    }, [selectedWorldId, setSelectedWorldId]);

    return (
        <div className={styles.worlds_page}>
            <div className={styles.sidebar}>
                {worlds.map((world) => (
                    <WorldEntry
                        key={world.id}
                        name={world.name}
                        isSelected={selectedWorldId === world.id}
                        onClick={() => {
                            setSelectedWorldId(world.id);
                        }}
                    />
                ))}
            </div>
            <div className={styles.mainframe}>
                this is the mainframe for id {selectedWorldId}
            </div>
        </div>
    );
}
