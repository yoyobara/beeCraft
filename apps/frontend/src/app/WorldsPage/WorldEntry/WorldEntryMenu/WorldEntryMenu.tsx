import { useEffect } from 'react';
import { Button } from '../../../../components/Button';
import styles from './WorldEntryMenu.module.scss';

interface WorldEntryMenuProps {
    threeDotsRef: React.RefObject<HTMLImageElement | null>;
    setOptionsMenuVisible: React.Dispatch<React.SetStateAction<boolean>>;
    position: { x: number; y: number };
}

export function WorldEntryMenu({
    setOptionsMenuVisible,
    threeDotsRef,
    position,
}: WorldEntryMenuProps) {
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
            <Button kind="text" variant="primary">
                rename
            </Button>
            <Button kind="text" variant="primary">
                delete
            </Button>
        </div>
    );
}
