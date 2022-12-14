import {Box, Button, Code, Divider, Flex, Heading, Text,AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure
} from "@chakra-ui/react";
import React from "react";
import {useRef} from "react"
import { useAppDispatch } from "../../app/hooks";
import { FixedSizeList as List } from "react-window";
import AutoSizer from 'react-virtualized-auto-sizer'
import {
  archiveTask,
  deArchiveTask,
  deleteTask,
} from "../../features/TaskSlice";
import {useSelector, useDispatch} from 'react-redux';
import { alertSelector, storeId } from "../../features/AlertReducer";

import { Task } from "../../type/Task";
export interface CommonTaskProps {
  tasks: Task[] | null;
  handleClickEdit: (tasks: Task) => void;
}

export default function CommonTask({
  tasks,
  handleClickEdit,
}: CommonTaskProps) {
  const { 
    isOpen: isOpenDelete, 
    onOpen: onOpenDelete, 
    onClose: onCloseDelete} = useDisclosure();
  const { 
    isOpen: isOpenAr, 
    onOpen: onOpenAr, 
    onClose: onCloseAr} = useDisclosure();
    const { 
      isOpen: isOpenUn, 
      onOpen: onOpenUn, 
      onClose: onCloseUn} = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null)
  const dispatch = useAppDispatch();
  const dataAlert = useSelector(alertSelector)
  const taskName = dataAlert.task.name
  const taskId = dataAlert.task.id
  // const id = taskId
  const handleDeleteTask = () => {
    dispatch(deleteTask(taskId))
    onCloseDelete()
  }
  const handleArchive = () => {
    dispatch(archiveTask(taskId))
    onCloseAr()
  }
  const handleDeArchive = () => {
    dispatch(deArchiveTask({ id: taskId }))
    onCloseUn()
  }
  const otherTask = tasks?.filter((task) => task.type === 1)
  const Row = ({ index, key, style }: any) => (
    <div>
    <div key={key} style={style} className="post">
      <>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            key={key}
          >
            <Button
              colorScheme="blue"
              size="sm"
              onClick={() => handleClickEdit(otherTask![index])}
            >
              Edit
            </Button>
            <Text bg='none' mr='auto' ml='10px'>
              {otherTask![index].name}
            </Text>
            <Box>
              {otherTask![index].isDeleted ? (
                <Button
                  colorScheme="orange"
                  size="sm"
                  onClick={() => {
                    dispatch(storeId(otherTask![index]))
                    onOpenUn()
                  }}
                >
                  Unarchive
                </Button>
              ) : (
                <Button
                  colorScheme="orange"
                  size="sm"
                  onClick={() => {
                    dispatch(storeId(otherTask![index]))
                    onOpenAr()
                  }}
                >
                  Archive
                </Button>
              )}

              <Button
                colorScheme="red"
                size="sm"
                ml={2}
                isDisabled={!otherTask![index].isDeleted}
                onClick={() => {
                  dispatch(storeId(otherTask![index]))
                  onOpenDelete()
                }}
              >
                Delete
              </Button>
            </Box>
          </Flex>
          <Divider mt={2} mb={2} />
        </>
    </div>
    </div>
 )
  return (
    <Box height='550px'>
      <Heading fontSize={30} my={5}>
        Other Tasks ({tasks?.filter((task) => task.type === 1).length})
      </Heading>

      <AutoSizer>
        {({height, width}: any) => (
          <List
            height={500}
            width={width}
            itemCount={otherTask?.length}
            itemSize={50}
          >
            {Row}
          </List>
        )}
      </AutoSizer>
      <Box maxHeight='60vh' overflowY="scroll">
      {/* {tasks
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
                    onClick={() => {
                      dispatch(storeId(task))
                      onOpenUn()
                    }}
                  >
                    Unarchive
                  </Button>
                ) : (
                  <Button
                    colorScheme="orange"
                    size="sm"
                    onClick={() => {
                      dispatch(storeId(task))
                      onOpenAr()
                    }}
                  >
                    Archive
                  </Button>
                )}
                <Button
                  colorScheme="red"
                  size="sm"
                  ml={2}
                  isDisabled={!task.isDeleted}
                  onClick={() => {
                    dispatch(storeId(task))
                    onOpenDelete()
                  }}
                >
                  Delete
                </Button>
              </Box>
            </Flex>
            <Divider mt={2} mb={2} />
          </>
        ))} */}
        </Box>
        {/* --------------ALERT DIALOG---------------- */}
        <AlertDialog
          motionPreset='slideInBottom'
          isOpen={isOpenDelete}
          leastDestructiveRef={cancelRef}
          onClose={onCloseDelete}
        >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold' display='flex'>
              Delete Task: 
              <Text pl='5' fontStyle='italic'>{taskName}</Text>
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDelete}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDeleteTask} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
        </AlertDialog>
        
        <AlertDialog
          motionPreset='slideInBottom'
          isOpen={isOpenAr}
          leastDestructiveRef={cancelRef}
          onClose={onCloseAr}
        >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold' display='flex'>
              Archive Task: 
              <Text pl='5' fontStyle='italic'>{taskName}</Text>
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseAr}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleArchive} ml={3}>
                Archive
              </Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
        </AlertDialog> 

        <AlertDialog
          motionPreset='slideInBottom'
          isOpen={isOpenUn}
          leastDestructiveRef={cancelRef}
          onClose={onCloseUn}
        >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold' display='flex'>
              Archive Task: 
              <Text pl='5' fontStyle='italic'>{taskName}</Text>
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseUn}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDeArchive} ml={3}>
                Unarchive
              </Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
        </AlertDialog> 
    </Box>
  );
}
