import { createBrowserRouter } from "react-router-dom";
import { HomeRoute } from "./pages/Home.page";
import { NewSessionRoute } from "./pages/NewSession.page";
import LoginForm from "./features/authentication/components/LoginForm";
import { RootLayout } from "./layouts/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, ...HomeRoute },
      { path: "new-session", ...NewSessionRoute },
      { path: "login", element: <LoginForm /> },
    ],
  },
]);
