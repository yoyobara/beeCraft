import React, { useState } from 'react';
import {
    Dimension,
    DimensionDisplay,
} from '../../../../components/DimensionDisplay';
import { Button } from '../../../../components/Button';
import { Field } from '../../../../components/Field';
import styles from './AdditionModal.module.scss';

const DIMENSIONS: Array<Dimension> = ['overworld', 'nether', 'end'];

export interface newPointFields {
    name: string;
    dimension: Dimension;
    x: number;
    y: number | null;
    z: number;
    notes: string | null;
}

interface AdditionModalProps {
    onSave: (fields: newPointFields) => void;
    setAdditionModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function AdditionModal({
    onSave,
    setAdditionModalOpen,
}: AdditionModalProps) {
    const [name, setName] = useState<string>('');
    const [dimensionIndex, setDimensionIndex] = useState<number>(0);
    const [x, setX] = useState<string>('');
    const [y, setY] = useState<string>('');
    const [z, setZ] = useState<string>('');
    const [notes, setNotes] = useState<string>('');

    const dimension = DIMENSIONS[dimensionIndex % DIMENSIONS.length];

    return (
        <div
            className={styles.overlay}
            onClick={(ev) => {
                ev.target === ev.currentTarget && setAdditionModalOpen(false);
            }}
        >
            <div className={styles.modal}>
                <Field
                    className={styles.name}
                    variant="primary"
                    placeholder="name"
                    onChange={(ev) => setName(ev.target.value)}
                />
                <DimensionDisplay
                    className={styles.dimension}
                    dimension={dimension}
                    onClick={() => {
                        setDimensionIndex(dimensionIndex + 1);
                    }}
                />
                <Field
                    className={styles.coordinate}
                    variant="primary"
                    placeholder="X"
                    onChange={(ev) => setX(ev.target.value)}
                />
                <Field
                    className={styles.coordinate}
                    variant="primary"
                    placeholder="Y"
                    onChange={(ev) => setY(ev.target.value)}
                />
                <Field
                    className={styles.coordinate}
                    variant="primary"
                    placeholder="Z"
                    onChange={(ev) => setZ(ev.target.value)}
                />
                <Field
                    className={styles.notes}
                    variant="primary"
                    placeholder="notes"
                    onChange={(ev) => setNotes(ev.target.value)}
                />
                <Button
                    className={styles.save_button}
                    variant="primary"
                    kind="contained"
                    onClick={() => {
                        onSave({
                            name,
                            x: Number(x),
                            y: y ? Number(y) : null,
                            z: Number(z),
                            notes: notes ? notes : null,
                            dimension,
                        });
                    }}
                >
                    SAVE
                </Button>
            </div>
        </div>
    );
}
