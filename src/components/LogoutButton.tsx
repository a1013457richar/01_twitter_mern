"use client";

import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {signOut} from "next-auth/react";
import {faArrowRightFromBracket} from "@fortawesome/free-solid-svg-icons";


export default function LogoutButton() {
  return (
    <button className="px-4 py-2 ml-2 bg-gray-300 rounded-md inline-flex gap-2 items-center" onClick={() => signOut()}>
      Logout
      <FontAwesomeIcon icon={faArrowRightFromBracket} />
    </button>
  );
}
