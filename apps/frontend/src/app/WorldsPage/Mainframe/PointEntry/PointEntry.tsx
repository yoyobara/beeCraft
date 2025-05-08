import clsx from 'clsx';
import styles from './PointEntry.module.scss';

export interface PointOfInterest {
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

export function PointEntry({ data }: PointEntryProps) {
    return (
        <tr>
            <td>{data.name}</td>
            <td>{data.x}</td>
            <td>{data.y}</td>
            <td>{data.z}</td>
            <td>{data.notes + ' ' + data.isEnd}</td>
        </tr>
    );
}
