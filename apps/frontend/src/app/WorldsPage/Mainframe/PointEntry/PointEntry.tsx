import clsx from 'clsx';
import styles from './PointEntry.module.scss';

interface PointOfInterest {
    name: string;
    x: number;
    y: number | null;
    z: number;
    notes: string | null;
    isEnd: boolean;
}

interface PointEntryProps {
    data: PointOfInterest;
}

export function PointEntry({ data }: PointEntryProps) {}
