"use client";
import { useRouter } from "next/navigation";
import useRequest from "@/app/hooks/useRequest";
import Button from "@/app/components/Button";
import { ITicket, IOrder } from "@/app/types/interfaces";

export default function ShowTicketPage({ ticket }: { ticket: ITicket | null }) {
  const router = useRouter();

  const { doRequest, errors } = useRequest({
    url: "/api/orders",
    method: "post",
    body: {
      ticketId: ticket?.id,
    },
    onSuccess: (order: IOrder) => {
      router.push(`/orders/${order.id}`);
      router.refresh();
    },
  });

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl">
        {ticket ? ticket.title : "Ticket not found"}
      </h1>
      {ticket && (
        <div className="flex flex-col items-center gap-3 mt-5">
          <h4 className="text-center">Price: ${ticket.price}</h4>
          <Button value="Purchase" type="button" onClick={() => doRequest()} />
          {errors}
        </div>
      )}
    </div>
  );
}
