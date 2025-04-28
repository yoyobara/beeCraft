import clsx from 'clsx';
import { useRef, useState } from 'react';
import threedots from '../../../assets/dots.svg';
import styles from './WorldEntry.module.scss';
import { WorldEntryMenu } from './WorldEntryMenu';

interface WorldEntryProps {
    name: string;
    isSelected: boolean;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export function WorldEntry({ name, isSelected, onClick }: WorldEntryProps) {
    const [optionsMenuVisible, setOptionsMenuVisible] =
        useState<boolean>(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const threeDotsRef = useRef<HTMLImageElement>(null);

    const onThreeDotsClick = (event: React.MouseEvent) => {
        setOptionsMenuVisible(true);
        setMenuPosition({ x: event.pageX, y: event.pageY });
    };

    return (
        <>
            <div
                className={clsx(
                    styles.world_entry,
                    isSelected && styles.selected
                )}
                onClick={onClick}
            >
                <div className={styles.world_name}>{name}</div>
                <img
                    src={threedots}
                    ref={threeDotsRef}
                    onClick={onThreeDotsClick}
                    className={styles.three_dots}
                    alt="..."
                />
            </div>
            {optionsMenuVisible && (
                <WorldEntryMenu
                    position={menuPosition}
                    setOptionsMenuVisible={setOptionsMenuVisible}
                    threeDotsRef={threeDotsRef}
                />
            )}
        </>
    );
}
