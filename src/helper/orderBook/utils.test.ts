// src/slices/orderBook/orderBookUtils.test.ts

import { OrderBookEntry } from "../../slices/orderBook/orderBookSlice";
import { calculateTotal, insertInSortedOrder } from "./utils";



describe('insertInSortedOrder', () => {
    const mockArray: OrderBookEntry[] = [
        { price: 10000, count: 5, amount: 0.5, total: 0 },
        { price: 9500, count: 3, amount: 0.3, total: 0 },
    ];

    test('inserts item in descending order', () => {
        const newItem: OrderBookEntry = { price: 9800, count: 2, amount: 0.2, total: 0 };
        const result = insertInSortedOrder(mockArray, newItem);
        expect(result).toEqual([
            { price: 10000, count: 5, amount: 0.5, total: 0 },
            { price: 9800, count: 2, amount: 0.2, total: 0 },
            { price: 9500, count: 3, amount: 0.3, total: 0 },
        ]);
    });



    test('removes item if count is 0', () => {
        const removeItem: OrderBookEntry = { price: 9500, count: 0, amount: 0.0, total: 0 };
        const result = insertInSortedOrder(mockArray, removeItem);
        expect(result).toEqual([{ price: 10000, count: 5, amount: 0.5, total: 0 }]);
    });

    test('replaces item at the correct index', () => {
        const newItem: OrderBookEntry = { price: 9500, count: 4, amount: 0.4, total: 0 };
        const result = insertInSortedOrder(mockArray, newItem);
        expect(result).toEqual([
            { price: 10000, count: 5, amount: 0.5, total: 0 },
            { price: 9500, count: 4, amount: 0.4, total: 0 },
        ]);
    });
});

describe('calculateTotal', () => {
    const mockArray: OrderBookEntry[] = [
        { price: 10000, count: 5, amount: 0.5, total: 0 },
        { price: 9500, count: 3, amount: 0.3, total: 0 },
    ];

    test('calculates cumulative total correctly', () => {
        const result = calculateTotal(mockArray);
        expect(result).toEqual([
            { price: 10000, count: 5, amount: 0.5, total: 0.5 },
            { price: 9500, count: 3, amount: 0.3, total: 0.8 },
        ]);
    });

    test('handles empty array', () => {
        const result = calculateTotal([]);
        expect(result).toEqual([]);
    });

    test('handles negative amounts', () => {
        const mockArrayWithNegatives: OrderBookEntry[] = [
            { price: 10000, count: 5, amount: -0.5, total: 0 },
            { price: 9500, count: 3, amount: 0.3, total: 0 },
        ];
        const result = calculateTotal(mockArrayWithNegatives);
        expect(result).toEqual([
            { price: 10000, count: 5, amount: -0.5, total: 0.5 },
            { price: 9500, count: 3, amount: 0.3, total: 0.8 },
        ]);
    });
});