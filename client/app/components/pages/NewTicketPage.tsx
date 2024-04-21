"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import useRequest from "@/app/hooks/useRequest";
import Button from "@/app/components/Button";
import Input from "@/app/components/Input";

export default function NewTicketPage() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();

  const { doRequest, errors } = useRequest({
    url: "/api/tickets",
    method: "post",
    body: {
      title,
      price,
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  const onBlur = () => {
    const value = parseFloat(price);

    if (isNaN(value)) {
      return;
    }

    setPrice(value.toFixed(2));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    doRequest();
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl">Create a Ticket</h1>
      <form className="flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="font-medium">Title</label>
          <Input value={title} setValue={setTitle} type="text" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Price</label>
          <Input
            value={price}
            setValue={setPrice}
            type="text"
            onBlur={onBlur}
          />
        </div>
        <Button value="Create Ticket" type="submit" />

        {errors}
      </form>
    </div>
  );
}
