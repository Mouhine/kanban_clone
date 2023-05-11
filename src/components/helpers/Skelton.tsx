import React from "react";
import { Skeleton, Flex } from "@chakra-ui/react";

const Skelton = () => {
  return (
    <Flex
      flexDir="column"
      w="250px"
      p="1rem"
      border="1px solid white"
      borderRadius="10px"
    >
      {new Array(6).fill(null).map((s, i) => {
        return <Skeleton key={i} h="60px" my="1rem" borderRadius="10px" />;
      })}
    </Flex>
  );
};

export default Skelton;
