import axios from 'axios';
import { useCallback, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

interface World {
    id: number;
    name: string;
}

export function useWorlds() {
    const [worlds, setWorlds] = useState<World[]>([]);
    const [selectedWorldId, setSelectedWorldId] = useLocalStorage<
        null | number
    >('selected_world_id', null);

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
        const response = await axios.post(
            '/world',
            {},
            {
                withCredentials: true,
            }
        );

        await fetchWorlds();

        return response.data.newWorldId;
    }, [fetchWorlds]);

    return {
        worlds,
        selectedWorldId,
        setSelectedWorldId,
        fetchWorlds,
        renameWorld,
        deleteWorld,
        createWorld,
    };
}
