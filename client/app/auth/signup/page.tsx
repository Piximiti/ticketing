"use server";
import BaseLayout from "@/app/layouts/BaseLayout";
import axiosClient from "@/app/helpers/axiosClient";
import { ICurrentUserResponse } from "@/app/types/interfaces";
import SignupPage from "@/app/components/pages/SignupPage";

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
export default async function Signin() {
  const { currentUser } = await getUser();
  return (
    <BaseLayout currentUser={currentUser}>
      <SignupPage />
    </BaseLayout>
  );
}
