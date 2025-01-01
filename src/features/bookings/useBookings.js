import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../utils/constants";

export function useBookings() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //FILTER
  const filterValue = searchParams.get("status");
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };

  //SORT
  const sortByRow = searchParams.get("sortBy") || "startDate-desc";
  const [field, direction] = sortByRow.split("-");
  const sortBy = { field, direction };

  //PAGINATION
  const curPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const {
    isLoading,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    //Now the useQuery will trigger a refetch of data also if the filter changes, like the dependency array of useEffect
    queryKey: ["bookings", filter, sortBy, curPage],
    queryFn: () => getBookings({ filter, sortBy, curPage }),
  });

  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (curPage < pageCount)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, curPage + 1],
      queryFn: () => getBookings({ filter, sortBy, curPage: curPage + 1 }),
    });

  if (curPage > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, curPage - 1],
      queryFn: () => getBookings({ filter, sortBy, curPage: curPage - 1 }),
    });

  return { isLoading, bookings, count, error };
}
