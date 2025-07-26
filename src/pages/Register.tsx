import api from "../api/axios";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseUserSchema, type RegisterFormData } from "../schemas/UserSchema";
import { useAuthStore } from "../auth/useAuthStore";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/click-beard-logo.png";

const Main = styled.main`
  max-width: 25rem;
  margin: 1.5rem auto;

  img {
    margin-bottom: 2rem;
    min-width: 18.75rem;
    width: 100%;
  }
`;

const Form = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Button = styled.button`
  height: 3.75rem;
  width: 100%;
  min-width: 18.75rem;
  border: none;
  border-radius: 0.75rem;
  background: #621b0c;
  color: #fff;
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 1.5rem;
  transition: background 0.3s ease, color 0.3s ease;
  border: 2px solid #621b0c;
  box-shadow: 4px 6px 8px 0 rgba(122, 47, 25, 0.3);
  cursor: pointer;

  &:hover {
    background: transparent;
    color: #621b0c;
  }
`;

const Input = styled.input`
  height: 3rem;
  width: 100%;
  min-width: 18.75rem;
  color: rgba(23, 26, 31, 70);
  background: #d0ced1;
  font-size: 1rem;
  border: 1px solid rgba(66, 89, 42, 0.5);
  border-radius: 0.75rem;
  padding: 1.25rem 1rem;
  box-shadow: 4px 6px 8px 0 rgba(122, 47, 25, 0.3);

  &:focus {
    outline: none;
    border: 2px solid #42592a;
  }

  & + & {
    margin-top: 0.5rem;
  }
`;

export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterFormData>({
    resolver: zodResolver(BaseUserSchema)
  });
  const setToken = useAuthStore((s) => s.setToken);
  const navigate = useNavigate();

  async function onSubmit(data: RegisterFormData) {
    try {
      const response = await api.post("/auth/signup", data);
      setToken(response.data.token);
      navigate("/dashboard");
    } catch (err: unknown) {
      alert("Credenciais inválidas");
      console.error(err);
    }
  }

  return (
    <Main>
      <img src={logo} alt="Logo da ClickBeard" />
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input {...register("name")} placeholder="Nome" />
        {errors.name && <p>{errors.name.message}</p>}

        <Input {...register("email")} placeholder="Email" />
        {errors.email && <p>{errors.email.message}</p>}

        <Input type="password" {...register("password")} placeholder="Senha" />
        {errors.password && <p>{errors.password.message}</p>}

        <Button type="submit">Cadastrar</Button>
      </Form>
    </Main>
  );
}
