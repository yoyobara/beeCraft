import clsx from 'clsx';
import styles from './WorldEntry.module.scss';

interface WorldEntryProps {
    name: string;
    isSelected: boolean;
}

export function WorldEntry({ name, isSelected }: WorldEntryProps) {
    return (
        <div
            className={clsx(styles.world_entry, isSelected && styles.selected)}
        >
            {name}
        </div>
    );
}
