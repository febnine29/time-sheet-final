import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { newTask } from "../../features/TaskSlice";
import { Task } from "../../type/Task";

export interface EditTaskProps {
  onClose: () => void;
}

export default function EditTask({ onClose }: EditTaskProps) {
  const dispatch = useAppDispatch();
  const [dataNewTask, setDataNewTask] = useState<Partial<Task>>({
    name: "",
    type: 0,
    isDeleted: false,
  });
  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(newTask(dataNewTask));
    onClose();
  };

  return (
    <Box>
      <form onSubmit={(e) => handleSubmitEdit(e)}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={dataNewTask.name}
            onChange={(e) =>
              setDataNewTask({
                ...dataNewTask,
                [e.target.name]: e.target.value,
              })
            }
          />
          <FormLabel>Task Type</FormLabel>
          <Select
            onChange={(e) => {
              setDataNewTask({ ...dataNewTask, type: +e.target.value });
            }}
          >
            <option selected={dataNewTask?.type! === 0} value={0}>
              Common Task
            </option>
            <option selected={dataNewTask?.type! === 1} value={1}>
              Other Task
            </option>
          </Select>
          <Button colorScheme="blue" mt={2} type="submit">
            Save
          </Button>
          
        </FormControl>
      </form>
    </Box>
  );
}
