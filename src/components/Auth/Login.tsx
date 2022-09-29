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
  VStack, InputGroup, InputRightElement
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { authSelector, login } from "../../features/AuthSlice";
import { DataFormLogin } from "../../type/Auth";
import "../../css/LoginStyle.css";
import nccLogo from "../../images/nccsoft_vietnam_logo.png"
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
  const [show, setShow] = React.useState(false)
  const handleClick = () => setShow(!show)
  return (
    <Box mt={10} width="400px" className="login" >
      <Box className="logo">
        <a><img src={nccLogo}></img></a>
      </Box>
      <Heading textAlign="center" mb={5}>Time Sheet</Heading>
      <form
        onSubmit={(e) => {
          handleSubmitForm(e);
        }}
      >
        <FormControl id="email" mb={5}>
          <Input
            type="text"
            name="userNameOrEmailAddress"
            placeholder='Username or Email'
            value={dataLogin.userNameOrEmailAddress}
            onChange={handleFormLogin}
          />
        </FormControl>
        <FormControl id="password">
          <InputGroup size='md'>
            <Input
              name="password"
              placeholder='Password'
              value={dataLogin.password}
              pr='4.5rem'
              type={show ? 'text' : 'password'}
              onChange={(e) => handleFormLogin(e)}
            />
            <InputRightElement width='4.5rem' mt={2}>
              <Button h='1.75rem' size='sm' onClick={handleClick}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
        </InputGroup>
        </FormControl>
        <Box mt={2}>
          <Checkbox
            size="md"
            colorScheme="red"
            isChecked={dataLogin.rememberClient}
            onChange={handleFormLoginCheckbox}
          >
            Remember Me
          </Checkbox>
        </Box>
        <VStack>
          <button className="submitBtn" type='submit'> Login </button><br /> 
        </VStack>
      </form>
    </Box>
  );
}
