import clsx from 'clsx';
import React from 'react';
import styles from './Button.module.scss';

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
