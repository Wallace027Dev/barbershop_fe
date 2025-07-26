import type React from "react";
import axios from "axios";
import api from "../api/axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface SubmitOptions<T> {
  url: string;
  data: T;
  navigate: (url: string) => void;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setToken: (token: string) => void;
  successMessage?: string;
  errorMessage?: string;
  toastIdSuccess?: string;
  toastIdError?: string;
}

export async function handleAuthSubmit<T>({
  url,
  data,
  navigate,
  setIsLoading,
  setToken,
  successMessage = "Operação realizada com sucesso!",
  errorMessage = "Erro na operação!",
  toastIdSuccess = "auth-success",
  toastIdError = "auth-error",
}: SubmitOptions<T>): Promise<"success" | void> {
  setIsLoading(true);

  try {
    const response = await api.post(`/auth${url}`, data);
    const message = response.data.message || successMessage;

    const token = response.data.token;
    setToken(token);
    console.log(jwtDecode(token));

    const decoded = jwtDecode<{ user: string }>(token);
    const userId = decoded.user;

    toast.success(message, {
      toastId: toastIdSuccess,
      className: "my-custom-success-toast",
    });

    navigate(`/dashboard/${userId}`);
  } catch (err: unknown) {
    let msg = errorMessage;

    if (axios.isAxiosError(err)) {
      msg = err.response?.data?.message ?? msg;
    } else if (err instanceof Error) {
      msg = err.message;
    }

    toast.error(msg, {
      toastId: toastIdError,
      className: "my-custom-error-toast",
    });

    console.error("Erro na requisição:", err);
  } finally {
    setIsLoading(false);
  }
}
