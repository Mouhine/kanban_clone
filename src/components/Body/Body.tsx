import React from "react";
import { Flex } from "@chakra-ui/react";
import Colunms from "./Colunms";
type Props = {};

function Body({}: Props) {
  return (
    <Flex
      bg="main-dark-bg"
      p="1rem"
      h="92vh"
      flexGrow={10}
      w="90vw"
      borderLeft="1px solid #8a8c9b"
    >
      <Colunms />
    </Flex>
  );
}

export default Body;
