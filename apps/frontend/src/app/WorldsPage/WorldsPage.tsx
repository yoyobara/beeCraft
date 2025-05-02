import { useState } from 'react';
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

    return (
        <div className={styles.worlds_page}>
            <div className={styles.sidebar}>
                {worlds.map((world) => (
                    <WorldEntry
                        key={world.id}
                        id={world.id}
                        name={world.name}
                        isSelected={selectedWorldId === world.id}
                        setSelectedWorldId={setSelectedWorldId}
                    />
                ))}
            </div>
            <div className={styles.mainframe}>
                this is the mainframe for id {selectedWorldId}
            </div>
        </div>
    );
}
