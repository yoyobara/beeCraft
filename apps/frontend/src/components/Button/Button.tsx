import clsx from 'clsx';
import styles from './Button.module.scss';
import { PropsWithChildren } from 'react';

interface ButtonProps extends PropsWithChildren {
    variant: 'primary' | 'secondary' | 'accent';
    kind: 'contained' | 'outlined';
    className?: string;
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function Button({
    variant,
    kind,
    className,
    onClick,
    children,
}: ButtonProps) {
    return (
        <button
            onClick={onClick}
            className={clsx(
                styles.button,
                styles[variant],
                styles[kind],
                className
            )}
        >
            {children}
        </button>
    );
}
