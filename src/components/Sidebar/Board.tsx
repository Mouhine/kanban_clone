import React from "react";
import { Flex, Icon, Text } from "@chakra-ui/react";
import { TbLayoutBoardSplit } from "react-icons/tb";
import { AiFillDelete } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { setBoardTitle, setBoaredId } from "@/redux/Futures/board";
import { RootState } from "@/redux/store";
import { Board } from "@/types/Board";
import { useDeleteBoardMutation } from "@/redux/api/boardApi";
type Props = {
  board: Board;
};

function Board({ board }: Props) {
  const { title, id } = useSelector((state: RootState) => state.board);
  const dispatch = useDispatch();
  const handleSelectBoard = () => {
    dispatch(setBoardTitle(board.title));
    dispatch(setBoaredId(board.id!));
  };

  const [deleteBoard, result] = useDeleteBoardMutation();
  const handleDelectBoard = () => {
    deleteBoard(board);
    dispatch(setBoardTitle(""));
    dispatch(setBoaredId(""));
  };
  return (
    <Flex
      cursor="pointer"
      alignItems="center "
      justify="space-between"
      bg={title === board.title ? "accent-color" : ""}
      pr="2rem"
      borderRightRadius="100vw"
    >
      <Flex
        alignItems="center"
        flexGrow={1}
        py="0.8rem"
        borderRightRadius="13px"
        pl="1rem"
        onClick={handleSelectBoard}
      >
        <Icon as={TbLayoutBoardSplit} color="creame-white" />
        <Text fontWeight={100} fontSize="12px" color="creame-white" ml="3">
          {board.title}
        </Text>
      </Flex>

      <Flex onClick={handleDelectBoard}>
        <Icon
          as={AiFillDelete}
          color="creame-white"
          _hover={{ color: "red", transition: "all 0.4s ease" }}
        />
      </Flex>
    </Flex>
  );
}

export default Board;
