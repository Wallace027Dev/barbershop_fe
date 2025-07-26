import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

import logo from "../../assets/images/click-beard-logo.png";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  BaseUserSchema,
  type RegisterFormData,
} from "../../schemas/UserSchema";
import { useAuthStore } from "../../auth/useAuthStore";
import { handleFormSubmit } from "./submitHandler";

import { Anchor } from "../../components/Link";
import { Spinner } from "../../components/Spinner";
import { Input } from "../../components/Input";
import { Button } from "../../components/SubmitButton";
import { Form } from "../../components/ui/Form";

const Main = styled.main`
  max-width: 25rem;
  margin: 1.5rem auto;

  img {
    min-width: 17.5rem;
    width: 100%;
  }
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
    const result = await handleFormSubmit(data, setIsLoading, setToken);
    if (result === "success") {
      setTimeout(() => navigate("/dashboard"), 1000);
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
          errorMessage={errors.name?.message}
        />

        <Input
          {...register("email")}
          $hasError={!!errors.email}
          placeholder="Email"
          errorMessage={errors.email?.message}
        />

        <Input
          type="password"
          {...register("password")}
          $hasError={!!errors.password}
          placeholder="Senha"
          errorMessage={errors.password?.message}
        />

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
