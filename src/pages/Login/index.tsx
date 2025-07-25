import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import logo from "../../assets/images/click-beard-logo.png";
import { LoginSchema, type LoginFormData } from "../../schemas/UserSchema";
import { useAuthStore } from "../../auth/useAuthStore";
import { handleAuthSubmit } from "../../helpers/handleAuthSubmit";

import { Spinner } from "../../components/ui/Spinner";
import { Input } from "../../components/ui/Input";
import { Button } from "../../components/ui/Button";
import { Form } from "../../components/ui/Form";
import { Main } from "../Register/style";
import { NotAccountContainer } from "./style";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(LoginSchema),
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  async function onSubmit(loginData: LoginFormData) {
    await handleAuthSubmit({
      url: "/signin",
      data: loginData,
      navigate,
      setIsLoading,
      setToken,
      successMessage: "Usuário conectado com sucesso!",
      errorMessage: "Erro ao tentar conectar!",
      toastIdSuccess: "signin-success",
      toastIdError: "signin-error",
    });
  }

  return (
    <Main>
      <img src={logo} alt="Logo da ClickBeard" />
      <Form onSubmit={handleSubmit(onSubmit)}>
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

        <Button disabled={isLoading} type="submit">
          {isLoading ? <Spinner /> : "Conectar"}
        </Button>
      </Form>

      <hr />

      <NotAccountContainer>
        <span>Não possui uma conta?</span>
        <Button onClick={() => navigate("/signup")} $variant="unfilled" disabled={isLoading} type="button">
          Criar conta
        </Button>
      </NotAccountContainer>
    </Main>
  );
}
