"use server";
import BaseLayout from "@/app/layouts/BaseLayout";
import axiosClient from "@/app/helpers/axiosClient";
import { ICurrentUserResponse, IOrder, ITicket } from "@/app/types/interfaces";
import ShowOrderPage from "@/app/components/pages/ShowOrderPage";

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

async function getOrder(id: string): Promise<IOrder | null> {
  const client = axiosClient();
  try {
    const { data } = await client.get<IOrder>(`/api/orders/${id}`);
    return data;
  } catch (error) {
    return null;
  }
}

export default async function Page({
  params: { orderId },
}: {
  params: { orderId: string };
}) {
  const { currentUser } = await getUser();
  const order = await getOrder(orderId);

  return (
    <BaseLayout currentUser={currentUser}>
      <ShowOrderPage order={order} currentUser={currentUser} />
    </BaseLayout>
  );
}
