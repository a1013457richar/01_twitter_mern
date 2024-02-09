import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";
import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import Link from "next/link";

const Header = async () => {
  const session = await getServerSession(authOptions);
  return (
    <header className="bg-gray-200 p-4 px-8">
      <div className="flex justify-between items-center">
        <Link className="logo" href="/">
          Trello
        </Link>
        <div>
          {session && (
            <>
              Hello, {session.user?.name}
            <LogoutButton />
            </>
          )}
          {!session && (
            <>
          <LoginButton />
          </>
        )}
        </div>
      </div>
    </header>
  );
};

export default Header;
