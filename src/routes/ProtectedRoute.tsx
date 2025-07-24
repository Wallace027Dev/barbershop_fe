import type { JSX } from "react";

import { Navigate } from "react-router-dom";
import { useAuthStore } from "../auth/useAuthStore";

export function ProtectedRoute({ children }: { children: JSX.Element }) {
  const { token } = useAuthStore();
  return token ? children : <Navigate to="/login" />;
}
