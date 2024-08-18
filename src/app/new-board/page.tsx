"use client";

import { redirect } from "next/navigation";
import { createBoard } from "../actions/boardActions";

export default function NewBoardPage() {
  const handleNewBoardSubmit = async (formData: FormData) => {
    const boardName = formData.get("name")?.toString() || "";
    const { id } = await createBoard(boardName);
    redirect(`/boards/${id}`);
  };
  return (
    <div>
      <form action={handleNewBoardSubmit} className="max-w-xs block">
        <h1 className="text-2xl mb-4">Create new board</h1>
        <input name="name" type="text" placeholder="board name" />
        <button type="submit" className="mt-2 w-full">
          Create Board
        </button>
      </form>
    </div>
  );
}
