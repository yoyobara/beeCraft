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

    const updateWorlds = async () => {
        setWorlds(
            (
                await axios.get<World[]>('http://localhost:3333/world/all', {
                    withCredentials: true,
                })
            ).data
        );
    };

    useEffect(() => {
        updateWorlds();
    }, []);

    return (
        <div className={styles.sidebar}>
            {worlds.map((world) => (
                <WorldEntry key={world.id} name={world.name} />
            ))}
        </div>
    );
}
