"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import StripeCheckout from "react-stripe-checkout";
import useRequest from "@/app/hooks/useRequest";
import { IOrder, ICurrentUser, IPayment } from "@/app/types/interfaces";

export default function ShowOrderPage({
  order,
  currentUser,
}: {
  order: IOrder | null;
  currentUser: ICurrentUser | null;
}) {
  const [timeLeft, setTimeLeft] = useState(-100);
  const router = useRouter();

  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order?.id,
    },
    onSuccess: () => {
      router.push("/orders");
      router.refresh();
    },
  });

  useEffect(() => {
    let timerId: NodeJS.Timeout;

    if (order) {
      const findTimeLeft = () => {
        const msLeft =
          new Date(order.expiresAt).getTime() - new Date().getTime();
        setTimeLeft(Math.round(msLeft / 1000));
      };

      findTimeLeft();
      timerId = setInterval(findTimeLeft, 1000);
    }

    return () => {
      if (timerId) {
        clearInterval(timerId);
      }
    };
  }, [order]);

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl">
        {order ? order.id : "Order not found"}
      </h1>
      {order && (
        <div className="flex flex-col items-center gap-3 mt-5">
          {timeLeft < 0 ? (
            <>
              <h4 className="text-center">Order Expired</h4>
            </>
          ) : (
            <>
              <h4 className="text-center">
                Time left to pay: {timeLeft} seconds
              </h4>
              <StripeCheckout
                token={({ id }) => doRequest<{ token: string }>({ token: id })}
                stripeKey="pk_test_51MdlxTLxL8s6yvJ11bmpMyyuB4T6ee7lS3eQCW7pst4LOAR0ZHZi6kexncEEuwLOK72Qx5hsSnKFrvHILktMlw3e00ikLont3d"
                amount={order.ticket.price * 100}
                email={currentUser?.email}
              />
            </>
          )}
          {errors}
        </div>
      )}
    </div>
  );
}
