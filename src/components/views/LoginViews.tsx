"use client";


import React from "react";
import { signIn } from "next-auth/react";

const LoginViews = () => {
  return (
    <div className="w-full pt-8 text-center">
      <button type="button" className="primary"
      onClick={() => signIn("google")}
      
      >Login</button>
    </div>
  );
};

export default LoginViews;
