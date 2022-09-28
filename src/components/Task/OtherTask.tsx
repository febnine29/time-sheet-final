import {Box, Button, Code, Divider, Flex, Heading, Text,AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React from "react";
import { useAppDispatch } from "../../app/hooks";
import {
  archiveTask,
  deArchiveTask,
  deleteTask,
} from "../../features/TaskSlice";
import { Task } from "../../type/Task";
export interface CommonTaskProps {
  tasks: Task[] | null;
  handleClickEdit: (tasks: Task) => void;
}

export default function CommonTask({
  tasks,
  handleClickEdit,
}: CommonTaskProps) {
  const dispatch = useAppDispatch();
  return (
    <Box>
      <Heading fontSize={30} my={5}>Other Tasks</Heading>
      <Box maxHeight='60vh' overflowY="scroll">
      {tasks
        ?.filter((task) => task.type === 1)
        .map((task) => (
          <>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              key={task.id}
            >
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => handleClickEdit(task)}
              >
                Edit
              </Button>
              <Text mr='auto' ml='10px'>
                {task.name}
              </Text>
              <Box>
                {task.isDeleted ? (
                  <Button
                    colorScheme="orange"
                    size="sm"
                    onClick={() => dispatch(deArchiveTask({ id: task.id }))}
                  >
                    Unarchive
                  </Button>
                ) : (
                  <Button
                    colorScheme="orange"
                    size="sm"
                    onClick={() => dispatch(archiveTask(task.id))}
                  >
                    Archive
                  </Button>
                )}
                <Button
                  colorScheme="red"
                  size="sm"
                  ml={2}
                  isDisabled={!task.isDeleted}
                  onClick={() => dispatch(deleteTask(task.id))}
                >
                  Delete
                </Button>
              </Box>
            </Flex>
            <Divider mt={2} mb={2} />
          </>
        ))}
        </Box>
    </Box>
  );
}
