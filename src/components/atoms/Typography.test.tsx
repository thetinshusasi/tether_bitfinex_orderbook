// src/components/Typography/Typography.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Typography from './Typography';

describe('Typography component', () => {
    const variants = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span'] as const;

    variants.forEach(variant => {
        test(`renders ${variant} variant correctly`, () => {
            render(
                <Typography variant={variant} className="custom-class">
                    Test {variant}
                </Typography>
            );

            const element = screen.getByText(`Test ${variant}`);
            expect(element).toBeInTheDocument();
            expect(element.tagName.toLowerCase()).toBe(variant);
            expect(element).toHaveClass('custom-class');
        });
    });

    test('applies custom class name correctly', () => {
        render(
            <Typography variant="p" className="custom-class">
                Test Paragraph
            </Typography>
        );

        const element = screen.getByText('Test Paragraph');
        expect(element).toBeInTheDocument();
        expect(element).toHaveClass('text-base');
        expect(element).toHaveClass('custom-class');
    });
});
