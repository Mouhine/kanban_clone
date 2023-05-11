//@ts-nocheck
import React from "react";
import NavBar from "@/components/navBar/NavBar";
import { Flex, Text, Button } from "@chakra-ui/react";
import ImageGallery from "react-image-gallery";
import { useDispatch } from "react-redux";
import { toggleOpen, setView, setTitle } from "@/redux/Futures/modalSlice";
type Props = {};

const Home = (props: Props) => {
  const images = [
    {
      original: "/1.jpg",
      thumbnail: "/1.jpg",
    },
    {
      original: "/2.jpg",
      thumbnail: "/2.jpg",
    },
    {
      original: "/3.jpg",
      thumbnail: "/3.jpg",
    },
  ];
  const dispatch = useDispatch();
  return (
    <Flex bg="main-dark-bg" minH="100vh" flexDir="column">
      <NavBar />

      <Flex maxW="80%" align="center" mx="auto" flexDir="column" py="2rem">
        <Flex
          flexDir="column"
          alignItems="center"
          maxW="600px"
          color="whitesmoke"
        >
          <Text fontSize="5rem">Kanban</Text>
          <Text textAlign="center">
            Introducing our Task Manager website software product, designed to
            help you manage your tasks and projects effectively online. Our
            software offers a user-friendly interface with powerful features
            that allow you to keep track of your tasks, prioritize them, and
            collaborate with your team members.
          </Text>

          <Flex color="gray.300" my="1rem">
            <Button
              variant="outline"
              mr="1rem"
              onClick={() => {
                dispatch(setView("login"));
                dispatch(setTitle("Login"));
                dispatch(toggleOpen());
              }}
            >
              Get Started
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                dispatch(setView("signIn"));
                dispatch(setTitle("sign In"));
                dispatch(toggleOpen());
              }}
            >
              Sign In
            </Button>
          </Flex>
        </Flex>
        <Flex>
          <ImageGallery items={images} />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Home;
