import React from "react";
import { Flex, Text, Button } from "@chakra-ui/react";
import { useSelector, useDispatch } from "react-redux";
import { toggleOpen, setView, setTitle } from "@/redux/Futures/modalSlice";
import { useHandleRefreshMutation } from "@/redux/api/auth";
type Props = {};

function NavBar({}: Props) {
  const dispatch = useDispatch();
  const [refresh] = useHandleRefreshMutation();
  const handleopenLoginOrSignIn = (key: string) => {
    dispatch(setView(key));
    dispatch(toggleOpen());
    dispatch(setTitle(key.toUpperCase()));
  };

  return (
    <Flex
      maxW="80vw"
      w="100%"
      mx="auto"
      h="8vh"
      justifyContent="space-between"
      align="center"
    >
      <Text fontSize="1.5rem" fontWeight="600" color="white">
        KanBan
      </Text>

      <Flex align="center">
        <Button
          mr="1rem"
          h="36px"
          onClick={() => handleopenLoginOrSignIn("login")}
        >
          Login
        </Button>
        <Button h="36px" onClick={() => handleopenLoginOrSignIn("signIn")}>
          SignUp
        </Button>
      </Flex>
    </Flex>
  );
}

export default NavBar;
