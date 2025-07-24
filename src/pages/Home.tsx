import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <h1>Home</h1>
      <a onClick={() => navigate("/signin")}>Login</a>
    </main>
  );
}
