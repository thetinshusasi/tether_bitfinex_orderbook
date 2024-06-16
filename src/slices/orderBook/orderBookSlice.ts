// src/features/orderBook/orderBookSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store/store';
import { insertInSortedOrder, calculateTotal } from '../../helper/orderBook/utils';

export interface OrderBookEntry {
  price: number;
  count: number;
  amount: number; // Positive for bids, negative for asks
  total?: number
}

export interface OrderBookState {
  bids: OrderBookEntry[];
  asks: OrderBookEntry[];
}

const initialState: OrderBookState = {
  bids: [],
  asks: [],
};

const orderBookSlice = createSlice({
  name: 'orderBook',
  initialState,
  reducers: {
    addOrUpdateBid(state, action: PayloadAction<OrderBookEntry>) {
      state.bids = insertInSortedOrder(state.bids, action.payload, true);
      state.bids = calculateTotal(state.bids);
    },
    addOrUpdateAsk(state, action: PayloadAction<OrderBookEntry>) {
      state.asks = insertInSortedOrder(state.asks, action.payload, false);
      state.asks = calculateTotal(state.asks);
    },
  },
});

export const { addOrUpdateBid, addOrUpdateAsk } = orderBookSlice.actions;

export const selectBids = (state: RootState) => state.orderBook.bids;
export const selectAsks = (state: RootState) => state.orderBook.asks;

export default orderBookSlice.reducer;
