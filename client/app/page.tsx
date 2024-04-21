import BaseLayout from "./layouts/BaseLayout";
import axiosClient from "./helpers/axiosClient";
import {
  ICurrentUserResponse,
  ITicket,
  ITicketResponse,
} from "./types/interfaces";
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

async function getTickets(): Promise<ITicketResponse> {
  const client = axiosClient();
  try {
    const { data } = await client.get<ITicket[]>("/api/tickets");
    return { tickets: data };
  } catch (error) {
    return { tickets: null };
  }
}

export default async function Home() {
  const { currentUser } = await getUser();
  const { tickets } = await getTickets();

  const renderedTickets = tickets?.map((ticket) => (
    <tr key={ticket.id}>
      <td className="px-6 border-b py-3">{ticket.title}</td>
      <td className="px-6 border-b py-3">${ticket.price}</td>
      <td className="px-6 border-b py-3 text-blue-300 hover:text-blue-400 transition-all duration-300">
        <Link href={`/tickets/${ticket.id}`}>View</Link>
      </td>
    </tr>
  ));

  return (
    <BaseLayout currentUser={currentUser}>
      <div className="w-full max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
        <h2 className="font-bold text-2xl">Tickets</h2>
        <table className="w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-700 uppercase">
            <tr>
              <th className="px-6 border-b py-3">Title</th>
              <th className="px-6 border-b py-3">Price</th>
              <th className="px-6 border-b py-3">Link</th>
            </tr>
          </thead>
          <tbody>{renderedTickets}</tbody>
        </table>
      </div>
    </BaseLayout>
  );
}
