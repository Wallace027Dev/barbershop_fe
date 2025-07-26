import type React from "react";
import type { LoginFormData } from "../../schemas/UserSchema";
import { toast } from "react-toastify";
import api from "../../api/axios";
import axios from "axios";

export async function handleFormSubmit(
  data: LoginFormData,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setToken: (token: string) => void
) {
  setIsLoading(true);
  try {
    const response = await api.post("/auth/signin", data);
    const successMessage =
      response.data.message || "Usuário conectado com sucesso!";

    setToken(response.data.token);

    toast.success(successMessage, {
      toastId: "signin-success",
      className: "my-custom-success-toast",
    });

    return "success";
  } catch (err: unknown) {
    let errorMessage = "Erro ao tentar conectar!";

    if (axios.isAxiosError(err)) {
      errorMessage = err.response?.data?.message ?? errorMessage;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    toast.error(errorMessage, {
      toastId: "signin-error",
      className: "my-custom-error-toast",
    });

    console.error("Erro na requisição:", err);
  } finally {
    setIsLoading(false);
  }
}
