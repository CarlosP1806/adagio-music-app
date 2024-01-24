import { baseApi } from "../../../services/baseApi";
import { UserSignupInputs } from "../constants/types";

export function signup(user: UserSignupInputs) {
  return baseApi.post("/user/sigunp", user).then((res) => res.data);
}

export function login(username: string, password: string) {
  return baseApi
    .post("/user/login", { username, password })
    .then((res) => res.data);
}

export function getLoggedInUser() {
  return baseApi.get("/user").then((res) => res.data ?? undefined);
}
