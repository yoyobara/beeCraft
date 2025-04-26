import clsx from 'clsx';
import styles from './WorldEntry.module.scss';

interface WorldEntryProps {
    name: string;
    isSelected: boolean;
    onClick: React.MouseEventHandler<HTMLDivElement>;
}

export function WorldEntry({ name, isSelected, onClick }: WorldEntryProps) {
    return (
        <div
            className={clsx(styles.world_entry, isSelected && styles.selected)}
            onClick={onClick}
        >
            {name}
        </div>
    );
}
