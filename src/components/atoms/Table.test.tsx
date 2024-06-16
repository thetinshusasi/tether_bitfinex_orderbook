// src/components/Table/Table.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { Table, TableHeader, TableBody, TableFooter, TableRow, TableHead, TableCell, TableCaption } from './Table';
import { act } from 'react';

describe('Table component', () => {
    test("renders Table component correctly", () => {
        render(
            <Table>
                <TableCaption>Test Table</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Header 1</TableHead>
                        <TableHead>Header 2</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell>Cell 1</TableCell>
                        <TableCell>Cell 2</TableCell>
                    </TableRow>
                </TableBody>
                <TableFooter>
                    <TableRow>
                        <TableCell>Footer 1</TableCell>
                        <TableCell>Footer 2</TableCell>
                    </TableRow>
                </TableFooter>
            </Table>
        );

        expect(screen.getByText("Test Table")).toBeInTheDocument();
        expect(screen.getByText("Header 1")).toBeInTheDocument();
        expect(screen.getByText("Header 2")).toBeInTheDocument();
        expect(screen.getByText("Cell 1")).toBeInTheDocument();
        expect(screen.getByText("Cell 2")).toBeInTheDocument();
        expect(screen.getByText("Footer 1")).toBeInTheDocument();
        expect(screen.getByText("Footer 2")).toBeInTheDocument();
    });


});
