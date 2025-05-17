import clsx from 'clsx';
import { binIcon, editIcon, pinIcon } from '../../../../assets';
import {
    Dimension,
    DimensionDisplay,
} from '../../../../components/DimensionDisplay';
import styles from './PointEntry.module.scss';

export interface PointOfInterest {
    id: number;
    name: string;
    x: number;
    y: number | null;
    z: number;
    notes: string | null;
    dimension: Dimension;
    pinnedAt: Date | null;
}

interface PointEntryProps {
    data: PointOfInterest;
    handlePinning: (id: number, pin: boolean) => Promise<void>;
    handleDeletion: (id: number) => Promise<void>;
}

export function PointEntry({
    data,
    handlePinning,
    handleDeletion,
}: PointEntryProps) {
    return (
        <tr className={styles.row}>
            <td>
                <DimensionDisplay
                    className={styles.dimension_icon}
                    dimension={data.dimension}
                />
            </td>
            <td>{data.name}</td>
            <td>{data.x}</td>
            <td>{data.y}</td>
            <td>{data.z}</td>
            <td>{data.notes}</td>
            <td className={styles.buttons}>
                <img className={styles.button} src={editIcon} alt="edit" />
                <img
                    className={clsx(
                        styles.button,
                        data.pinnedAt && styles.pinned
                    )}
                    src={pinIcon}
                    alt="pin"
                    onClick={() => {
                        handlePinning(data.id, !data.pinnedAt);
                    }}
                />
                <img
                    className={clsx(styles.button, styles.delete_button)}
                    src={binIcon}
                    alt="delete"
                    onClick={() => {
                        handleDeletion(data.id);
                    }}
                />
            </td>
        </tr>
    );
}
