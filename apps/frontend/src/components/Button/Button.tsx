import clsx from 'clsx';
import styles from './Button.module.scss';
import React from 'react';

interface ButtonProps extends React.InputHTMLAttributes<HTMLButtonElement> {
    variant: 'primary' | 'secondary' | 'accent';
    kind: 'contained' | 'outlined';
}

export function Button({ variant, kind, className, children }: ButtonProps) {
    return (
        <button
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
