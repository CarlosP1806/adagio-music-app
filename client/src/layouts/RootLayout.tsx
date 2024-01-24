import { Outlet } from "react-router-dom";
import { AuthProvider } from "../features/authentication/context/authentication.context";

export function RootLayout() {
  return (
    <AuthProvider>
      <Outlet />
    </AuthProvider>
  );
}
