import clsx from 'clsx';
import styles from './WorldEntry.module.scss';

interface WorldEntryProps {
    name: string;
}

export function WorldEntry({ name }: WorldEntryProps) {
    return <div className={clsx(styles.world_entry)}>{name}</div>;
}
