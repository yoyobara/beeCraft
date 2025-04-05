type FieldProps = React.InputHTMLAttributes<HTMLInputElement>;

export function Field({ children, ...props }: FieldProps) {
    return <input {...props}>{children}</input>;
}
