import axios from 'axios';
import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useState,
} from 'react';
import useLocalStorage from 'use-local-storage';

interface World {
    id: number;
    name: string;
}

interface WorldsContext {
    worlds: World[];
    selectedWorldId: number | null;
    setSelectedWorldId: (id: number | null) => void;

    deleteWorld(id: number): Promise<void>;
    renameWorld(id: number, newName: string): Promise<boolean>;
}

const worldsContext = createContext<WorldsContext | null>(null);

export function WorldsProvider({ children }: PropsWithChildren) {
    const [worlds, setWorlds] = useState<World[]>([]);
    const [selectedWorldId, setSelectedWorldId] = useLocalStorage<
        number | null
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

    const deleteWorld = async (id: number) => {
        await axios.post(
            'http://localhost:3333/world/delete',
            { worldId: id },
            { withCredentials: true }
        );
        await fetchWorlds();
    };

    const renameWorld = async (id: number, newName: string) => {
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

    useEffect(() => {
        fetchWorlds();
    }, [fetchWorlds]);

    return (
        <worldsContext.Provider
            value={{
                worlds,
                selectedWorldId,
                setSelectedWorldId,
                deleteWorld,
                renameWorld,
            }}
        >
            {children}
        </worldsContext.Provider>
    );
}

export function useWorlds() {
    const context = useContext(worldsContext);

    if (context !== null) {
        return { ...context };
    } else {
        throw Error('didnt use the context provider...');
    }
}
