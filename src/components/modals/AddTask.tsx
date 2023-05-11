import React, { useState } from "react";
import {
  Flex,
  Input,
  Text,
  Stack,
  Textarea,
  Button,
  Box,
  Icon,
  Select,
} from "@chakra-ui/react";
import { useAddTodoMutation } from "@/redux/api/TaskApi";
import { GrFormClose } from "react-icons/gr";
import { SubTask } from "@/types/Task";
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useGetAllTabelsQuery } from "@/redux/api/table";
import { setView, toggleOpen, setTitle } from "@/redux/Futures/modalSlice";
import { useDispatch } from "react-redux";
import { setMsg } from "@/redux/Futures/error";
type Props = {};

function AddTask({}: Props) {
  const dispatch = useDispatch();
  const [subTask, setSubTask] = useState<SubTask>({
    id: "",
    title: "",
    checked: false,
  });

  const { id } = useSelector((state: RootState) => state.board);
  const { id: userId } = useSelector((state: RootState) => state.credentials);
  const { data: tabels } = useGetAllTabelsQuery(id);

  const [addTask, result] = useAddTodoMutation({
    fixedCacheKey: "shared-update-post",
  });

  const [subTasks, setSubtasks] = useState<SubTask[] | []>([]);
  const [taskInfo, setTaskInfo] = useState({
    title: "",
    description: "",
    status: "todo",
    userId: userId,
    boardId: id,
    tabelId: "",
  });

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { target } = event;
    const { name, value } = target;
    setTaskInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeSubTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubTask((prev) => ({
      title: event.target?.value,
      checked: false,
    }));
  };

  const handelAddSubTask = () => {
    setSubtasks((prev) => {
      return [...prev, subTask];
    });

    setSubTask({
      id: "",
      title: "",
      checked: false,
    });
  };

  const handleDeleteSubTask = (title: string) => {
    setSubtasks((prev) => {
      const subTasks = prev.filter((task) => task.title === title);
      console.log(subTasks);
      return [...subTasks];
    });
  };

  return (
    <Stack spacing={2}>
      <Flex>
        <Text>Add New Task</Text>
      </Flex>
      <>
        <Text fontSize="12px">Title</Text>
        <Input
          placeholder="title"
          name="title"
          fontWeight={300}
          fontSize="10pt"
          onChange={handleChange}
        />
      </>

      <>
        <Text fontSize="12px">Description</Text>
        <Textarea
          placeholder="add a small description"
          fontWeight={300}
          fontSize="10pt"
          name="description"
          onChange={handleChange}
        />
      </>

      <>
        <Text fontSize="12px">SubTasks</Text>
        <Stack maxH="100px" overflowY="auto">
          {subTasks.map((task, i) => {
            return (
              <SubTask
                subTask={task}
                key={i}
                handleDeleteSubTask={handleDeleteSubTask}
              />
            );
          })}
        </Stack>
        <Input
          placeholder="title ..."
          cursor="pointer"
          fontWeight={300}
          fontSize="10pt"
          value={subTask.title}
          onChange={(e) => handleChangeSubTask(e)}
        />
        <Button
          bg="creame-white"
          color="accent-color"
          height="35px"
          fontWeight={300}
          fontSize="10pt"
          onClick={handelAddSubTask}
        >
          Add sub Task
        </Button>
      </>
      <>
        <Select
          placeholder="Select option"
          name="tabelId"
          onChange={handleChange}
        >
          {tabels?.map((tabel, i) => {
            return (
              <option key={tabel.id} value={tabel.id!}>
                {tabel.name}
              </option>
            );
          })}
        </Select>
      </>
      <Button
        bg="accent-color"
        color="creame-white"
        fontWeight={300}
        fontSize="10pt"
        onClick={() => {
          if (!taskInfo.tabelId) {
            dispatch(setView("error"));
            dispatch(setTitle("Warning"));
            dispatch(setMsg("pleane select a tabel first"));
            dispatch(toggleOpen());
          }
          addTask({
            ...taskInfo,
            subTasks,
          });
          dispatch(toggleOpen());
        }}
      >
        create Tasks
      </Button>
    </Stack>
  );
}

export default AddTask;

const SubTask = ({
  subTask,
  handleDeleteSubTask,
}: {
  subTask: SubTask;
  handleDeleteSubTask: (id: string) => void;
}) => {
  return (
    <Flex alignItems="center">
      <Box p="0.5rem" border="0.3px solid gray" w="full" rounded={6} mr="1rem">
        {" "}
        {subTask.title}
      </Box>
      <Button onClick={() => handleDeleteSubTask(subTask.title!)}>
        <Icon as={GrFormClose} color="white" />
      </Button>
    </Flex>
  );
};
