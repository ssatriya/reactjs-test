import { fetchPaginatedData } from "@/lib/utils";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

export const usePaginatedData = (page: number, pageSize: number) => {
  return useQuery({
    queryKey: ["paginatedData", page],
    queryFn: () => fetchPaginatedData(page, pageSize),
    placeholderData: keepPreviousData,
  });
};
