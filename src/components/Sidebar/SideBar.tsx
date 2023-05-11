import React from "react";
import { Flex, Box, Text } from "@chakra-ui/react";
import Header from "./Header";
import Boardes from "./Boardes";
type Props = {};

const SideBar = (props: Props) => {
  return (
    <Flex minH="100vh" bg="main-color-bg" flexDir="column">
      <Header />
      <Boardes />
    </Flex>
  );
};

export default SideBar;
