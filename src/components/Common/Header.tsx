import { Box, Flex, Heading, Avatar} from "@chakra-ui/react";
import React, { useState } from "react";
import '../../CustomCss/custom.css';
import nccLogo from '../../images/nccsoft_vietnam_logo.png'
export interface HeaderProps {}
export default function Header(props: HeaderProps) {

  return (
    <>
      <Flex
        align="center"
        justify="space-between"
        padding="20px"
      >
        <Box>
          <Heading fontSize="20px" letterSpacing="2px" color="white" display='flex' alignItems='center' >
            
            <Avatar name='ncc' src={nccLogo} bg='none'/>
            TIMESHEET
          </Heading>
        </Box>
      </Flex>
      
    </>
  );
}
