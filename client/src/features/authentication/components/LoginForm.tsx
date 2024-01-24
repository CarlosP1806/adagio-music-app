import { useRef } from "react";
import { useAuth } from "../hooks/useAuth";

function LoginForm() {
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  const { login } = useAuth();

  async function onSubmit() {
    const username = usernameRef.current?.value || "";
    const password = passwordRef.current?.value || "";

    console.log(username, password);

    await login(username, password);
  }

  return (
    <>
      <h1>Login Form</h1>
      <input type="text" placeholder="Username" ref={usernameRef} />
      <input type="password" placeholder="Password" ref={passwordRef} />
      <button onClick={onSubmit}>Login</button>
    </>
  );
}

export default LoginForm;
