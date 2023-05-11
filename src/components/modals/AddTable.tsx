import React, { useState } from "react";
import { Flex, Text, Input, Stack, Textarea, Button } from "@chakra-ui/react";
import { useCreateTableMutation } from "@/redux/api/table";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { toggleOpen } from "@/redux/Futures/modalSlice";
import { useDispatch } from "react-redux";
type Props = {};

function AddTabel({}: Props) {
  const [createTabel, result] = useCreateTableMutation();
  const { id } = useSelector((state: RootState) => state.board);
  const { id: userId } = useSelector((state: RootState) => state.credentials);
  const dispatch = useDispatch();
  const [boardInfo, setBoardInfo] = useState({
    name: "",
    userId: userId,
    boardId: id,
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
          value={boardInfo.name}
          name="name"
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
        fontSize="10pt"
        onClick={() => {
          createTabel(boardInfo);
          dispatch(toggleOpen());
        }}
        isLoading={result.isLoading}
      >
        create Tabel
      </Button>
    </Stack>
  );
}

export default AddTabel;
