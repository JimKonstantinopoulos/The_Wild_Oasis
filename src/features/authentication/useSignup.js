import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { isLoading, mutate: signup } = useMutation({
    mutationKey: ["signup"],
    mutationFn: signupApi,

    onSuccess: () => {
      toast.success(
        "Account successfully created. Please verify the user via email."
      );
    },
  });

  return { isLoading, signup };
}
