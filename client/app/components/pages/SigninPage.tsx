"use client";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import useRequest from "@/app/hooks/useRequest";
import Input from "@/app/components/Input";
import Button from "@/app/components/Button";

export default function SigninPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { doRequest, errors } = useRequest({
    url: "/api/users/signin",
    method: "post",
    body: {
      email,
      password,
    },
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    doRequest();
  };

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
      <h1 className="font-bold text-2xl">Sign In</h1>
      <form className="flex flex-col gap-3 mt-5" onSubmit={handleSubmit}>
        <div className="flex flex-col">
          <label className="font-medium">Email Address</label>
          <Input value={email} setValue={setEmail} type="email" />
        </div>
        <div className="flex flex-col">
          <label className="font-medium">Password</label>
          <Input value={password} setValue={setPassword} type="password" />
        </div>
        <Button value="Sign In" type="submit" />

        {errors}
      </form>
    </div>
  );
}
