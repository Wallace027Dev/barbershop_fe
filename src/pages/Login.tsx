import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/UserSchema";
import api from "../api/axios";
import { useAuthStore } from "../auth/useAuthStore";
import { useNavigate } from "react-router-dom";

export function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema)
  });
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  async function onSubmit(data: LoginFormData) {
    try {
      const response = await api.post("/auth/login", data);
      setToken(response.data.token);
      navigate("/dashboard");
    } catch (err: unknown) {
      alert("Credenciais inválidas");
      console.error(err);
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-sm mx-auto mt-10 space-y-4"
    >
      <input {...register("email")} placeholder="Email" className="input" />
      {errors.email && <p className="text-red-500">{errors.email.message}</p>}

      <input
        type="password"
        {...register("password")}
        placeholder="Senha"
        className="input"
      />
      {errors.password && (
        <p className="text-red-500">{errors.password.message}</p>
      )}

      <button type="submit" className="btn btn-primary w-full">
        Entrar
      </button>
    </form>
  );
}
