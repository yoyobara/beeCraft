import clsx from 'clsx';
import styles from './Button.module.scss';
import React from 'react';

interface ButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary' | 'accent';
    kind: 'contained' | 'outlined' | 'text';
}

export function Button({
    variant,
    kind,
    className,
    children,
    ...props
}: ButtonProps) {
    return (
        <button
            className={clsx(
                styles.button,
                styles[variant],
                styles[kind],
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
}
