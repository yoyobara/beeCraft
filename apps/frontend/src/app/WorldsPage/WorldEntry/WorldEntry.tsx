import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { useWorlds } from '../../../hooks/worlds';
import threedots from '../../../assets/dots.svg';
import styles from './WorldEntry.module.scss';
import { WorldEntryMenu } from './WorldEntryMenu';

interface WorldEntryProps {
    name: string;
    id: number;
}

export function WorldEntry({ name, id }: WorldEntryProps) {
    const { selectedWorldId, setSelectedWorldId, renameWorld } = useWorlds();

    const [optionsMenuVisible, setOptionsMenuVisible] =
        useState<boolean>(false);
    const [menuPosition, setMenuPosition] = useState({ x: 0, y: 0 });
    const threeDotsRef = useRef<HTMLImageElement>(null);

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [newName, setNewName] = useState<string>(name);
    const nameRef = useRef<HTMLInputElement>(null);

    const onThreeDotsClick = (event: React.MouseEvent) => {
        setOptionsMenuVisible(true);
        setMenuPosition({ x: event.pageX, y: event.pageY });
    };

    const handleRename = async () => {
        setIsEdit(true);
    };

    const finishRename = async () => {
        await renameWorld(id, newName);
        setIsEdit(false);
        setNewName(name);
    };

    useEffect(() => {
        if (isEdit && nameRef.current) {
            nameRef.current.focus();
        }
    }, [isEdit]);

    return (
        <>
            <div
                className={clsx(
                    styles.world_entry,
                    id === selectedWorldId && styles.selected
                )}
            >
                {isEdit ? (
                    <input
                        className={styles.world_name}
                        ref={nameRef}
                        onChange={(ev) => {
                            setNewName(ev.target.value);
                        }}
                        value={newName}
                        onBlur={finishRename}
                        onKeyDown={(ev) => {
                            ev.key === 'Enter' && finishRename();
                        }}
                    />
                ) : (
                    <div
                        onClick={() => {
                            setSelectedWorldId(id);
                        }}
                        className={styles.world_name}
                    >
                        {name}
                    </div>
                )}
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
                    worldId={id}
                    handleRename={handleRename}
                />
            )}
        </>
    );
}
