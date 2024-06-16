import { configureStore } from '@reduxjs/toolkit';
import orderBookReducer from '../slices/orderBook/orderBookSlice';
import webSocketReducer from '../slices/websocket/websocketSlice';

const store = configureStore({
  reducer: {
    orderBook: orderBookReducer,
    webSocket: webSocketReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;


