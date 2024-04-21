"use server";
import { revalidatePath } from "next/cache";
revalidatePath("/", "layout");

import BaseLayout from "@/app/layouts/BaseLayout";
import axiosClient from "@/app/helpers/axiosClient";
import { ICurrentUserResponse } from "@/app/types/interfaces";
import SignoutPage from "@/app/components/pages/SignoutPage";

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
export default async function Signout() {
  const { currentUser } = await getUser();
  return (
    <BaseLayout currentUser={currentUser}>
      <SignoutPage />
    </BaseLayout>
  );
}
