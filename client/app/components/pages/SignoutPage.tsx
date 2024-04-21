"use client";
import useRequest from "@/app/hooks/useRequest";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function SignoutPage() {
  const router = useRouter();
  const { doRequest } = useRequest({
    url: "/api/users/signout",
    body: {},
    method: "post",
    onSuccess: () => {
      router.push("/");
      router.refresh();
    },
  });

  useEffect(() => {
    doRequest();
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto h-full flex flex-col items-center justify-center">
      Signing out...
    </div>
  );
}
