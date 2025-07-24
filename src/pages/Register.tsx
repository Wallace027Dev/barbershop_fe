import api from "../api/axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginFormData } from "../schemas/UserSchema";
import { useAuthStore } from "../auth/useAuthStore";
import { useNavigate } from "react-router-dom";

const Main = styled.main`
  max-width: 25rem;
  margin: 2rem auto;
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Input = styled.input`
  width: 100%;
  min-width: 18.75rem;
  min-height: 3.5rem;
  color: rgba(23, 26, 31, 70);
  background: #d0ced1;
  font-size: 1rem;
  border: none;
  border-radius: 0.75rem;
  padding: 1.25rem 1rem;
  box-shadow: 0 0.25rem 0.25rem rgba(0, 0, 0, 0.25);

  &:focus {
    outline: none;
  }

  & + & {
    margin-top: 1rem;
  }
`;

export default function Register() {
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
    <Main>
      <img src="#" alt="Logo quadrada da empresa" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}

        <Input type="password" {...register("password")} placeholder="Senha" />
        {errors.password && <p>{errors.password.message}</p>}

        <button type="submit">Entrar</button>
      </Form>
    </Main>
  );
}
