import BaseLayout from "../layouts/BaseLayout";
import axiosClient from "../helpers/axiosClient";
import {
  ICurrentUserResponse,
  IOrder,
  IOrderResponse,
} from "../types/interfaces";
import Link from "next/link";

async function getUser(): Promise<ICurrentUserResponse> {
  const client = axiosClient();
  try {
    const { data } = await client.get<ICurrentUserResponse>(
      "/api/users/currentuser"
    );
    return data;
  } catch (error) {
    return { currentUser: null };
  }
}

async function getTickets(): Promise<IOrderResponse> {
  const client = axiosClient();
  try {
    const { data } = await client.get<IOrder[]>("/api/orders");
    return { orders: data };
  } catch (error) {
    return { orders: null };
  }
}

export default async function Page() {
  const { currentUser } = await getUser();
  const { orders } = await getTickets();

  const renderedOrders = orders?.map((order) => (
    <tr key={order.id}>
      <td className="px-6 border-b py-3">{order.ticket.title}</td>
      <td className="px-6 border-b py-3">{order.status}</td>
    </tr>
  ));

  return (
    <BaseLayout currentUser={currentUser}>
      <div className="w-full max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
        <h1 className="font-bold text-2xl">Orders</h1>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th className="px-6 border-b py-3">Ticket</th>
              <th className="px-6 border-b py-3">Status</th>
            </tr>
          </thead>
          <tbody>{renderedOrders}</tbody>
        </table>
      </div>
    </BaseLayout>
  );
}
