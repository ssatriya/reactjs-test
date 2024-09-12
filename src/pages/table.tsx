import { useState } from "react";

import { PAGE_SIZE } from "@/lib/constants";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { usePaginatedData } from "@/hooks/usePaginatedData";

export default function Table() {
  const [page, setPage] = useState(1);

  const { data, isLoading, error } = usePaginatedData(page, PAGE_SIZE);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  if (!data || !data.paginatedData) {
    return <div>Failed to load data</div>;
  }

  return (
    <div className="container py-10 mx-auto">
      <DataTable
        columns={columns}
        data={data.paginatedData}
        page={page}
        setPage={setPage}
        totalPages={data.totalPages}
      />
    </div>
  );
}
