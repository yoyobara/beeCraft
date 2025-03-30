import clsx from 'clsx';
import styles from './Button.module.scss';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary' | 'accent';
    kind: 'contained' | 'outlined';
}

export function Button({ variant, kind, children, ...props }: ButtonProps) {
    return (
        <button
            className={clsx(styles.button, styles[variant], styles[kind])}
            {...props}
        >
            {children}
        </button>
    );
}
