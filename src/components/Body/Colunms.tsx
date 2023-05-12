import React, { useState, useEffect } from "react";
import { Flex, Skeleton, SkeletonCircle, Text } from "@chakra-ui/react";
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd";
import dynamic from "next/dynamic";
import Task from "@/types/Task";
import { useGetUserByIdQuery } from "@/redux/api/userApi";
import { useGetAllQuery, useUpdateTodoMutation } from "@/redux/api/TaskApi";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { setView, setTitle, toggleOpen } from "@/redux/Futures/modalSlice";
import { useGetAllTabelsQuery } from "@/redux/api/table";
import { Table } from "@/types/Table";
import Skelton from "../helpers/Skelton";
const Colunm = dynamic(() => import("./Colunm"), { ssr: false });

function Colunms() {
  const { id: boardId } = useSelector((state: RootState) => state.board);
  const { data: tabels, isLoading } = useGetAllTabelsQuery(boardId);
  const { id } = useSelector((state: RootState) => state.credentials);
  const { data } = useGetAllQuery();
  const dispatch = useDispatch();
  const [updateTask] = useUpdateTodoMutation();
  const [Tabels, setTabels] = useState<Table[]>([]);

  const reorderColumnList = (
    sourceCol: Table,
    startIndex: number,
    endIndex: number
  ) => {
    console.log(startIndex, endIndex);

    setTabels((prev) => {
      return prev.map((col, i) => {
        console.log(sourceCol);
        if (col.name === sourceCol.name) {
          console.log(col);
          const [item] = col.tasks!.splice(startIndex, 1);
          col.tasks!.splice(endIndex, 0, item);
          return col;
        }
        return col;
      });
    });
  };

  useEffect(() => {
    const GetTabels = async () => {
      try {
        const data = await fetch(
          `https://kanban-clone-sand.vercel.app/api/table/${boardId}`
        );
        const result = await data.json();
        setTabels(result);
      } catch (error) {}
    };
    GetTabels();
  }, [boardId, tabels, data]);

  const onDragEnd: OnDragEndResponder = async (result) => {
    const { destination, source } = result;
    if (!destination) {
      return;
    }

    if (
      destination.droppableId == source.droppableId &&
      destination.index == source.index
    ) {
      return;
    }

    const sourceCol = Tabels?.find(
      (col: Table) => col.id === source.droppableId
    );
    const destinationCol = Tabels?.find(
      (col) => col.id === destination.droppableId
    );

    if (sourceCol?.name === destinationCol?.name) {
      reorderColumnList(sourceCol!, source.index, destination.index);
      return;
    }

    const [MovingTask] = sourceCol?.tasks!.splice(source.index, 1)!;
    await updateTask({
      ...MovingTask,
      tabelId: destinationCol?.id!,
    });
    // MovingTask.status = destinationCol?.title!;
    destinationCol?.tasks!.splice(destination.index, 0, MovingTask);
  };
  console.log(boardId);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {!(boardId === "") ? (
        <Flex gap="1.3rem" overflowX="auto" pb="1rem">
          {!isLoading
            ? Tabels?.map((column, i) => {
                return (
                  <Colunm
                    title={column?.name}
                    accentColor={"white"}
                    tasks={column?.tasks!}
                    id={column.id!}
                    key={i}
                  />
                );
              })
            : new Array(3).fill(null).map((s, i) => {
                return <Skelton key={i} />;
              })}

          <Flex
            minW="250px"
            alignItems="center"
            justify="center"
            borderRadius="10px"
            bg="main-color-bg"
          >
            <Flex
              onClick={() => {
                dispatch(setView("addTabel"));
                dispatch(setTitle("Add Tabel"));
                dispatch(toggleOpen());
              }}
              py="1rem"
              px="3rem"
              borderRadius="10px"
              cursor="pointer"
            >
              <Text color="whitesmoke">Add Tabel</Text>
            </Flex>
          </Flex>
        </Flex>
      ) : (
        <Flex w="100%" alignItems="center" justify="center">
          <Text
            p="2rem"
            border="1px solid white"
            borderRadius="10px"
            color="white"
            textAlign="center"
          >
            Please Select or create a Board to see tasks
          </Text>
        </Flex>
      )}
    </DragDropContext>
  );
}

export default Colunms;
