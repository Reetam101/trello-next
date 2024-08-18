"use client";
import { signIn } from "next-auth/react";

function LoginButton() {
  return (
    <button
      onClick={() => signIn("google")}
      className="bg-gray-300 py-2 px-4 ml-2"
    >
      Login
    </button>
  );
}

export default LoginButton;
