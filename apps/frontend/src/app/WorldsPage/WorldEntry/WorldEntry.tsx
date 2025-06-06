import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';
import threeDots from '../../../assets/dots.svg';
import styles from './WorldEntry.module.scss';
import { WorldEntryMenu } from './WorldEntryMenu';

interface WorldEntryProps {
    name: string;
    id: number;
    isSelected: boolean;
    isEdit: boolean;
    setIsEdit: (isEdit: boolean) => void;
    onClick: React.MouseEventHandler<HTMLDivElement>;
    renameWorld: (id: number, newName: string) => Promise<boolean>;
    deleteWorld: (id: number) => Promise<boolean>;
}

export function WorldEntry({
    name,
    id,
    isSelected,
    isEdit,
    setIsEdit,
    onClick,
    renameWorld,
    deleteWorld,
}: WorldEntryProps) {
    const [optionsMenuPosition, setOptionsMenuPosition] = useState<null | {
        x: number;
        y: number;
    }>(null);
    const threeDotsRef = useRef(null);

    const [newName, setNewName] = useState<string>(name);
    const nameRef = useRef<HTMLInputElement>(null);

    const startRename = async () => {
        setNewName(name);
        setIsEdit(true);
    };

    const finishRename = async () => {
        if (newName !== name) {
            await renameWorld(id, newName);
        }

        setIsEdit(false);
    };

    useEffect(() => {
        if (isEdit) {
            nameRef.current?.focus();
            nameRef.current?.select();
        }
    }, [isEdit]);

    return (
        <>
            <div
                className={clsx(
                    styles.world_entry,
                    isSelected && styles.selected
                )}
                onClick={onClick}
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
                    <div className={styles.world_name}>{name}</div>
                )}

                <img
                    src={threeDots}
                    ref={threeDotsRef}
                    onClick={(ev) => {
                        setOptionsMenuPosition({ x: ev.pageX, y: ev.pageY });
                    }}
                    className={styles.three_dots}
                    alt="..."
                />
            </div>

            {optionsMenuPosition && (
                <WorldEntryMenu
                    position={optionsMenuPosition}
                    setOptionsMenuVisible={() => setOptionsMenuPosition(null)}
                    handleRename={startRename}
                    handleDelete={async () => {
                        await deleteWorld(id);
                    }}
                    threeDotsRef={threeDotsRef}
                />
            )}
        </>
    );
}
