import axios from 'axios';
import { useEffect, useState } from 'react';
import styles from './Sidebar.module.scss';
import { WorldEntry } from './WorldEntry';

interface World {
    id: number;
    name: string;
}

export function Sidebar() {
    const [worlds, setWorlds] = useState<World[]>([]);
    const [selectedWorldId, setSelectedWorldId] = useState<number | null>(null);

    const updateWorlds = async () => {
        const fetchedWorlds = (
            await axios.get<World[]>('http://localhost:3333/world/all', {
                withCredentials: true,
            })
        ).data;

        setWorlds(fetchedWorlds);
        if (fetchedWorlds.length > 0) {
            setSelectedWorldId(fetchedWorlds[0].id);
        }
    };

    useEffect(() => {
        updateWorlds();
    }, []);

    return (
        <div className={styles.sidebar}>
            {worlds.map((world) => (
                <WorldEntry
                    key={world.id}
                    name={world.name}
                    isSelected={selectedWorldId === world.id}
                />
            ))}
        </div>
    );
}
