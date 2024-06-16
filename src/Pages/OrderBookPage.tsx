

import React, { useEffect, useCallback, useState } from "react";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import Button from "../components/atoms/Button";
import Typography from "../components/atoms/Typography";
import { OrderBookTable } from "../components/molecules/OrderBooksTable";
import { selectBids, selectAsks } from "../slices/orderBook/orderBookSlice";
import { setConnected } from "../slices/websocket/websocketSlice";
import { connectWebSocket, disconnectWebSocket } from "../thunks/orderBook/orderBookThunks";


const OrderBookPage = () => {

    const dispatch = useDispatch<AppDispatch>();
    const connected = useSelector(
        (state: RootState) => state.webSocket.connected
    );

    const selectTopBids = useCallback(
        (state: RootState) => selectBids(state).slice(0, 15),
        []
    );
    const selectTopAsks = useCallback(
        (state: RootState) => selectAsks(state).slice(0, 15),
        []
    );

    const bids = useSelector(selectTopBids);
    const asks = useSelector(selectTopAsks);

    const [precision, setPrecision] = useState(5);

    const increasePrecision = () =>
        setPrecision((prev) => Math.min(prev + 1, 10));
    const decreasePrecision = () => setPrecision((prev) => Math.max(prev - 1, 2));
    const decrementText = ".0";
    const incrementText = ".00";

    const handleConnect = useCallback(() => {
        connectWebSocket(dispatch);
        dispatch(setConnected(true));
    }, [dispatch]);

    const handleDisconnect = useCallback(() => {
        disconnectWebSocket();
        dispatch(setConnected(false));
    }, [dispatch]);

    useEffect(() => {
        handleConnect();
        return () => {
            handleDisconnect();
        };
    }, [dispatch, handleConnect, handleDisconnect]);
    return (
        <div className="dark min-h-screen w-full py-12 flex justify-center items-center">
            <div className="relative w-full max-w-6xl mx-auto text-white">
                <div className="flex items-center space-x-4">
                    <Button
                        onClick={handleConnect}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition duration-300 ease-in-out disabled:bg-gray-500"
                        disabled={connected}
                    >
                        Connect
                    </Button>
                    <button
                        onClick={handleDisconnect}
                        className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition duration-300 ease-in-out disabled:bg-gray-500"
                        disabled={!connected}
                    >
                        Disconnect
                    </button>
                </div>

                <div className="flex gap-6 justify-end p-4">
                    <div>
                        {decrementText}
                        <FaArrowLeft onClick={decreasePrecision} />
                    </div>
                    <div>
                        {incrementText}
                        <FaArrowRight onClick={increasePrecision} />
                    </div>
                </div>
                <div className="flex justify-center text-center gap-2">
                    <Typography variant="h1" className="text-center mb-4">

                        Order Book
                    </Typography>
                    <Typography
                        variant="h1"
                        className="text-center mb-4 text-custom-shade"
                    >

                        BTC/USD
                    </Typography>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <OrderBookTable
                        title="Bids"
                        entries={bids}
                        precision={precision}
                        isBid
                    />
                    <OrderBookTable
                        title="Asks"
                        entries={asks}
                        precision={precision} />
                </div>
            </div>
        </div>
    )
}

export default OrderBookPage