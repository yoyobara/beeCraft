import { DimensionDisplay } from '../../../../components/DimensionDisplay';
import { Button } from '../../../../components/Button';
import { Field } from '../../../../components/Field';
import styles from './AdditionModal.module.scss';

interface AdditionModalProps {}

export function AdditionModal({}: AdditionModalProps) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <Field
                    className={styles.name}
                    variant="primary"
                    placeholder="name"
                />
                <DimensionDisplay
                    className={styles.dimension}
                    dimension="overworld"
                />
                <Field
                    className={styles.coordinate}
                    variant="primary"
                    placeholder="X"
                />
                <Field
                    className={styles.coordinate}
                    variant="primary"
                    placeholder="Y"
                />
                <Field
                    className={styles.coordinate}
                    variant="primary"
                    placeholder="Z"
                />
                <Field
                    className={styles.notes}
                    variant="primary"
                    placeholder="notes"
                />
                <Button
                    className={styles.save_button}
                    variant="primary"
                    kind="contained"
                >
                    SAVE
                </Button>
            </div>
        </div>
    );
}
