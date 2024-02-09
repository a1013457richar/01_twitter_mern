"use client";

import { signIn} from "next-auth/react";
import React from "react";

export default function LoginButton() {
  return (
    <button className="px-4 py-2 ml-2 bg-gray-300" onClick={() => signIn("google")}>
      Login
    </button>
  );
}
