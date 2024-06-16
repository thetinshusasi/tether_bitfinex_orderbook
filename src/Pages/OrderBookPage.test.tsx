// src/pages/OrderBookPage.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';


// Mock the required modules and components
jest.mock('react-icons/fa', () => ({
    FaArrowLeft: ({ onClick }: { onClick: () => void }) => <button onClick={onClick}>Left</button>,
    FaArrowRight: ({ onClick }: { onClick: () => void }) => <button onClick={onClick}>Right</button>,
}));

jest.mock('../components/molecules/OrderBooksTable', () => ({
    OrderBookTable: ({ title }: { title: string }) => <div>{title}</div>,
}));

jest.mock('../thunks/orderBook/orderBookThunks', () => ({
    connectWebSocket: jest.fn(),
    disconnectWebSocket: jest.fn(),
}));

jest.mock('../slices/websocket/websocketSlice', () => ({
    setConnected: jest.fn(),
}));

// Define default states

// const defaultWebSocketState: WebSocketState = {
//     connected: false,
// };

// const defaultOrderBookState: OrderBookState = {
//     bids: [],
//     asks: [],
// };

// Configure the store for testing with default states
// const store = configureStore({
//     reducer: {
//         // webSocket: websocketReducer,
//         orderBook: orderBookReducer,
//     },
//     preloadedState: {
//         webSocket: defaultWebSocketState,
//         orderBook: defaultOrderBookState,
//     },
// });

describe('OrderBookPage', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('ToDo : renders OrderBookPage component correctly', () => {

        expect("todo").toBe("todo")
        // render(
        //     <Provider store={store}>
        //         <OrderBookPage />
        //     </Provider>
        // );

        // expect(screen.getByText('Order Book')).toBeInTheDocument();
        // expect(screen.getByText('Bids')).toBeInTheDocument();
        // expect(screen.getByText('Asks')).toBeInTheDocument();
    });


    // test('renders OrderBookPage component correctly', () => {
    //     render(
    //         <Provider store={store}>
    //             <OrderBookPage />
    //         </Provider>
    //     );

    //     // expect(screen.getByText('Order Book')).toBeInTheDocument();
    //     // expect(screen.getByText('Bids')).toBeInTheDocument();
    //     // expect(screen.getByText('Asks')).toBeInTheDocument();
    // });

    // test('connects WebSocket on load and disconnects on unmount', () => {
    //     const { unmount } = render(
    //         <Provider store={store}>
    //             <OrderBookPage />
    //         </Provider>
    //     );

    //     expect(connectWebSocket).toHaveBeenCalled();
    //     expect(setConnected).toHaveBeenCalledWith(true);

    //     unmount();

    //     expect(disconnectWebSocket).toHaveBeenCalled();
    //     expect(setConnected).toHaveBeenCalledWith(false);
    // });

    // test('handles connect and disconnect button clicks', () => {
    //     render(
    //         <Provider store={store}>
    //             <OrderBookPage />
    //         </Provider>
    //     );

    //     const connectButton = screen.getByText('Connect');
    //     const disconnectButton = screen.getByText('Disconnect');

    //     fireEvent.click(connectButton);
    //     expect(connectWebSocket).toHaveBeenCalled();
    //     expect(setConnected).toHaveBeenCalledWith(true);

    //     fireEvent.click(disconnectButton);
    //     expect(disconnectWebSocket).toHaveBeenCalled();
    //     expect(setConnected).toHaveBeenCalledWith(false);
    // });

    // test('handles precision increase and decrease', () => {
    //     render(
    //         <Provider store={store}>
    //             <OrderBookPage />
    //         </Provider>
    //     );

    //     const increaseButton = screen.getByText('Right');
    //     const decreaseButton = screen.getByText('Left');

    //     fireEvent.click(increaseButton);
    //     expect(screen.getByText('.00')).toBeInTheDocument();

    //     fireEvent.click(decreaseButton);
    //     expect(screen.getByText('.0')).toBeInTheDocument();
    // });
});
