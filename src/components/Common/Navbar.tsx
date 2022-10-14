import {
  Avatar,
  Box,
  Button,
  Divider,
  Flex,
  Icon,
  Text,
  Spinner,
  useDisclosure
} from "@chakra-ui/react";
import { Fade, ScaleFade, Slide, SlideFade } from '@chakra-ui/react'
import React from "react";
import { Archive, Code, Home, LogOut } from "react-feather";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import setToken from "../../configs/setToken";
import {
  authSelector,
  logout,
  removeTokenLocalStorage,
} from "../../features/AuthSlice";
import { projectSelector } from "../../features/ProjectSlice";
import {taskSelector} from "../../features/TaskSlice";
import { themeSelector } from "../../features/StoreId";
import nccLogo from '../../images/nccsoft_vietnam_logo.png'
import { Navigate } from "react-router-dom";
import {useSelector} from "react-redux"
export interface NavbarProps {}

export default function Navbar(props: NavbarProps) {
  const dispatch = useAppDispatch();
  const {projectLoading} = useSelector(projectSelector)
  const {taskLoading} = useSelector(taskSelector)
  const {themeColor} = useSelector(themeSelector)
  const { userInfo } = useAppSelector(authSelector);
  const {isOpen, onToggle} = useDisclosure();
  const handleLogout = () => {
      dispatch(logout());
      setToken(null);
      dispatch(removeTokenLocalStorage());
  }
  return (
    <Box height="100vh" width='356px' padding={5}>
      {/* About Me */}
      <Box pt={10} >
        <Flex justifyContent="start" alignItems='center'>
          <Avatar src={nccLogo} mr={5} bg='white' borderRadius='50%' boxShadow="-0px 0px 2px #b8b8b8, 0px 0px 0px 2px #ffffff, 5px 2px 8px #717171"/>
          <Box mb={3} pt={2}>
            <Text color="gray.600" fontWeight='bold'>{userInfo?.userName}</Text>
            <Text color="gray.600" fontStyle='italic'>{userInfo?.emailAddress}</Text>
          </Box>
        </Flex>
        <Flex justifyContent="center" mt='auto' bg='none'>
          <Button
            size="sm"
            colorScheme="red"
            ml='auto'
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Flex>
        <Divider mt={5} />
      </Box>
      {/* Route */}
      <Flex flexDirection="column" justifySelf="flex-start">
        <Link to="/home">
          <Flex
            padding={3}
            alignItems="center"
            _hover={{ bgColor: "gray.200" }}
            cursor="pointer"
          >
            Home
          </Flex>
          <Divider />
        </Link>
        <Link to="/tasks">
          <Flex
            padding={3}
            alignItems="center"
            _hover={{ bgColor: "gray.200"}}
            cursor="pointer"
          >
            Tasks Manager
            <Box ml="auto" height='24px'>
              {taskLoading && 
                  <Spinner thickness='4px'
                    speed='0.5s'
                    color={themeColor ? themeColor : 'blue.400'}
                    size='md'
                  />
              }
            </Box>
          </Flex>
          <Divider />
        </Link>

        <Link to="/projects">
          <Flex
            padding={3}
            alignItems="center"
            _hover={{ bgColor: "gray.100" }}
            cursor="pointer"
          >
            Projects Manager
            <Box ml="auto" height='24px'>
              {/* <ScaleFade initialScale={0.9} in={isOpen}> */}
                {projectLoading && 
                    <Spinner thickness='4px'
                      speed='0.5s'
                      color={themeColor ? themeColor : 'blue.400'}
                      size='md'
                    />
                }
              {/* </ScaleFade> */}
            </Box>
          </Flex>
          <Divider />
        </Link>                                     
        <Divider />                               
      </Flex>
    </Box>
  );
}
