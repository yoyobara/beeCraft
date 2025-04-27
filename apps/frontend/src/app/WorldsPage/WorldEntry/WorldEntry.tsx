import clsx from 'clsx';
import threedots from '../../../assets/dots.svg';
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
            <div className={styles.world_name}>{name}</div>
            <img src={threedots} className={styles.three_dots} alt="..." />
        </div>
    );
}
