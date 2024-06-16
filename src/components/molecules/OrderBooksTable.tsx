import React from "react";
import { formatNumber } from "../../helper/common";
import { OrderBookEntry } from "../../slices/orderBook/orderBookSlice";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "../atoms/Table";



interface OrderBookTableProps {
  title: string;
  entries: OrderBookEntry[];
  isBid?: boolean;
  precision?: number;
}

export const OrderBookTable: React.FC<OrderBookTableProps> = ({ entries, precision = 2 }) => {
  return (
    <div className={`flex flex-col rounded-lg border`}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Count</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Total</TableHead>
            <TableHead className="text-right">Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {!entries || entries.length === 0 ? (
            <TableRow>
              <TableCell>Loading...</TableCell>
            </TableRow>
          ) : (
            entries.map((entry, index) => (
              <TableRow key={index}>
                <TableCell>{entry.count}</TableCell>
                <TableCell>{formatNumber(entry.amount, precision)}</TableCell>
                <TableCell>{formatNumber(entry.total || 0, precision)}</TableCell>
                <TableCell className="text-right">{entry.price}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};
