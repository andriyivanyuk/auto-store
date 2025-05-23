"use client";

import { Fragment } from "react";

import OrderRow from "./OrderRow";
import FlexBox from "@component/FlexBox";
import Pagination from "@component/pagination";
import Order from "@models/order.model";

// ==============================================================
type Props = { orders: Order[] };
// ==============================================================

export default function OrderList({ orders }: Props) {
  return (
    <Fragment>
      {orders.map((item) => (
        <OrderRow order={item} key={item.id} />
      ))}

      <FlexBox justifyContent="center" mt="2.5rem">
        <Pagination pageCount={5} onChange={(data) => console.log(data)} />
      </FlexBox>
    </Fragment>
  );
}
