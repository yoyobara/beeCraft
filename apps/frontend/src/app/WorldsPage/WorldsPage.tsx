import { useEffect, useRef, useState } from 'react';
import { plusIcon } from '../../assets';
import { useWorlds } from '../../hooks/worlds';
import styles from './WorldsPage.module.scss';
import { WorldEntry } from './WorldEntry';
import { Mainframe } from './Mainframe';

export function WorldsPage() {
    const [plusVisible, setPlusVisible] = useState<boolean>(false);
    const [editingWorldId, setEditingWorldId] = useState<number | null>(null);
    const sidebarRef = useRef<HTMLDivElement>(null);

    const {
        worlds,
        selectedWorldId,
        setSelectedWorldId,
        fetchWorlds,
        createWorld,
        deleteWorld,
        renameWorld,
    } = useWorlds();

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
            <div
                onMouseEnter={() => setPlusVisible(true)}
                onMouseLeave={() => setPlusVisible(false)}
                className={styles.sidebar}
                ref={sidebarRef}
            >
                {plusVisible && (
                    <div className={styles.plus_icon_container}>
                        <img
                            onClick={async () => {
                                const createdId = await createWorld();
                                setEditingWorldId(createdId);
                            }}
                            src={plusIcon}
                            alt="new world"
                        />
                    </div>
                )}
                {worlds.map((world) => (
                    <WorldEntry
                        key={world.id}
                        id={world.id}
                        name={world.name}
                        isSelected={world.id === selectedWorldId}
                        isEdit={world.id === editingWorldId}
                        setIsEdit={(isEdit: boolean) => {
                            setEditingWorldId(isEdit ? world.id : null);
                        }}
                        onClick={() => {
                            setSelectedWorldId(world.id);
                        }}
                        renameWorld={renameWorld}
                        deleteWorld={deleteWorld}
                    />
                ))}
            </div>

            <div className={styles.mainframe}>
                {selectedWorldId !== null && (
                    <Mainframe worldId={selectedWorldId} />
                )}
            </div>
        </div>
    );
}
