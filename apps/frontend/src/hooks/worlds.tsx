import axios from 'axios';
import { useCallback, useState } from 'react';

interface World {
    id: number;
    name: string;
}

export function useWorlds(
    setSelectedWorldId: React.Dispatch<React.SetStateAction<number | null>>,
    sidebarRef: React.RefObject<HTMLDivElement | null>
) {
    const [worlds, setWorlds] = useState<World[]>([]);

    const fetchWorlds = useCallback(async () => {
        const fetchedWorlds = (
            await axios.get<World[]>('/world', {
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

    const renameWorld = useCallback(
        async (id: number, newName: string) => {
            const { status } = await axios.patch(
                '/world',

                { worldId: id, newName },

                {
                    withCredentials: true,

                    validateStatus: (status) => [200, 409].includes(status),
                }
            );

            await fetchWorlds();

            return status === 200;
        },
        [fetchWorlds]
    );

    const deleteWorld = useCallback(
        async (id: number) => {
            const { status } = await axios.delete('/world', {
                withCredentials: true,
                validateStatus: (status) => [200, 404, 403].includes(status),
                params: {
                    worldId: id,
                },
            });

            await fetchWorlds();

            return status === 200;
        },
        [fetchWorlds]
    );

    const createWorld = useCallback(async () => {
        await axios.post<unknown, { newWorldId: number }>(
            '/world',
            {},
            {
                withCredentials: true,
            }
        );

        setSelectedWorldId(null);
        await fetchWorlds();
        sidebarRef.current?.scrollTo(0, 0);
    }, [fetchWorlds, setSelectedWorldId, sidebarRef]);

    return { worlds, fetchWorlds, renameWorld, deleteWorld, createWorld };
}
