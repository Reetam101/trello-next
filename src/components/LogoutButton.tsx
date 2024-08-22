"use client";

import { signOut } from "next-auth/react";
import { FiLogOut } from "react-icons/fi";
function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="bg-gray-300 px-4 py-2 ml-2 rounded-xl inline-flex items-center gap-2 text-gray-950"
    >
      Logout
      <FiLogOut />
    </button>
  );
}

export default LogoutButton;
