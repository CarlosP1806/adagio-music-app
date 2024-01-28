import { Outlet } from "react-router-dom";
import { AuthProvider } from "../features/authentication/context/authentication.context";
import { Flex } from "@chakra-ui/react";

export function RootLayout() {
  return (
    <AuthProvider>
      <Flex
        backgroundColor={"#8B6CEB"}
        minHeight={"100vh"}
        direction={"column"}
      >
        <Outlet />
      </Flex>
    </AuthProvider>
  );
}
