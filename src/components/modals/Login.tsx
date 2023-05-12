//@ts-nocheck
import { Input, Stack, Text, Button, Flex } from "@chakra-ui/react";
import React, { useState } from "react";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { useSession, signIn, signOut } from "next-auth/react";
import { useLoginUserMutation } from "@/redux/api/auth";
import { setAuth } from "@/redux/Futures/authSlice";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import { toggleOpen } from "@/redux/Futures/modalSlice";
type Props = {};

const Login = (props: Props) => {
  const { accessToken, id } = useSelector(
    (state: RootState) => state.credentials
  );

  const dispatsh = useDispatch();

  const router = useRouter();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [login, data] = useLoginUserMutation();

  async function handleLoginWithGithub() {
    await signIn();
  }

  async function handleLogin() {
    try {
      const res = await login(credentials);
      console.log(res);
      dispatsh(setAuth(res.data!));
      dispatsh(toggleOpen());
      router.push("/Product");
    } catch (error) {}
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
  return (
    <Stack>
      <Flex flexDir="column">
        <Button variant="outline" onClick={handleLoginWithGithub}>
          <FaGithub style={{ marginRight: "1rem" }} />
          Github
        </Button>
      </Flex>

      <Flex py="1rem" alignItems="center" justifyContent="center">
        <Text>OR</Text>
      </Flex>

      <>
        <Text fontSize="12px">Email</Text>
        <Input
          placeholder="email ...."
          fontWeight={300}
          fontSize="10pt"
          value={credentials.email}
          onChange={handleChange}
          name="email"
        />
      </>
      <>
        <Text fontSize="12px">Password</Text>
        <Input
          placeholder="password ..."
          fontWeight={300}
          fontSize="10pt"
          value={credentials.password}
          onChange={handleChange}
          name="password"
        />
      </>
      <Button
        bg="accent-color"
        color="creame-white"
        fontWeight={300}
        fontSize="10pt"
        borderRadius="100vw"
        onClick={handleLogin}
        isLoading={data.isLoading}
      >
        Login
      </Button>
    </Stack>
  );
};

export default Login;
