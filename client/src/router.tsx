import { createBrowserRouter } from "react-router-dom";
import { HomeRoute } from "./pages/HomePage";
import LoginForm from "./features/authentication/components/LoginForm";

export const router = createBrowserRouter([
  { path: "/", ...HomeRoute },
  { path: "/login", element: <LoginForm /> },
]);
