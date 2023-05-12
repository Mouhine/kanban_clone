import React, { useState } from "react";
import { Button, Flex, Input, Stack, Text } from "@chakra-ui/react";
import { FaGithub } from "react-icons/fa";
import { useCreateUserMutation } from "@/redux/api/userApi";
import { useRegisterUserMutation } from "@/redux/api/auth";
import { setAuth } from "@/redux/Futures/authSlice";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { toggleOpen } from "@/redux/Futures/modalSlice";
type Props = {};

const SignIn = (props: Props) => {
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();
  const [register, result] = useRegisterUserMutation();

  console.log(result);

  async function createAccount() {
    try {
      await register(userInfo);
      setAuth(result.data!);
      dispatch(toggleOpen());
      router.replace("/");
    } catch (error) {
      console.log("hello world");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { value, name } = e.target;
    setUserInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }
  return (
    <Stack>
      <Flex flexDir="column">
        <Button variant="outline">
          <FaGithub style={{ marginRight: "1rem" }} />
          Github
        </Button>
      </Flex>

      <Flex py="1rem" alignItems="center" justifyContent="center">
        <Text>OR</Text>
      </Flex>
      <>
        <Text fontSize="12px">First Name</Text>
        <Input
          name="firstName"
          placeholder="first name..."
          fontWeight={300}
          fontSize="10pt"
          onChange={handleChange}
          value={userInfo.firstName}
        />
      </>
      <>
        <Text fontSize="12px">Last Name</Text>
        <Input
          name="lastName"
          placeholder="last name ..."
          fontWeight={300}
          fontSize="10pt"
          onChange={handleChange}
          value={userInfo.lastName}
        />
      </>

      <>
        <Text fontSize="12px">Email</Text>
        <Input
          name="email"
          placeholder="email ...."
          fontWeight={300}
          fontSize="10pt"
          onChange={handleChange}
          value={userInfo.email}
        />
      </>
      <>
        <Text fontSize="12px">Password</Text>
        <Input
          name="password"
          placeholder="password ..."
          fontWeight={300}
          fontSize="10pt"
          onChange={handleChange}
          value={userInfo.password}
        />
      </>
      <Button
        bg="accent-color"
        color="creame-white"
        fontWeight={300}
        fontSize="10pt"
        borderRadius="100vw"
        onClick={createAccount}
        isLoading={result.isLoading}
      >
        create account
      </Button>
    </Stack>
  );
};

export default SignIn;
