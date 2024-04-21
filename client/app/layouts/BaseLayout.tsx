import Header from "@/app/components/Header";
import { ICurrentUser } from "@/app/types/interfaces";

export default function BaseLayout({
  children,
  currentUser,
}: {
  children: React.ReactNode;
  currentUser: ICurrentUser | null;
}) {
  return (
    <>
      <Header currentUser={currentUser} />
      <div className="p-5">{children}</div>
    </>
  );
}
