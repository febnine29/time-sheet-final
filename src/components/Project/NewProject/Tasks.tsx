import { Box, Checkbox, Flex, Icon, Text, Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import { isRender } from "../../../features/ConfirmRender";
import { Minus, Plus, X } from "react-feather";
import { UseFormSetValue } from "react-hook-form";
import { RepeatIcon } from "@chakra-ui/icons";
import {
  deleteArrInArrById,
  deleteArrRemoveTaskForm,
  getObjectById,
  mergeObjectById,
  mergeObjectTaskForm,
} from "../../../configs/transformTask";
import { PayloadNewProject, TaskFormNewProject } from "../../../type/Project";
import { Task } from "../../../type/Task";
import { getAllTask, taskSelector } from "../../../features/TaskSlice";
export interface TasksProps {
  tasks: Task[] | null;
  setValue: UseFormSetValue<Partial<PayloadNewProject>>;
  taskDefaultValue?: TaskFormNewProject[];
}

function Tasks({ tasks, setValue, taskDefaultValue }: TasksProps) {
  const [tasksCheck, setTasksCheck] = useState<Task[] | null>(null);
  const [taskForm, setTaskForm] = useState<TaskFormNewProject[] | null>(null);
  const [tasksCpn, setTasksCpn] = useState<Task[] | null>(null);
  const [flagTaskCheck, setFlagTaskCheck] = useState({});

  const handleClickAddTask = (task: Task) => {
    // Add taskCheck
    if (tasksCheck) {
      setTasksCheck([...tasksCheck, task]);
      setFlagTaskCheck({});
    } else {
      setTasksCheck([task]);
      setFlagTaskCheck({});
    }
    // add taskForm
    if (!taskForm) {
      setTaskForm([{ taskId: task.id, billable: true }]);
    } else {
      setTaskForm([...taskForm!, { taskId: task.id, billable: true }]);
    };
  };

  const handleClickRemoveTask = (task: Task) => {
    setTasksCheck(deleteArrInArrById(tasksCheck as Task[], [task])!);
    // handle remove taskCpn
    if (tasksCpn) {
      setTasksCpn([...tasksCpn, task]);
    }
    // handle remove taskForm
    setTaskForm(
      deleteArrRemoveTaskForm(taskForm as TaskFormNewProject[])(task.id)
    );
  };
  const handleChangeCheckBox = (
    e: React.ChangeEvent<HTMLInputElement>,
    taskId: number
  ) => {
    setTaskForm(
      mergeObjectTaskForm(taskForm!)({ taskId, billable: e.target.checked })
    );
  };
  useEffect(() => {
    // dispatch(getAllTask())
    setTasksCpn(tasks);
  }, []);
  useEffect(() => {
    if (tasksCpn) {
      setTasksCpn(deleteArrInArrById(tasksCpn, tasksCheck)!);
    }
  }, [flagTaskCheck]);

  useEffect(() => {
    setValue("tasks", taskForm!);
  }, [taskForm]);
  useEffect(() => {
    if (taskDefaultValue) {
      setTaskForm(taskDefaultValue);
      setTasksCheck(getObjectById(taskDefaultValue!)(tasks!));
      setFlagTaskCheck({});
    }
  }, [taskDefaultValue]);
  const dispatch = useDispatch()
  const [renderTask, setRenderTask] = useState(false) 

  return (
    <Box maxH="500px" overflowY="scroll">
      <Flex justify="space-between" borderBottom="1px solid #f2f2f2">
        <Text fontWeight="bold">Tasks</Text>
        <Box></Box>
        <Text fontWeight="bold">Billable</Text>
      </Flex>
      <Box>
        {mergeObjectById(tasksCheck!)(taskForm!)?.map((task, index) => (
          <Flex mt={2} justify="space-between" key={task.id}>
            <Flex
              boxSize="30px"
              bgColor="transparent"
              borderRadius="50%"
              align="center"
              justify="center"
              mr={2}
              cursor="pointer"
              onClick={() => handleClickRemoveTask(task)}
            >
              <Icon w={6} h={6} color="red"
                as={X}
              />
            </Flex>
            <Text mt={1} mr='auto'>{task.name}</Text>

            <Checkbox
              defaultChecked={true}
              mt={2}
              onChange={(e) => handleChangeCheckBox(e, task.id)}
            />
          </Flex>
        ))}
      </Box>
      <Box mt={2}>
        <Text fontWeight="bold">Select task</Text>
        {/* <button onClick={() => setRenderTask(true) } style={{marginBottom: '20px'}}>Show Tasks</button> */}
        {tasksCpn?.map((task) => (
          <Flex mt={2} justify="space-between">
            <Flex
              boxSize="30px"
              bgColor="transparent"
              borderRadius="50%"
              align="center"
              justify="center"
              mr={2}
              cursor="pointer"
              onClick={() => handleClickAddTask(task)}
            >
              <Icon w={6} h={6} color="blue.500"
                as={Plus}
              />
            </Flex>
            <Text mt={1} mr='auto'>{task.name}</Text>
            <Text mt={1}>{task.type === 0 ? "Common Task" : "Other Task"}</Text>
          </Flex>
        )) }

      </Box>
    </Box>
  );
}
export default React.memo(Tasks);
