import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import logo from "../../assets/images/click-beard-logo.png";
import { useAuthStore } from "../../auth/useAuthStore";
import { handleAuthSubmit } from "../../helpers/handleAuthSubmit";
import {
  BaseUserSchema,
  type RegisterFormData,
} from "../../schemas/UserSchema";

import { Anchor } from "../../components/Link";
import { Spinner } from "../../components/Spinner";
import { Input } from "../../components/Input";
import { Button } from "../../components/SubmitButton";
import { Form } from "../../components/ui/Form";
import { Main } from "./style";

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

  async function onSubmit(registerData: RegisterFormData) {
    await handleAuthSubmit({
      url: "/auth/signup",
      data: registerData,
      navigate,
      setIsLoading,
      setToken,
      successMessage: "Usuário criado com sucesso!",
      errorMessage: "Erro ao criar usuário!",
      toastIdSuccess: "signup-success",
      toastIdError: "signup-error",
    });
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
