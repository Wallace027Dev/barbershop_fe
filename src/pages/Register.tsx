import api from "../api/axios";
import styled from "styled-components";
import logo from "../assets/images/click-beard-logo.png";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseUserSchema, type RegisterFormData } from "../schemas/UserSchema";
import { useAuthStore } from "../auth/useAuthStore";
import { useNavigate } from "react-router-dom";
import { Anchor } from "../components/Link";
import { useState } from "react";
import { toast } from "react-toastify";
import { Spinner } from "../components/Spinner";
import axios from "axios";

interface StyledInputProps {
  $hasError?: boolean;
}

const Main = styled.main`
  max-width: 25rem;
  margin: 1.5rem auto;

  img {
    min-width: 17.5rem;
    width: 100%;
  }
`;

const Form = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: end;

  span {
    color: #42592a;
    margin-top: 0.5rem;
  }
`;

const Button = styled.button`
  height: 3.75rem;
  width: 100%;
  min-width: 17.5rem;
  border: none;
  border-radius: 0.75rem;
  background: #621b0c;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1.5rem;
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.5s ease;
  border: 2px solid #621b0c;
  box-shadow: 4px 6px 8px 0 rgba(122, 47, 25, 0.3);
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &:disabled {
    background: #534e4e;
  }

  @media (min-width: 768px) {
    &:hover {
      background: transparent;
      box-shadow: 6px 10px 4px 0 rgba(122, 47, 25, 0.7);
      color: #621b0c;
    }
  }
`;

const Input = styled.input<StyledInputProps>`
  height: 3rem;
  width: 100%;
  min-width: 17.5rem;
  color: rgba(23, 26, 31, 70);
  background: #d0ced1;
  font-size: 1rem;
  border-radius: 0.75rem;
  padding: 1.25rem 1rem;
  box-shadow: 4px 6px 8px 0 rgba(122, 47, 25, 0.3);
  transition: box-shadow 0.3s ease;
  border: 1px solid
    ${({ $hasError }) => ($hasError ? "#A60B0B" : "rgba(66, 89, 42, 0.5)")};

  &:focus {
    outline: none;
    border: 2px solid ${({ $hasError }) => ($hasError ? "#A60B0B" : "#42592a")};
  }

  &:hover {
    border-width: 2px;
    box-shadow: 6px 8px 6px 0 rgba(122, 47, 25, 0.3);
  }

  & + & {
    margin-top: 0.5rem;
  }
`;

const ErrorMessage = styled.p`
  color: #a60b0b;
  font-size: 0.875rem;
  margin: 0.25rem 0 0.25rem;
`;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(BaseUserSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  async function onSubmit(data: RegisterFormData) {
    setIsLoading(true);

    try {
      const response = await api.post("/auth/signup", data);
      const successMessage =
        response.data.message || "Usuário criado com sucesso!";
      setToken(response.data.token);

      toast.success(successMessage, {
        className: "my-custom-success-toast",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (err: unknown) {
      let errorMessage = "Erro ao criar usuário!";

      if (axios.isAxiosError(err) && err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      toast.error(errorMessage, {
        className: "my-custom-error-toast",
      });

      console.error("Erro na requisição:", err);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Main>
      <img src={logo} alt="Logo da ClickBeard" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          {...register("name")}
          $hasError={!!errors.name}
          placeholder="Nome"
        />
        {errors.name && <ErrorMessage>{errors.name.message}</ErrorMessage>}

        <Input
          {...register("email")}
          $hasError={!!errors.email}
          placeholder="Email"
        />
        {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}

        <Input
          type="password"
          {...register("password")}
          $hasError={!!errors.password}
          placeholder="Senha"
        />
        {errors.password && (
          <ErrorMessage>{errors.password.message}</ErrorMessage>
        )}

        <span>
          Já possui uma conta?{" "}
          <Anchor onClick={() => navigate("/signin")}>Clique aqui!</Anchor>
        </span>
        <Button disabled={isLoading} type="submit">
          {isLoading ? <Spinner /> : "Cadastrar"}
        </Button>
      </Form>
    </Main>
  );
}
