//@ts-nocheck
import { RootState } from "@/redux/store";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useGetByIdQuery } from "@/redux/api/TaskApi";
import { Flex, Text, Stack, Select, Button } from "@chakra-ui/react";
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";
import {
  useUpdateSubTodoMutation,
  useDeleteTodoMutation,
} from "@/redux/api/TaskApi";
import { useDispatch } from "react-redux";
import { toggleOpen } from "@/redux/Futures/modalSlice";
import Task, { SubTask } from "@/types/Task";
type Props = {};

function TaskInfo({}: Props) {
  const { id } = useSelector((state: RootState) => state.task);
  const [status, setStatus] = useState<string>("");
  const { data: Task, error, isLoading } = useGetByIdQuery(id);
  const [updateTask, result] = useUpdateSubTodoMutation();
  const [deleteTask, result1] = useDeleteTodoMutation();
  const dispatch = useDispatch();
  const [subTasks, setSubTasks] = useState<SubTask[]>([]);
  function handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setStatus((prev) => e.target.value);
    console.log(status);
  }
  useEffect(() => {
    setSubTasks(Task?.subTasks!);
  }, [isLoading]);

  async function updateTaskStatus(task: Task) {
    console.log({ ...Task!, status: status! });
    await updateTask(task);
  }

  return (
    <Stack>
      <Text fontSize="2rem">{Task?.title}</Text>
      <Text fontSize="10pt" color="GrayText">
        {Task?.description}
      </Text>
      <Flex flexDir="column">
        <Text fontSize="10pt">subtasks {subTasks?.length}</Text>
        <CheckboxGroup>
          {subTasks?.map((task) => {
            return (
              <Checkbox
                key={task.title!}
                bg="main-dark-bg"
                my="0.2rem"
                p="0.6rem"
                borderRadius="3px"
                isChecked={task.checked}
                onChange={() => {
                  const target = subTasks.find((t) => t.id === task.id);
                  const tasks = subTasks.filter((t) => t.id !== task.id);
                  setSubTasks((prev) => {
                    const tasks = prev.filter((t) => t.id !== task.id);
                    if (target?.checked === true) {
                      return [...tasks, { ...target, checked: false }];
                    }
                    return [...tasks, { ...target, checked: true }];
                  });

                  if (task.checked) {
                    updateTask({
                      ...Task,
                      subTasks: [...tasks, { ...target, checked: false }],
                    });
                    return;
                  }
                  updateTask({
                    ...Task,
                    subTasks: [...tasks, { ...target, checked: true }],
                  });
                }}
              >
                <Text fontSize="10pt" color="GrayText">
                  {task.title}
                </Text>
              </Checkbox>
            );
          })}
        </CheckboxGroup>
      </Flex>

      <Button
        bg="darkred"
        color="creame-white"
        fontWeight={300}
        fontSize="10pt"
        onClick={() => {
          deleteTask(Task!);
          dispatch(toggleOpen());
        }}
        isLoading={result1.isLoading}
      >
        delete Task
      </Button>
    </Stack>
  );
}

export default TaskInfo;
