import { overworld, nether, end } from '../../../../assets/dimension';
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

const dimensionToIcon: Record<Dimension, string> = {
    overworld,
    nether,
    end,
};

export function PointEntry({ data }: PointEntryProps) {
    return (
        <tr className={styles.row}>
            <td>
                <img
                    className={styles.dimension_icon}
                    src={dimensionToIcon[data.dimension]}
                    alt={`[${data.dimension}]`}
                />
            </td>
            <td>{data.name}</td>
            <td>{data.x}</td>
            <td>{data.y}</td>
            <td>{data.z}</td>
            <td>{data.notes}</td>
        </tr>
    );
}
