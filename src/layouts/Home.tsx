import { Box, Flex } from "@chakra-ui/layout";
import { Heading } from "@chakra-ui/react";
import * as React from "react";

export interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <Flex width="100%" maxW="1200px" m="0 auto" justifyContent="center">
      <Heading fontSize="50px" mt={5}>
        Welcome to Timesheet
      </Heading>
    </Flex>
  );
}
