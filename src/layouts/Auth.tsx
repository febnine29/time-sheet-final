import React, { useState } from "react";
import { Box, Spinner } from "@chakra-ui/react";
import Login from "../components/Auth/Login";
import { useAppSelector } from "../app/hooks";
import { authSelector } from "../features/AuthSlice";
import { useNavigate, useLocation } from "react-router";
export interface AuthProps {}
type typeAuth = "LOGIN" | "REGISTER";
export default function Auth(props: AuthProps) {
  const [typeAuth, setTypeAuth] = useState<typeAuth>("LOGIN");
  const navigate = useNavigate();
  const location = useLocation();

  const { isAuthenticate, authLoading } = useAppSelector(authSelector);

  let locationPath = location.state || "/home";
  // if (authLoading) return <Spinner />;
  if (isAuthenticate) {
    navigate(locationPath);
  }
  return (
    <>
      <Box maxW="500px" m="0 auto">
        {typeAuth === "LOGIN" && <Login setTypeAuth={setTypeAuth} />}
      </Box>
    </>
  );
}
