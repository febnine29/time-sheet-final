import {
  Box,
  Button,
  Flex,
  Spinner,
  useDisclosure,
  useToast,AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Plus } from "react-feather";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useSelector } from "react-redux";
import CommonTask from "../components/Task/CommonTask";
import EditTask from "../components/Task/EditTask";
import Modal from "../components/Common/Modal";
import OtherTask from "../components/Task/OtherTask";
import { setMess, taskSelector, getAllTask } from "../features/TaskSlice";
import { Task } from "../type/Task";
import NewTask from "../components/Task/NewTask";
import { themeSelector } from "../features/StoreId";

export interface TaskManagerProps {}

export default function TaskManager(props: TaskManagerProps) {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { tasks, taskLoading, message } = useAppSelector(taskSelector);
  useEffect(() => {
    dispatch(getAllTask());
  }, []);
  const [taskEdit, setTaskEdit] = useState<Task | null>(null);

  // Modal
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
  } = useDisclosure();
  const {
    isOpen: isOpenAdd,
    onOpen: onOpenAdd,
    onClose: onCloseAdd,
  } = useDisclosure();
  const handleClickEdit = (task: Task) => {
    setTaskEdit(task);
    onOpenEdit();
  };
  const {themeColor} = useSelector(themeSelector)

  if (message.mess) {
    console.log("oke set toast");
    toast({
      title: message.mess,
      status: message.type,
      isClosable: true,
      duration: 2000,
      position: "bottom-right",
    });
    dispatch(setMess({ mess: "", type: "success" }));
  }
  if (taskLoading) return <Spinner thickness='4px'
                                    speed='0.65s'
                                    emptyColor='gray.200'
                                    color='red.500'
                                    size='lg'/>;

  return (
    <Box width="100%" maxW="1200px" mr='1rem'>
      <Modal
        title="Edit Task"
        isOpen={isOpenEdit}
        onClose={onCloseEdit}
        onOpen={onOpenEdit}
        component={<EditTask taskEdit={taskEdit} onClose={onCloseEdit} />}
      />
      <Modal
        title="Add New Task"
        isOpen={isOpenAdd}
        onClose={onCloseAdd}
        onOpen={onOpenAdd}
        component={<NewTask onClose={onCloseAdd} />}
      />
      <Box>
        <Flex justifyContent="space-around" alignItems="center" mt={5}>
          <Button 
            leftIcon={<Plus />}
            bgColor={themeColor ? themeColor : 'blue.400'}
            color='white'
            onClick={onOpenAdd}
          >
            New Task
          </Button>
        </Flex>
      </Box>
      <CommonTask handleClickEdit={handleClickEdit} tasks={tasks} />
      <OtherTask handleClickEdit={handleClickEdit} tasks={tasks} />
      
    </Box>
  );
}
