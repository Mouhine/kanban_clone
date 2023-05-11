import React from "react";
import { Flex, Text } from "@chakra-ui/react";
const Error = ({ msg }: { msg: string }) => {
  return (
    <Flex>
      <Text>{msg}</Text>
    </Flex>
  );
};

export default Error;
