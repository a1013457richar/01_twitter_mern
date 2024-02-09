"use client";
import { useMutation } from "@/app/liveblocks.config";
import { LiveObject } from "@liveblocks/client";
import React from "react";
import uniqid from "uniqid";

const NewColumn = () => {
  const addColumn = useMutation(({ storage }, columnName) => {
    storage.get("columns").push(
      new LiveObject({
        name: columnName,
        id: uniqid.time(),
        index: 9999,

      })
    );
  }, []);
  const handlenewColumn = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const input = (e.target as HTMLFormElement).querySelector("input");
    if (input) {
      const columnname = input?.value;
      addColumn(columnname);
      input.value = "";
    }
  };
  return (
    <form className="max-w-sm" onSubmit={handlenewColumn}>
      <label className="block">
        <span className="text-gray-700 block">New Column:</span>
        <input type="text" placeholder="new column name" />
      </label>
      <button type="submit" className="mt-2 block">
        Add Column
      </button>
    </form>
  );
};

export default NewColumn;
