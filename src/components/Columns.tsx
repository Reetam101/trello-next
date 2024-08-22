import { useMutation, useStorage } from "@/app/liveblocks.config";
import Column from "./Column";
import NewColumnForm from "./forms/NewColumnForm";
import { ReactSortable } from "react-sortablejs";
import { LiveList, LiveObject, shallow } from "@liveblocks/client";

type ColumnType = {
  id: string;
  name: string;
  index: number;
};

function Columns() {
  const columns = useStorage(
    (root) => root.columns.map((c) => ({ ...c })),
    shallow
  );

  const updateColumns = useMutation(
    ({ storage }, columns: LiveObject<ColumnType>[]) => {
      storage.set("columns", new LiveList(columns));
    },
    []
  );

  function setColumnsOrder(sortedColumns: ColumnType[]) {
    const newColumns: LiveObject<ColumnType>[] = [];
    sortedColumns.forEach((sortedColumn: ColumnType, newIndex: number) => {
      const newSortedColumn = { ...sortedColumn };
      newSortedColumn.index = newIndex;
      newColumns.push(new LiveObject(newSortedColumn));
    });
    updateColumns(newColumns);
  }

  if (!columns) return;
  return (
    <div className="flex gap-4">
      <ReactSortable
        group={"board-column"}
        list={columns}
        setList={setColumnsOrder}
        className="flex gap-4"
        ghostClass="opacity-40"
      >
        {columns.map((column) => (
          <Column
            key={column.id}
            {...column}
            id={column.id}
            // setCards={setCards}
          />
        ))}
      </ReactSortable>
      <NewColumnForm />
    </div>
  );
}

export default Columns;
