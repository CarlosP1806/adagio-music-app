import { ReactNode } from "react";
import Navbar from "../components/Navbar";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
}

function AuthLayout({ title, children }: AuthLayoutProps) {
  return (
    <>
      <Navbar title={title} showBadge={false} />
      {children}
    </>
  );
}

export default AuthLayout;
