import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClitent = useQueryClient();
  const { isLoading: isCheckingOut, mutate: checkout } = useMutation({
    mutationFn: (bookingId) =>
      updateBooking(bookingId, { status: "checked-out" }),

    onSuccess: (data) => {
      //Can also invalidate the queries that are active at this moment instead of passing the query key
      queryClitent.invalidateQueries({ active: true });
      toast.success(`Booking #${data.id} successfully checked out.`);
    },

    onError: () => toast.error("There was an error while checking out."),
  });

  return { isCheckingOut, checkout };
}
