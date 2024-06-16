// src/components/ui/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import Button from './Button';  // Ensure the import path is correct
import '@testing-library/jest-dom'


describe('Button Component', () => {
    it('renders correctly with default props', () => {
        render(<Button>Click me</Button>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        expect(buttonElement).toBeInTheDocument();
        expect(buttonElement).toHaveClass('bg-primary text-primary-foreground hover:bg-primary/90');
    });

    it('applies the correct variant and size classes', () => {
        render(<Button variant="destructive" size="lg">Delete</Button>);
        const buttonElement = screen.getByRole('button', { name: /delete/i });
        expect(buttonElement).toHaveClass('bg-destructive text-destructive-foreground hover:bg-destructive/90 h-11 px-8');
    });

    it('handles click events', () => {
        const handleClick = jest.fn();
        render(<Button onClick={handleClick}>Click me</Button>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        fireEvent.click(buttonElement);
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('renders as a different component when asChild is true', () => {
        render(<Button asChild><div role="button">Click me</div></Button>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        expect(buttonElement.tagName).toBe('DIV');
    });

    it('applies custom className', () => {
        render(<Button className="custom-class">Click me</Button>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        expect(buttonElement).toHaveClass('custom-class');
    });

    it('applies the ghost variant correctly', () => {
        render(<Button variant="ghost">Ghost Button</Button>);
        const buttonElement = screen.getByRole('button', { name: /ghost button/i });
        expect(buttonElement).toHaveClass('hover:bg-accent hover:text-accent-foreground');
    });

    it('is disabled when the disabled prop is set', () => {
        render(<Button disabled>Click me</Button>);
        const buttonElement = screen.getByRole('button', { name: /click me/i });
        expect(buttonElement).toBeDisabled();
    });
});
