import { useNavigate } from "react-router-dom";
import { H1 } from "../components/Heading1";
import { Anchor } from "../components/Link";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main>
      <H1>Home</H1>
      <Anchor onClick={() => navigate("/signin")}>Login</Anchor>
    </main>
  );
}
