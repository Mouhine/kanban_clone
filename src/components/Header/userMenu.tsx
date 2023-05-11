import { Menu, MenuButton, MenuList, MenuItem, Flex } from "@chakra-ui/react";
import React from "react";
import { FaUserCircle } from "react-icons/fa";
import { setAuth } from "@/redux/Futures/authSlice";
import { useRouter } from "next/router";
type Props = {};

const UserMenu = (props: Props) => {
  const router = useRouter();
  function logout() {
    setAuth({
      id: "",
      accessToken: "",
    });
    router.push("/");
  }
  return (
    <Menu>
      <MenuButton>
        <Flex
          w="40px"
          h="40px"
          borderRadius="full"
          justify="center"
          alignItems="center"
        >
          <FaUserCircle size={30} color="white" />
        </Flex>
      </MenuButton>
      <MenuList>
        <MenuItem onClick={logout}>Log Out</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default UserMenu;
