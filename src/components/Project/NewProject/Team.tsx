import { Avatar } from "@chakra-ui/avatar";
import { Box, Divider } from "@chakra-ui/layout";
import { Code, Flex, Icon, Input, Select, Text, IconButton,Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import axios from 'axios';
import {url} from '../../../api/index'
import { Minus, Plus,X } from "react-feather";
import { RepeatIcon } from "@chakra-ui/icons";
import {useDispatch, useSelector} from 'react-redux'
import { FieldValues, UseFormRegister, UseFormSetValue } from "react-hook-form";
import {
  checkBranch,
  checkLevel,
  checkTypeUser,
  dataBranch,
  dataLevel,
  dataTypeUser,
} from "../../../configs/data";
import { filterUser } from "../../../configs/filterUser";
import {
  deleteArrInArrById,
  deleteArrRemoveUserForm,
  getObjectById,
  mergeObjectById,
  mergeObjectUserForm,
} from "../../../configs/transformUser";
import { PayloadNewProject, UserFormNewProject } from "../../../type/Project";
import { UserNotPagging } from "../../../type/User";
import { userSelector } from "../../../features/StoreId";
import { taskSelector } from "../../../features/TaskSlice";
// import {getUser} from '../../../features/TaskSlice'
export interface TeamProps {
  users: UserNotPagging[] | null;
  setUsers: (params: UserNotPagging[]) => void;
  // handleGetTeams: (user: UserNotPagging[]) => void;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<Partial<PayloadNewProject>>;
  userDefaultValues?: UserFormNewProject[];
}
interface DataFilterUser {
  branch: {
    index: number;
  };
  type: {
    index: number;
  };
  level: {
    index: number;
  };
  name: {
    nameString: string;
  };
}
function Team({
  users,
  setUsers,
  register,
  setValue,
  userDefaultValues,
}: TeamProps) {
  const dispatch = useDispatch()
  const [userCheck, setUserCheck] = useState<UserNotPagging[] | null>(null);
  const [userForm, setUserForm] = useState<UserFormNewProject[] | null>(null);
  const [flagUserCheck, setFlagUserCheck] = useState({});
  const [dataFilter, setDataFilter] = useState<DataFilterUser>({
    branch: { index: -1 },
    type: { index: -1 },
    level: { index: -1 },
    name: { nameString: "" },
  });
  // -1 if default check All
  const handleClickAdd = (item: UserNotPagging) => {
    //handle check userCheck
    if (!userCheck) {
      setUserCheck([item]);
      setFlagUserCheck({});
    } else {
      setUserCheck([...userCheck, item]);
      setFlagUserCheck({});
    }
    //handle check userForm
    if (!userForm) {
      setUserForm([{ userId: item.id, type: 1 }]);
    } else {
      setUserForm([...userForm!, { userId: item.id, type: 0 }]);
    }
  };
  const handleClickRemove = (item: UserNotPagging) => {
    //handle remove userCheck
    setUserCheck(deleteArrInArrById(userCheck as UserNotPagging[], [item])!);
    setUsers([...(users as UserNotPagging[]), item]);
    //handle remove userForm
    setUserForm(
      deleteArrRemoveUserForm(userForm as UserFormNewProject[])(item.id)
    );
  };
  useEffect(() => {
    if (userCheck) {
      setUsers(deleteArrInArrById(users as UserNotPagging[], userCheck)!);
    }
  }, [flagUserCheck, userCheck]);

  useEffect(() => {
    setValue("users", userForm as UserFormNewProject[]);
  }, [userForm]);

  useEffect(() => {
    if (userDefaultValues) {
      setUserForm(userDefaultValues);
      setUserCheck(getObjectById(userDefaultValues!)(users!)!);
      setFlagUserCheck({});
    }
  }, [userDefaultValues]);

  const handleChangeOffice = (
    e: React.ChangeEvent<HTMLSelectElement>,
    userId: number
  ) => {
    setUserForm(
      mergeObjectUserForm(userForm!)({ userId, type: +e.target.value })
    );
  };

  const [render, setRender] = useState(false)
  const handleRenderMembers = () => {
    setRender(true)
  }
  return (
    
    <Box maxH="500px" overflowY="scroll">
      <Box mb={2} fontWeight="bold">
        Selected Team Members
      </Box>
      <Box>
        {mergeObjectById(userCheck!)(userForm!)?.map((item, index) => (
          <Flex key={index} align="center" mb={2}>
            <Flex
              boxSize="30px"
              bgColor="transparent"
              borderRadius="50%"
              align="center"
              justify="center"
              // mr={2}
              cursor="pointer"
              onClick={() => handleClickRemove(item)}
            >
              <Icon w={6} h={6} color="red"
                as={X}
              />
            </Flex>
            <Box mx={2}>
              <Text mr={2}>{item.name}</Text>
              <Box display='flex'>
              <Text backgroundColor="red.200" mr={1} px={2} borderRadius='20px'>
                {checkLevel(item.level)}
              </Text>
              <Text backgroundColor="yellow.200" mr={1} px={2} borderRadius='20px'>
                {checkBranch(item.branch)}
              </Text>
              <Text backgroundColor="green.200" mr={1} px={2} borderRadius='20px'>
                {checkTypeUser(item.type)}
              </Text>
            </Box>
            </Box>
            <Select w="150px" onChange={(e) => handleChangeOffice(e, item.id)}>
              <option value={0} selected={item.typeOffice === 0}>
                Member
              </option>
              <option value={1} selected={item.typeOffice === 1}>
                Project Manager
              </option>
              <option value={2} selected={item.typeOffice === 2}>
                Shadow
              </option>
              <option value={3} selected={item.typeOffice === 3}>
                Deactive
              </option>
            </Select>
          </Flex>
        ))}
      </Box>
      <Divider mb={2} />
      <Box>
        <Box mb={2} fontWeight="bold">
          Members List
        </Box>
        <Flex mb={2}>
          <Box mr={2}>
            <Text fontWeight="bold">
              Branch
            </Text>
            <Select
              variant='flushed'
              onChange={(e) => {
                setDataFilter({
                  ...dataFilter,
                  branch: { index: +e.target.value },
                });
                setRender(true)
              }}
            >
              <option value={-1}>All</option>
              {/* -1 is value null */}
              {dataBranch.map((branch, index) => (
                <option value={branch.branch} key={index}>
                  {branch.name}
                </option>
              ))}
            </Select>
          </Box>
          <Box mr={2}>
            <Text fontWeight="bold">
              Type
            </Text>
            <Select
              variant='flushed'
              onChange={(e) => {
                setDataFilter({
                  ...dataFilter,
                  type: { index: +e.target.value },
                });
                setRender(true)
              }}
            >
              <option value={-1}>All</option>
              {/* -1 is value null */}
              {dataTypeUser.map((data, index) => (
                <option value={data.type} key={index}>
                  {data.name}
                </option>
              ))}
            </Select>
          </Box>
          <Box mr={2}>
            <Text fontWeight="bold">
              Level
            </Text>
            <Select
              variant='flushed'
              onChange={(e) => {
                setDataFilter({
                  ...dataFilter,
                  level: { index: +e.target.value },
                });
                setRender(true)
              }}
            >
              <option value={-1}>All</option>
              {/* -1 is value null */}
              {dataLevel.map((data, index) => (
                <option value={data.level} key={index}>
                  {data.name}
                </option>
              ))}
            </Select>
          </Box>
          <Box mr={2}>
            <Text fontWeight="bold">
              Name
            </Text>
            <Input
              variant='flushed'
              onChange={(e) => {
                setDataFilter({
                  ...dataFilter,
                  name: { nameString: e.target.value },
                });
                setRender(true)
              }}
            ></Input>
          </Box>
        </Flex>
        <Box>
          <Button
            mb={4}
            leftIcon={<RepeatIcon />} 
            colorScheme='teal' 
            variant='solid'
            onClick={() => setRender(true)}
          >
            Show Members
          </Button>
        </Box>
        {render ? filterUser(users)(dataFilter.branch.index)(dataFilter.type.index)(
          dataFilter.level.index
        )(dataFilter.name.nameString)?.map((item, index) => (
          <Flex key={index} align="center" mb={2}>
            <Flex
              boxSize="30px"
              bgColor="transparent"
              borderRadius="50%"
              align="center"
              justify="center"
              mr={2}
              cursor="pointer"
              onClick={() => handleClickAdd(item)}
            >
              <Icon w={6} h={6} color="blue.500"
                as={Plus}
              />
            </Flex>
            <Text mr={2}>{item.name}</Text>
            <Text backgroundColor="red.200" mr={1} px={2} borderRadius='20px'>
              {checkLevel(item.level)}
            </Text>
            <Text backgroundColor="yellow.200" mr={1} px={2} borderRadius='20px'>
              {checkBranch(item.branch)}
            </Text>
            <Text backgroundColor="green.200" mr={1} px={2} borderRadius='20px'>
              {checkTypeUser(item.type)}
            </Text>
          </Flex>
        )) : ''}
      </Box>
    </Box>
  );
}

export default Team;
