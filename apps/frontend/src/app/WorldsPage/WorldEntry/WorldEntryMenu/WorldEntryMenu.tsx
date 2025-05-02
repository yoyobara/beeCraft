import { useEffect } from 'react';
import { Button } from '../../../../components/Button';
import { useWorlds } from '../../../../hooks/worlds';
import styles from './WorldEntryMenu.module.scss';

interface WorldEntryMenuProps {
    threeDotsRef: React.RefObject<HTMLImageElement | null>;
    setOptionsMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
    position: { x: number; y: number };
    worldId: number;
    handleRename(): void;
}

export function WorldEntryMenu({
    setOptionsMenuVisible,
    threeDotsRef,
    position,
    worldId,
    handleRename,
}: WorldEntryMenuProps) {
    const { deleteWorld } = useWorlds();

    useEffect(() => {
        const onOutsideClick = (ev: MouseEvent) => {
            if (
                ev.target instanceof Node &&
                !threeDotsRef.current?.contains(ev.target)
            )
                setOptionsMenuVisible(false);
        };

        document.addEventListener('click', onOutsideClick);

        return () => {
            document.removeEventListener('click', onOutsideClick);
        };
    }, [setOptionsMenuVisible, threeDotsRef]);

    return (
        <div
            className={styles.menu}
            style={{ left: position.x, top: position.y }}
        >
            <Button onClick={handleRename} kind="text" variant="primary">
                rename
            </Button>
            <Button
                onClick={() => {
                    deleteWorld(worldId);
                }}
                kind="text"
                variant="primary"
            >
                delete
            </Button>
        </div>
    );
}
