import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import styled from "styled-components";
import type { IAppointment } from "../../interfaces/IAppointment";
import api from "../../api/axios";
import { toast } from "react-toastify";
import axios from "axios";

const Container = styled.div`
  padding: 32px;
  max-width: 800px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 24px;
  color: #1e707b;
`;

const AppointmentList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const AppointmentCard = styled.li`
  background-color: white;
  border-radius: 8px;
  padding: 16px 24px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
`;

const Details = styled.p`
  margin: 4px 0;
  color: #555;
`;

export default function Dashboard() {
  const { userId } = useParams<{ userId: string }>();
  const [appointments, setAppointments] = useState<IAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [unauthorized, setUnauthorized] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndAppointments = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const decoded = jwtDecode<{ user: string }>(token);
        const tokenUserId = decoded.user;

        if (tokenUserId !== userId) {
          setUnauthorized(true);
          return;
        }

        await api.get(`/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const { data } = await api.get(`/appointments/user/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("Dados recebidos de agendamentos:", data);
        setAppointments(data);
      } catch (err) {
        console.error("Erro ao carregar dados", err);
        let msg;;

        if (axios.isAxiosError(err)) {
          msg = err.response?.data?.message ?? msg;
        } else if (err instanceof Error) {
          msg = err.message;
        }

        toast.error(msg, {
          toastId: "auth-error",
          className: "my-custom-error-toast",
        });
        setUnauthorized(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndAppointments();
  }, [userId, navigate]);

  if (loading) return <Container>Carregando...</Container>;
  if (unauthorized)
    return (
      <Container>Você não tem permissão para acessar esta página.</Container>
    );

  return (
    <Container>
      <Title>Próximos Agendamentos</Title>
      {appointments.length === 0 ? (
        <p>Nenhum agendamento encontrado.</p>
      ) : (
        <AppointmentList>
          {appointments.map((a: IAppointment) => (
            <AppointmentCard key={a.id}>
              <strong>{a.specialtyId}</strong>
              <Details>📅 Dia: {String(a.date)}</Details>
              <Details>⏰ Time</Details>
              <Details>💇 {a.barberId}</Details>
            </AppointmentCard>
          ))}
        </AppointmentList>
      )}
    </Container>
  );
}
