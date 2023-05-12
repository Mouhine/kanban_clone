import React from "react";
import { Flex } from "@chakra-ui/react";
import Colunms from "./Colunms";
type Props = {};

function Body({}: Props) {
  return (
    <Flex bg="main-dark-bg" p="1rem" h="90vh" flexGrow={10} w="90vw">
      <Colunms />
    </Flex>
  );
}

export default Body;
