import React from "react";
import Task from "./Task";
import { Flex, Box, Text, Icon, IconButton } from "@chakra-ui/react";
import TaskType from "@/types/Task";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { AiFillDelete } from "react-icons/ai";
import { useDeleteTableMutation } from "@/redux/api/table";
type Props = {
  id: string;
  title: string;
  accentColor: string;
  tasks: TaskType[];
};

function Colunm({ id, title, tasks, accentColor }: Props) {
  const [deleteTabel] = useDeleteTableMutation();
  return (
    <Flex
      flexDir="column"
      gap="0.8rem"
      alignItems="start"
      border="1px solid #917FB3"
      borderRadius="10px"
      boxShadow=" #2c2c38 0px 3px 10px 0px"
      p="0.5rem"
    >
      <Flex
        alignItems="center"
        gap="0.5rem"
        py="0.5rem"
        justifyContent="space-between"
        w="100%"
      >
        <Flex alignItems="center">
          <Box w="15px" h="15px" borderRadius="50%" bg={accentColor}></Box>
          <Text
            color="creame-white "
            ml="1rem"
            fontSize="10px"
            letterSpacing={1.2}
          >
            {title} ({tasks.length})
          </Text>
        </Flex>
        <IconButton
          icon={<AiFillDelete />}
          aria-label="delete tabel"
          colorScheme="main-color-bg"
          fontSize={"20px"}
          p="10px"
          onClick={() => {
            deleteTabel(id);
          }}
        />
      </Flex>
      <Droppable droppableId={id}>
        {(droppableProvider, droppableSnapshot) => {
          return (
            <Flex
              w="250px"
              flexDir="column"
              h="100%"
              gap="0.6rem"
              ref={droppableProvider.innerRef}
              {...droppableProvider.droppableProps}
            >
              {tasks?.map((task, i) => {
                return <Task task={task} key={task.id} index={i} />;
              })}
            </Flex>
          );
        }}
      </Droppable>
    </Flex>
  );
}

export default Colunm;
