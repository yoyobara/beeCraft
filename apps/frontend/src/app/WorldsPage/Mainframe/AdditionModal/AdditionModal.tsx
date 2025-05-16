import styles from './AdditionModal.module.scss';

interface AdditionModalProps {}

export function AdditionModal({}: AdditionModalProps) {
    return <div className={styles.overlay} />;
}
