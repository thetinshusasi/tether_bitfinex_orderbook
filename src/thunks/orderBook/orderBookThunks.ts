import { Dispatch } from '@reduxjs/toolkit';
import { addOrUpdateBid, addOrUpdateAsk, OrderBookEntry } from '../../slices/orderBook/orderBookSlice';
import WebSocketMessage from '../../models/websocket/WebSocketMessage';

const MAX_RECONNECT_ATTEMPTS = 100;
const RECONNECT_INTERVAL_MS = 2000;

let socket: WebSocket | null = null;
let userInitiatedDisconnect = false;

export const connectWebSocket = (dispatch: Dispatch, reconnectAttempts = 0): void => {
  userInitiatedDisconnect = false; // Reset the flag when connecting

  socket = new WebSocket('wss://api-pub.bitfinex.com/ws/2');

  socket.onopen = () => {
    const msg: WebSocketMessage = {
      event: 'subscribe',
      channel: 'book',
      symbol: 'tBTCUSD',
      prec: 'P0',
      freq: 'F0',
      len: '25',
    };
    sendMessage(msg);
  };

  socket.onmessage = (message: MessageEvent) => {
    const payload = JSON.parse(message.data);
    if (payload.event && payload.event === "subscribed") {
      console.log("IM SUBSCRIBED", payload);
      return;
    }

    if (Array.isArray(payload)) {
      parseOrderBookData(payload, dispatch);
    }
  };

  socket.onclose = () => {
    if (!userInitiatedDisconnect && reconnectAttempts < MAX_RECONNECT_ATTEMPTS) {
      console.warn(`WebSocket closed, attempting to reconnect... (${reconnectAttempts + 1})`);
      setTimeout(() => connectWebSocket(dispatch, reconnectAttempts + 1), RECONNECT_INTERVAL_MS);
      return;
    }

    if (userInitiatedDisconnect) {
      console.log('WebSocket connection closed by user.');
    } else {
      console.error('Max reconnect attempts reached. WebSocket connection failed.');
    }
  };

  socket.onerror = (error: Event) => {
    console.error('WebSocket error:', error);
    socket?.close();
  };
};

export const disconnectWebSocket = (): void => {
  if (socket) {
    userInitiatedDisconnect = true;
    socket.close();
    socket = null;
  }
};

const sendMessage = (msg: WebSocketMessage) => {
  if (socket?.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(msg));
  } else {
    socket?.addEventListener('open', () => {
      socket?.send(JSON.stringify(msg));
    }, { once: true });
  }
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parseOrderBookData = (data: any[], dispatch: Dispatch): void => {
  if (data[1] === "hb") {
    return;
  }

  const [, orderData] = data;
  if (Array.isArray(orderData[0])) {
    orderData.forEach((update: [number, number, number]) => {
      const [price, count, amount] = update;
      handleUpdate({ price, count, amount }, dispatch);
    });
    return;
  }
  const [price, count, amount] = orderData;
  handleUpdate({ price, count, amount }, dispatch);
};

const handleUpdate = (
  { price, count, amount }: OrderBookEntry,
  dispatch: Dispatch
): void => {
  const entry: OrderBookEntry = { price, count, amount: Math.abs(amount) };
  if (count > 0) {
    amount > 0
      ? dispatch(addOrUpdateBid(entry))
      : dispatch(addOrUpdateAsk({ ...entry, amount: -entry.amount }));
    return;
  }
  if (amount === 1) {
    dispatch(addOrUpdateBid({ ...entry, count: 0 }));
  }
  if (amount === -1) {
    dispatch(addOrUpdateAsk({ ...entry, count: 0, amount: -entry.amount }));
  }
};
