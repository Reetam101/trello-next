"use client";

import { FormEvent } from "react";

function NewColumnForm() {
  function handleAddNewColumn(e: FormEvent) {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");
    const columnName = input?.value;
    alert(columnName);
  }

  return (
    <form onSubmit={handleAddNewColumn} className="max-w-xs">
      <label className="block">
        <span className="text-gray-600 block">Column name:</span>
        <input type="text" placeholder="new column name" />
      </label>
      <button type="submit" className="mt-2 block w-full">
        Create column
      </button>
    </form>
  );
}

export default NewColumnForm;
