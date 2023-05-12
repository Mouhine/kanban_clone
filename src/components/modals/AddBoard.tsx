import React, { useState } from "react";
import { Flex, Text, Input, Stack, Textarea, Button } from "@chakra-ui/react";
import { useCreateBoardMutation } from "@/redux/api/boardApi";
import { toggleOpen } from "@/redux/Futures/modalSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

type Props = {};

function AddBoard({}: Props) {
  const { id } = useSelector((state: RootState) => state.credentials);

  const [createBoard, result] = useCreateBoardMutation();
  const dispatch = useDispatch();
  const [boardInfo, setBoardInfo] = useState({
    title: "",
    description: "",
    userId: id,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = e.target;
    setBoardInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  return (
    <Stack>
      <>
        <Text fontSize="12px">Title</Text>
        <Input
          placeholder="title ..."
          fontWeight={300}
          fontSize="10pt"
          value={boardInfo.title}
          name="title"
          onChange={handleChange}
        />
      </>
      <>
        <Text fontSize="12px">Description</Text>
        <Textarea
          placeholder="add a small description"
          fontWeight={300}
          fontSize="10pt"
          value={boardInfo.description}
          name="description"
          onChange={handleChange}
        />
      </>

      <>
        <Text fontSize="12px">Date</Text>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="datetime-local"
          fontWeight={300}
          fontSize="10pt"
        />
      </>
      <Button
        bg="accent-color"
        color="creame-white"
        fontWeight={300}
        borderRadius="100vw"
        fontSize="10pt"
        onClick={() => {
          if (!id) {
            return;
          }
          createBoard(boardInfo);
          dispatch(toggleOpen());
        }}
        isLoading={result.isLoading}
      >
        create board
      </Button>
    </Stack>
  );
}

export default AddBoard;
