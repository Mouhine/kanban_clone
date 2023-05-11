import React from "react";
import { Flex, Text, Icon } from "@chakra-ui/react";
import { HiOutlineViewBoards } from "react-icons/hi";
import Link from "next/link";
type Props = {};

function Header({}: Props) {
  return (
    <Flex h="80px" alignItems="center" mb="2rem">
      <Flex alignItems="center" pl="1rem">
        <Icon as={HiOutlineViewBoards} color="accent-color" fontSize="3xl" />

        <Text fontSize="2xl" fontWeight={800} ml="0.5" color="creame-white">
          Kanban
        </Text>
      </Flex>
    </Flex>
  );
}

export default Header;
