import Link from "next/link";
import { ICurrentUser, ILink } from "@/app/types/interfaces";

export default function Header({
  currentUser,
}: {
  currentUser: ICurrentUser | null;
}) {
  const links: ILink[] = [
    !currentUser && {
      label: "Sign Up",
      href: "/auth/signup",
    },
    !currentUser && {
      label: "Sign In",
      href: "/auth/signin",
    },
    currentUser && {
      label: "Sell Tickets",
      href: "/tickets/new",
    },
    currentUser && {
      label: "My Orders",
      href: "/orders",
    },
    currentUser && {
      label: "Sign Out",
      href: "/auth/signout",
    },
  ].filter(Boolean) as ILink[];

  const renderedLinks: JSX.Element[] = links.map(
    (link, index) =>
      link && (
        <Link
          href={link.href}
          className="text-blue-400 hover:text-blue-500 transition-all duration-300 font-medium"
          key={index}
        >
          {link.label}
        </Link>
      )
  );

  return (
    <header className="flex justify-between items-center bg-gray-50 p-5">
      <div>
        <Link className="font-bold" href={"/"}>
          GitTix
        </Link>
      </div>
      <nav className="flex gap-2">{renderedLinks}</nav>
    </header>
  );
}
