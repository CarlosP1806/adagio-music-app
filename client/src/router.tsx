import { createBrowserRouter } from "react-router-dom";
import { HomeRoute } from "./pages/HomePage";
import LoginForm from "./features/authentication/components/LoginForm";
import { RootLayout } from "./layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, ...HomeRoute },
      { path: "login", element: <LoginForm /> },
    ],
  },
]);
