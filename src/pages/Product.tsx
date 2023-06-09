import Head from "next/head";
import { Flex } from "@chakra-ui/react";
import SideBar from "@/components/Sidebar/SideBar";
import Header from "@/components/Header/Header";
import Body from "@/components/Body/Body";
import Modale from "@/components/modals/Modale";
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/router";
import { useEffect } from "react";
export default function Home() {
  const { id, accessToken } = useSelector(
    (state: RootState) => state.credentials
  );
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Modale />
        <Flex alignItems="start">
          <SideBar />
          <Flex flexDir="column" position="relative">
            <Header />
            <Body />
          </Flex>
        </Flex>
      </main>
    </>
  );
}
