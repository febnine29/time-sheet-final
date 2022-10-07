import { Box, Flex, Heading, Avatar} from "@chakra-ui/react";
import {Menu, MenuButton, MenuItem} from "@szhsin/react-menu"
import React, { useState } from "react";
import '../../css/custom.css';
import { HamburgerIcon } from "@chakra-ui/icons";
import * as Feather from "react-feather"
import { IconButton} from "@chakra-ui/react";
import nccLogo from '../../images/nccsoft_vietnam_logo.png'
export interface HeaderProps {}
export default function Header(props: HeaderProps) {
  const dataColor = [
    "gray.400",
    "red.400",
    "orange.400",
    "yellow.400",
    "teal.400",
    "green.400",
    "blue.400",
    "cyan.400",
    "purple.400",
  ];
  //Color
  const [color, setColor] = useState("blue.400");
  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        padding="20px"
        bgColor={color}
        className="header-bar"
      >
        <Box>
          <Heading fontSize="20px" letterSpacing="2px" color="white" display='flex' alignItems='center' >
            <Avatar name='ncc' src={nccLogo} bg='none'/>
            TIMESHEET
          </Heading>
        </Box>
        <Box>
          <Menu menuButton={<MenuButton style={{color: 'white'}}><Feather.Menu /></MenuButton>} transition>
            {dataColor.map((item, index) => (
              <MenuItem  
                key={index}
                value="Copy"
                onClick={(e) => {
                  e.keepOpen = true;
                  setColor(item)
                }}
              >
                <Box bgColor={item} w={8} h={8} borderRadius='5px' mr={2}/>
                {item}
              </MenuItem>
            ))}
          </Menu>
          
        </Box>
      </Flex>
      
    </>
  );
}
