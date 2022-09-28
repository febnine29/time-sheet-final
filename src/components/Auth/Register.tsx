import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import * as React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { authSelector, register } from "../../features/AuthSlice";
import { DataFormRegister } from "../../type/Auth";

type typeAuth = "LOGIN" | "REGISTER";
export interface RegisterProps {
  setTypeAuth: (params: typeAuth) => void;
}
export default function Register({ setTypeAuth }: RegisterProps) {
  //Redux
  const dispatch = useDispatch();
  const { authLoading, isAuthenticate } = useAppSelector(authSelector);

  //Route
  const navigate = useNavigate();
  //
  const [dataRegister, setDataRegister] = useState<DataFormRegister>({
    name: "",
    surname: "",
    userName: "",
    emailAddress: "",
    password: "",
  });

  //handle
  const handleFormLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDataRegister({ ...dataRegister, [e.target.name]: e.target.value });
  };

  const handleSubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(register(dataRegister));
  };
  //Check is authenticate ? if true => push home
  console.log(dataRegister);
  return (
    <Box mt={10} width="500px">
      <Heading textAlign="center">Register</Heading>
      <form onSubmit={(e) => handleSubmitForm(e)}>
        <FormControl id="name">
          <FormLabel>Name</FormLabel>
          <Input
            type="text"
            name="name"
            onChange={(e) => handleFormLogin(e)}
            value={dataRegister.name}
          />
        </FormControl>
        <FormControl id="surname">
          <FormLabel>Surname</FormLabel>
          <Input
            type="text"
            name="surname"
            onChange={(e) => handleFormLogin(e)}
            value={dataRegister.surname}
          />
        </FormControl>

        <FormControl id="username">
          <FormLabel>Username</FormLabel>
          <Input
            type="text"
            name="userName"
            onChange={(e) => handleFormLogin(e)}
            value={dataRegister.userName}
          />
        </FormControl>
        <FormControl id="emailAddress">
          <FormLabel>Email</FormLabel>
          <Input
            type="email"
            name="emailAddress"
            onChange={(e) => handleFormLogin(e)}
            value={dataRegister.emailAddress}
          />
        </FormControl>

        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            name="password"
            onChange={(e) => handleFormLogin(e)}
            value={dataRegister.password}
          />
        </FormControl>

        <VStack mt={2}>
          <Button colorScheme="blue" mt={2} type="submit">
            Register
          </Button>
          <Text color="gray.500"> Have an account ?</Text>
          <Button variant="link" onClick={() => setTypeAuth("LOGIN")}>
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  );
}
