import { Button } from "@chakra-ui/button";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
import { Box } from "@chakra-ui/layout";
import { Select } from "@chakra-ui/select";
import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { editTask } from "../../features/TaskSlice";
import { Task } from "../../type/Task";

export interface EditTaskProps {
  taskEdit: Task | null;
  onClose: () => void;
}

export default function EditTask({ taskEdit, onClose }: EditTaskProps) {
  const dispatch = useAppDispatch();
  const [dataEdit, setDataEdit] = useState<Task>({
    id: taskEdit?.id!,
    name: taskEdit?.name!,
    type: taskEdit?.type!,
    isDeleted: taskEdit?.isDeleted!,
  });
  const handleSubmitEdit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(editTask(dataEdit));
    onClose();
    console.log('data edit', dataEdit)
  };

  return (
    <Box>
      <form onSubmit={(e) => handleSubmitEdit(e)}>
        <FormControl>
          <FormLabel>Name</FormLabel>
          <Input
            name="name"
            value={dataEdit.name}
            onChange={(e) =>
              setDataEdit({ ...dataEdit, [e.target.name]: e.target.value })
            }
          />
          <FormLabel>Task Type</FormLabel>
          <Select
            onChange={(e) => {
              setDataEdit({ ...dataEdit, type: +e.target.value });
            }}
          >
            <option selected={taskEdit?.type! === 0} value={0}>
              Common Task
            </option>
            <option selected={taskEdit?.type! === 1} value={1}>
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
