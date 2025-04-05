import clsx from 'clsx';
import styles from './Field.module.scss';

interface FieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant: 'primary' | 'secondary' | 'accent';
}

export function Field({ variant, children, ...props }: FieldProps) {
    return (
        <input className={clsx(styles.input, styles[variant])} {...props}>
            {children}
        </input>
    );
}
