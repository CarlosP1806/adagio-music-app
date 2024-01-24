import { useContext } from "react";
import { Context } from "../context/authentication.context";

export function useAuth() {
  const auth = useContext(Context);
  if (auth == null) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return auth;
}
