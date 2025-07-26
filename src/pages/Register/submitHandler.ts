import type React from "react";
import type { RegisterFormData } from "../../schemas/UserSchema";
import { toast } from "react-toastify";
import api from "../../api/axios";
import axios from "axios";

export async function handleFormSubmit(
  data: RegisterFormData,
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
  setToken: (token: string) => void
) {
  setIsLoading(true);
  try {
    const response = await api.post("/auth/signup", data);
    const successMessage =
      response.data.message || "Usuário criado com sucesso!";

    setToken(response.data.token);

    toast.success(successMessage, {
      toastId: "signup-success",
      className: "my-custom-success-toast",
    });

    return "success";
  } catch (err: unknown) {
    let errorMessage = "Erro ao criar usuário!";

    if (axios.isAxiosError(err)) {
      errorMessage = err.response?.data?.message ?? errorMessage;
    } else if (err instanceof Error) {
      errorMessage = err.message;
    }

    toast.error(errorMessage, {
      toastId: "signup-error",
      className: "my-custom-error-toast",
    });

    console.error("Erro na requisição:", err);
  } finally {
    setIsLoading(false);
  }
}
