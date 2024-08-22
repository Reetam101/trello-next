"use client";

import { useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import { FormEvent } from "react";
import uniqid from "uniqid";

function NewColumnForm() {
  const addColumn = useMutation(({ storage }, columnName) => {
    const columns = storage.get("columns");
    columns.push(
      new LiveObject({
        name: columnName,
        id: uniqid.time(),
        index: 9999,
      })
    );
  }, []);

  function handleAddNewColumn(e: FormEvent) {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");
    if (input) {
      const columnName = input?.value;
      addColumn(columnName);
      input.value = "";
    }
  }

  return (
    <form onSubmit={handleAddNewColumn} className="max-w-xs">
      <label className="block">
        <span className="text-gray-300 block">Column name:</span>
        <input
          type="text"
          placeholder="new column name"
          className="text-gray-950"
        />
      </label>
      <button type="submit" className="mt-2 block w-full">
        Create column
      </button>
    </form>
  );
}

export default NewColumnForm;
