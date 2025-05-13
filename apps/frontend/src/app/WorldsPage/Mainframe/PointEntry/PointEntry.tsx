import styles from './PointEntry.module.scss';

type Dimension = 'overworld' | 'nether' | 'end';

export interface PointOfInterest {
    id: number;
    name: string;
    x: number;
    y: number | null;
    z: number;
    notes: string | null;
    dimension: Dimension;
}

interface PointEntryProps {
    data: PointOfInterest;
}

export function PointEntry({ data }: PointEntryProps) {
    return (
        <tr className={styles.row}>
            <td>{data.name}</td>
            <td>{data.x}</td>
            <td>{data.y}</td>
            <td>{data.z}</td>
            <td>{data.notes + ' ' + data.dimension}</td>
        </tr>
    );
}
