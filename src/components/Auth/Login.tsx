import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { authSelector, login } from "../../features/AuthSlice";
import { DataFormLogin } from "../../type/Auth";
type typeAuth = "LOGIN" | "REGISTER";
export interface LoginProps {
  setTypeAuth: (params: typeAuth) => void;
}

export default function Login({ setTypeAuth }: LoginProps) {
  //Redux
  const dispatch = useDispatch();
  const { authLoading, isAuthenticate } = useAppSelector(authSelector);

  //Route
  const navigate = useNavigate();
  //
  const [dataLogin, setDataLogin] = useState<DataFormLogin>({
    userNameOrEmailAddress: "",
    password: "",
    rememberClient: false,
  });

  //handle
  const handleFormLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataLogin({ ...dataLogin, [e.target.name]: e.target.value });
  };
  const handleFormLoginCheckbox = () => {
    setDataLogin({ ...dataLogin, rememberClient: !dataLogin.rememberClient });
  };
  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(dataLogin));
  };
  //Check is authenticate ? if true => push home

  return (
    <Box mt={10} width="500px">
      <Heading textAlign="center">Login</Heading>
      <form
        onSubmit={(e) => {
          handleSubmitForm(e);
        }}
      >
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            type="text"
            name="userNameOrEmailAddress"
            value={dataLogin.userNameOrEmailAddress}
            onChange={handleFormLogin}
          />
          <FormHelperText>We'll never share your email.</FormHelperText>
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            value={dataLogin.password}
            onChange={(e) => handleFormLogin(e)}
          />
        </FormControl>
        <Box mt={2}>
          <Checkbox
            size="md"
            colorScheme="red"
            isChecked={dataLogin.rememberClient}
            onChange={handleFormLoginCheckbox}
          >
            Remember
          </Checkbox>
        </Box>
        <VStack>
          <Button colorScheme="blue" type="submit" isLoading={authLoading}>
            Login
          </Button>
          <Text color="gray.500">Do not have an account ?</Text>
          <Button variant="link" onClick={() => setTypeAuth("REGISTER")}>
            Register
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
