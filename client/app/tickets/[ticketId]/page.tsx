"use server";
import BaseLayout from "@/app/layouts/BaseLayout";
import axiosClient from "@/app/helpers/axiosClient";
import { ICurrentUserResponse, ITicket } from "@/app/types/interfaces";
import ShowTicketPage from "@/app/components/pages/ShowTicketPage";

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

async function getTicket(id: string): Promise<ITicket | null> {
  const client = axiosClient();
  try {
    const { data } = await client.get<ITicket>(`/api/tickets/${id}`);
    return data;
  } catch (error) {
    return null;
  }
}

export default async function Page({
  params: { ticketId },
}: {
  params: { ticketId: string };
}) {
  const { currentUser } = await getUser();
  const ticket = await getTicket(ticketId);

  return (
    <BaseLayout currentUser={currentUser}>
      <ShowTicketPage ticket={ticket} />
    </BaseLayout>
  );
}
