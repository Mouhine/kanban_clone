import React from "react";
import { Flex, Text } from "@chakra-ui/react";
import TaskType from "@/types/Task";
import { Draggable } from "react-beautiful-dnd";
import { setId } from "@/redux/Futures/taskSlice";
import { toggleOpen, setView, setTitle } from "@/redux/Futures/modalSlice";
import { useDispatch } from "react-redux";
type Props = {
  task: TaskType;
  index: number;
};

const Task = ({ task, index }: Props) => {
  const dispatch = useDispatch();

  function handleShowTask() {
    dispatch(toggleOpen());
    dispatch(setTitle("Task details"));
    dispatch(setId(task.id!));
    dispatch(setView("Task"));
  }
  return (
    <Draggable draggableId={task.id!} index={index}>
      {(draggableProvider, draggableSnapshot) => (
        <Flex
          bg="main-color-bg"
          p="3"
          borderRadius={6}
          onClick={handleShowTask}
          ref={draggableProvider.innerRef}
          {...draggableProvider.draggableProps}
          {...draggableProvider.dragHandleProps}
        >
          <Flex flexDir="column" gap="0.3rem" alignItems="start">
            <Text fontSize="lg" fontWeight={500} color="creame-white">
              {task.title}
            </Text>
            <Text fontSize="6px" color="GrayText">
              {task?.description}
            </Text>
          </Flex>
        </Flex>
      )}
    </Draggable>
  );
};

export default Task;
