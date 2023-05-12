import React from "react";
import Board from "./Board";
import { Flex, Button, Icon, Text } from "@chakra-ui/react";
import { TbLayoutBoardSplit, TbPlus } from "react-icons/tb";
import { setView, setTitle, toggleOpen } from "@/redux/Futures/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { useGetAllBoardsQuery } from "@/redux/api/boardApi";
import { RootState } from "@/redux/store";
type Props = {};

export default function Boardes({}: Props) {
  const { id } = useSelector((state: RootState) => state.credentials);

  const { data, isLoading, isError, error } = useGetAllBoardsQuery(id);
  const dispatch = useDispatch();
  const handleToggleOpen = () => {
    dispatch(toggleOpen());
    dispatch(setView("addBoard"));
    dispatch(setTitle("Add Board "));
  };
  return (
    <Flex w="20vw">
      <Flex flexDir="column" gap="0.3rem" letterSpacing="1.5px" flexGrow={1}>
        <Text pl="1rem" color="gray.200" fontSize="12px">
          ALL BOARDS ({data?.length})
        </Text>
        <Flex flexDir="column" gap="0.5rem" py="0.3rem" w="90%">
          {data?.map((board, i) => {
            return <Board key={i} board={board} />;
          })}
        </Flex>
        <Button
          bg="none"
          _hover={{ bg: "accent-color", color: "white" }}
          onClick={handleToggleOpen}
          display="flex"
          justifyContent="left"
        >
          <Flex>
            <Flex alignItems="center" ml="1">
              <Icon as={TbPlus} color="#645fc6" />
              <Text color="#645fc6" fontSize="13px" ml="1rem">
                Create New Board
              </Text>
            </Flex>
          </Flex>
        </Button>
      </Flex>
    </Flex>
  );
}
