import React from "react";
import { Flex, Button, Text, Icon, Tooltip } from "@chakra-ui/react";
import { TbLayoutBoardSplit, TbPlus } from "react-icons/tb";
import { BsThreeDotsVertical } from "react-icons/bs";
import { toggleOpen, setView, setTitle } from "@/redux/Futures/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { setMsg } from "@/redux/Futures/error";
import Link from "next/link";
import { RootState } from "@/redux/store";
import UserMenu from "./userMenu";
type Props = {};

const Header = (props: Props) => {
  const { title, id: boardId } = useSelector((state: RootState) => state.board);
  const { accessToken, id } = useSelector(
    (state: RootState) => state.credentials
  );
  const dispatch = useDispatch();
  const handleOpenModal = () => {
    if (!boardId) {
      dispatch(setMsg("please select a board to add a task"));
      dispatch(toggleOpen());
      dispatch(setTitle("Warrning"));
      dispatch(setView("error"));
      return;
    }
    dispatch(toggleOpen());
    dispatch(setView("addTask"));
    dispatch(setTitle("Add Task"));
  };

  return (
    <Flex
      alignItems="center"
      justifyContent="center"
      flexGrow={1}
      bg="main-color-bg"
      px="2rem"
      py="1rem"
      border="1px solid #8a8c9b"
      h="8vh"
    >
      <Flex alignItems="center" justifyContent="space-between" flexGrow={1}>
        <Text fontSize="lg" fontWeight={400} color="creame-white">
          {title ? title : "Select a Board"}
        </Text>
        <Flex alignItems="center" gap="0.6rem" pr="1rem">
          {accessToken && (
            <Button bg="accent-color" onClick={handleOpenModal}>
              <Flex alignItems="center">
                <Icon as={TbPlus} color="creame-white" />
                <Text fontWeight={300} color="creame-white" fontSize="12px">
                  Add New Task
                </Text>
              </Flex>
            </Button>
          )}
          {/* <Icon as={BsThreeDotsVertical} color="gray.200" /> */}
          <UserMenu />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Header;
