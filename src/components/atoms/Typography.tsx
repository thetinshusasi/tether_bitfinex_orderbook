import React from 'react';
import { cn } from '../../helper/common';

interface TypographyProps {
    variant: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
    className?: string;
    children: React.ReactNode;
}

const typographyVariants = {
    h1: 'text-4xl font-bold',
    h2: 'text-3xl font-semibold',
    h3: 'text-2xl font-semibold',
    h4: 'text-xl font-medium',
    h5: 'text-lg font-medium',
    h6: 'text-base font-medium',
    p: 'text-base',
    span: 'text-base',
};

const Typography: React.FC<TypographyProps> = ({ variant, className, children }) => {
    const Component = variant;

    return (
        <Component className={cn(typographyVariants[variant], className)}>
            {children}
        </Component>
    );
};

export default Typography;
