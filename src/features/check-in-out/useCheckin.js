import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin() {
  const queryClitent = useQueryClient();
  const navigate = useNavigate();
  const { isLoading: isCheckingIn, mutate: checkin } = useMutation({
    mutationFn: ({ bookingId, breakfast }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...breakfast,
      }),

    onSuccess: (data) => {
      //Can also invalidate the queries that are active at this moment instead of passing the query key
      queryClitent.invalidateQueries({ active: true });
      toast.success(`Booking #${data.id} successfully checked in.`);
      navigate("/");
    },

    onError: () => toast.error("There was an error while checking in."),
  });

  return { isCheckingIn, checkin };
}
