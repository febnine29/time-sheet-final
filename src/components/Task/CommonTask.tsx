import {Box, Button, Code, Divider, Flex, Heading, Text,

  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import {useRef, useState, useEffect} from 'react';
import { useAppDispatch } from "../../app/hooks";
import { ViewportList } from 'react-viewport-list';
import { FixedSizeList as List } from "react-window";
import AutoSizer from 'react-virtualized-auto-sizer'
import {
  archiveTask,
  deArchiveTask,
  deleteTask,
} from "../../features/TaskSlice";
import { Task } from "../../type/Task";
import {useSelector, useDispatch} from 'react-redux';
import { alertSelector, storeId, clearAlertData } from "../../features/AlertReducer";
export interface CommonTaskProps {
  tasks: Task[] | null;
  handleClickEdit: (tasks: Task) => void;
}

export default function CommonTask({tasks, handleClickEdit}: CommonTaskProps) {
  const ref = useRef<HTMLDivElement | null>(
    null,
  );
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

  const [taskList, setTaskList] = useState<Task[] | undefined>(undefined)
  useEffect(() => {
    setTaskList(tasks!)
  })
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
  const commonTask = taskList?.filter((task) => task.type === 0)
  // console.log('commontask',commonTask)
  const Row = ({ index, key, style }: any) => (
      <div>
      <div key={key} style={style} className="post">
        {/* <h3>{`${tasks![index].name}-${tasks![index].id}`}</h3> */}
        <>
            <Flex
              justifyContent="space-between"
              alignItems="center"
              key={key}
            >
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => handleClickEdit(commonTask![index])}
              >
                Edit
              </Button>
              <Text bg='none' mr='auto' ml='10px'>
                {commonTask![index].name}
              </Text>
              <Box>
                {commonTask![index].isDeleted ? (
                  <Button
                    colorScheme="orange"
                    size="sm"
                    onClick={() => {
                      dispatch(storeId(commonTask![index]))
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
                      dispatch(storeId(commonTask![index]))
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
                  isDisabled={!commonTask![index].isDeleted}
                  onClick={() => {
                    dispatch(storeId(commonTask![index]))
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
        Common Tasks ({tasks?.filter((task) => task.type === 0).length})
      </Heading>
      <AutoSizer>
        {({height, width}: any) => (
          <List
          height={500}
          width={width}
          itemCount={commonTask?.length}
          itemSize={50}
        >
          {Row}
        </List>
        )}
      </AutoSizer>
      
      <Box maxHeight='60vh' overflowY="scroll" ref={ref}>
      {/* <ViewportList
        viewportRef={ref}
        items={commonTask}
      >
        {(task) => (
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
            <Text bg='none' mr='auto' ml='10px'>
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
        )}
      </ViewportList> */}
    


      {/* {taskList
        ?.filter((task) => task.type === 0)
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
              <Text bg='none' mr='auto' ml='10px'>
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
