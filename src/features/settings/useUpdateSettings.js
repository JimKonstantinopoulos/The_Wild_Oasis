import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSettings } from "../../services/apiSettings";
import toast from "react-hot-toast";

export function useUpdateSettings() {
  const queryClient = useQueryClient();

  const { isLoading: isUpdating, mutate: mutateUpdateSettings } = useMutation({
    mutationFn: updateSettings,
    onSuccess: () => {
      queryClient.invalidateQueries(
        {
          queryKey: ["settings"],
        },
        toast.success("Successfully updated settings")
      );
    },
    onError: (error) => toast.error(error.message),
  });
  return { isUpdating, mutateUpdateSettings };
}
