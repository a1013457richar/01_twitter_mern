"use client";

import { addEmailToBaord } from "@/app/actions/boardActions";
import { useRouter } from "next/navigation";
import { useRef } from "react";

const NewBoardAccess = ({ boardId }: { boardId: string }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  async function addEmail(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email")?.toString() || "";
    if (!email) {
      alert("Please enter a valid email");
      return;
    }
    await addEmailToBaord(boardId, email);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
    router.refresh();
  }

  return (
    <form onSubmit={addEmail} className="max-w-xs">
      <h2 className="text-xl">Add new user</h2>
      <input
        ref={inputRef}
        name="email"
        type="text"
        placeholder="john@gmail.com"
      />
      <button className="w-full mt-2" type="submit">
        Add
      </button>
    </form>
  );
};

export default NewBoardAccess;
