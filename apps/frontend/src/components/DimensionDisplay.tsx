import { overworld, nether, end } from '../assets/dimension';

export type Dimension = 'overworld' | 'nether' | 'end';

const dimensionToIcon: Record<Dimension, string> = {
    overworld,
    nether,
    end,
};

interface DimensionDisplayProps {
    className?: string;
    dimension: Dimension;
}

export function DimensionDisplay({
    className,
    dimension,
}: DimensionDisplayProps) {
    return (
        <img
            className={className}
            src={dimensionToIcon[dimension]}
            alt={`[${dimension}]`}
        />
    );
}
