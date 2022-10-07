import {
  Button,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useToast,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { url } from "../../../api/index";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { useSelector } from "react-redux";
import { projectSelector, saveProject } from "../../../features/ProjectSlice";
import { renderSelector } from "../../../features/ConfirmRender";
import { setMess, taskSelector, getAllTask } from "../../../features/TaskSlice";
import { customerSelector, userSelector } from "../../../features/StoreId";
import type { Customer } from "../../../type/Customer";
import type { PayloadNewProject } from "../../../type/Project";
import type { UserNotPagging } from "../../../type/User";
import General from "./General";
import Tasks from "./Tasks";
import Team from "./Team";
// import DatePicker from "react-datepicker";
type SaveProjectType = "ADD_PROJECT" | "EDIT_PROJECT";
export interface SaveProjectProps {
  TYPE_SAVE: SaveProjectType;
  onClose: () => void;
  defaultValues?: PayloadNewProject;
}

function SaveProject({ TYPE_SAVE, onClose, defaultValues }: SaveProjectProps) {
  //Hook ChakraUi
  const toast = useToast();
  //Redux
  const dispatch = useAppDispatch();
  const { message } = useAppSelector(projectSelector);
  const { tasks } = useAppSelector(taskSelector);
  //
  const [customer, setCustomer] = useState<Customer[] | null>(null);
  const [users, setUsers] = useState<UserNotPagging[] | null>(null);

  const schema = yup
    .object({
      name: yup.string().min(1).max(50).required(),
      code: yup.string().min(1).max(50).required(),
      timeStart: yup.date().required(),
      timeEnd: yup.date().required(),
      note: yup.string().required(),
      tasks: yup.array().required(),
      users: yup.array().required(),
    })
    .required();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    getValues,
    control,
  } = useForm<PayloadNewProject>({
      defaultValues: defaultValues || {
      projectTargetUsers: [],
      isAllUserBelongTo: false,
      customerId: customer?.[0].id,
    },
    resolver: yupResolver(schema),
  });

  // handle funtion onSubmit by type Save
  const onSubmit = handleSubmit((data) => {
    dispatch(saveProject(data));
    console.log('data project',data)
    onClose();
  });

  // Show toast error
  const showErrorIndexOne = (errors: any) => {
    const errorIndexOne = errors[Object.keys(errors)[0] as keyof typeof errors];
    if (!Array.isArray(errorIndexOne)) {
      return errorIndexOne?.message;
    }

    return null;
  };
  useEffect(() => {
    if (errors[Object.keys(errors)[0] as keyof typeof errors]) {
      if (showErrorIndexOne(errors)) {
        toast({
          title: showErrorIndexOne(errors),
          status: "error",
          isClosable: true,
          duration: 2000,
          position: "bottom-right",
        });
      }
    }
  }, [errors]);

  if (message.mess) {
    toast({
      title: message.mess,
      status: message.type,
      isClosable: true,
      duration: 2000,
      position: "bottom-right",
    });
    dispatch(setMess({ mess: "", type: "success" }));
  }

  const getCustomers = useSelector(customerSelector)
  const getUsers = useSelector(userSelector)
  useEffect(() => {
    setCustomer(getCustomers.customers)
    setUsers(getUsers.users)
  }, []);

  return (
    <Tabs>
      <form onSubmit={onSubmit}>
        <TabList>
          <Tab>General</Tab>
          <Tab>Team</Tab>
          <Tab>Tasks</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <General
              customer={customer}
              register={register}
              setValue={setValue}
              control={control}
            />
          </TabPanel>
          <TabPanel>
            {users && (
              <Team
                users={users}
                setUsers={setUsers}
                register={register}
                setValue={setValue}
                userDefaultValues={defaultValues?.users}
              />
             )} 
          </TabPanel>
          <TabPanel>
            {tasks && (
              <Tasks
                tasks={tasks}
                setValue={setValue}
                taskDefaultValue={defaultValues?.tasks}
              />
            )}
          </TabPanel>
        </TabPanels>
        <Button colorScheme="blue" type="submit">
          Save
        </Button>
      </form>
    </Tabs>
  );
}
export default SaveProject;
