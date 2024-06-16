import { OrderBookEntry } from "../../slices/orderBook/orderBookSlice";

export const insertInSortedOrder = (array: OrderBookEntry[], item: OrderBookEntry, descending = true): OrderBookEntry[] => {
  // Find the correct index to insert the item
  const index = array.findIndex(entry =>
    descending ? item.price >= entry.price : item.price <= entry.price
  );

  // If count is 0, remove the item
  if (item.count === 0) {
    if (index !== -1) {
      return [...array.slice(0, index), ...array.slice(index + 1)];
    }
    return array; // Item not found, no removal needed
  }

  // Insert or replace the item at the correct index
  if (index === -1) {
    return descending ? [item, ...array] : [...array, item];
  } else if (array[index].price === item.price) {
    return [...array.slice(0, index), item, ...array.slice(index + 1)];
  } else {
    return [...array.slice(0, index), item, ...array.slice(index)];
  }
}


// export const insertInSortedOrder = (array: OrderBookEntry[], item: OrderBookEntry, descending = true): OrderBookEntry[] => {
//   // Find the correct index to insert the item
//   const index = array.findIndex(entry =>
//     descending ? item.price > entry.price : item.price < entry.price
//   );

//   // If the item doesn't exist already, insert it
//   if (index === -1) {
//     return descending ? [item, ...array] : [...array, item];
//   }

//   // If count is 0, remove the item
//   if (item.count === 0) {
//     return [...array.slice(0, index), ...array.slice(index + 1)];
//   }

//   // Replace the item at the correct index if it already exists
//   return [
//     ...array.slice(0, index),
//     item,
//     ...array.slice(index + 1),
//   ];
// }

export const calculateTotal = (array: OrderBookEntry[]): OrderBookEntry[] => {
  let cumulativeTotal = 0;
  return array.map(entry => {
    cumulativeTotal += Math.abs(entry.amount);
    return { ...entry, total: cumulativeTotal };
  });
}