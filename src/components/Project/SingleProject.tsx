import {
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,Button,Checkbox,Code,
  Flex,Table,Tbody,Td,Th,Thead,Tr,
  Text,Heading,AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  useDisclosure,useToast,
  Select,Show, Menu, MenuButton, MenuItem, MenuList
} from "@chakra-ui/react";
import {ChevronDownIcon, Icon} from '@chakra-ui/icons';
import {Eye, Edit, X, Check, Trash2 } from 'react-feather'
import axios from "axios";
import React, { useState } from "react";
import {useDispatch, useSelector} from "react-redux"
import { formatDay } from "../../configs/formatDay";
import { transFormCheckProjects } from "../../configs/transformcheckProject";
import type { DataSingleProject } from "../../type/Project";
import { deleteProject, setMess } from "../../features/ProjectSlice";
import {addId, idSelector} from "../../features/StoreId"
import {useRef} from 'react';
import { deleteProjectApi } from "../../api/projectapi";
export interface SingleProjectProps {
  dataProject: DataSingleProject;
  setProjectCheck: (params: DataSingleProject[]) => void;
  projectCheck: DataSingleProject[] | [];
  isOpenEditProject: boolean;
  onOpenEditProject: () => void;
  currentProject: null | number;
  setCurrentProject: (params: number) => void;
}

export default function SingleProject({
  dataProject,
  setProjectCheck,
  projectCheck,
  isOpenEditProject,
  onOpenEditProject,
  currentProject,
  setCurrentProject,
}: SingleProjectProps) {
  const dispatch = useDispatch()
  const toast = useToast()
  const { 
    isOpen: isOpenDel, 
    onOpen: onOpenDel, 
    onClose: onCloseDel} = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null)
  const getId = useSelector(idSelector)
  const handleDelete = () => {
    axios.delete(`${deleteProjectApi}?Id=${getId.pId.id}`)
    .then(response => {
      toast({
          title: `Delete Project ${getId.pId.name} Success`,
          status: 'success',
          position: 'bottom-right',
          duration: 2000,
          isClosable: true,
      })
    })
    .catch( error => {
      toast({
        title: `Delete Project ${getId.pId.name} Failed`,
          status: 'error',
          position: 'bottom-right',
          duration: 2000,
          isClosable: true,
      })
    })
    onCloseDel()
  }
  const [show, setShow] =useState(false)
  // const handleDropDown = () => {
  //   setShow(true)
  // }
  return (
    <Flex alignItems="center" py={1} pr={2} borderBottom='1px solid #dddbdb'>
      <Box>
        <Text pl={2} fontWeight='bold' color='gray'>{dataProject.name}</Text>
      </Box>
      <Box ml='auto'>
      <Menu>
        <MenuButton as={Button} rightIcon={<ChevronDownIcon />} _focus={{boxShadow: 'none'}} bg='#f7f7f7' boxShadow='rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;'>
          Actions
        </MenuButton>
        <MenuList w='100px'>
          <MenuItem icon={<Icon h={5} w={5} as={Eye}/>}>
            View
          </MenuItem>
          <MenuItem 
            icon={<Icon h={5} w={5} as={Edit}/>}
            onClick={() => {
              setCurrentProject(dataProject.id);
              onOpenEditProject();
            }}
          >
            Edit
          </MenuItem>
          <MenuItem icon={dataProject.status ? <Icon h={5} w={5} as={X}/> : <Icon h={5} w={5} as={Check} />}>
            Active
          </MenuItem>
          <MenuItem 
            icon={<Icon h={5} w={5} as={Trash2}/>}
            onClick={() => {
              dispatch(addId(dataProject));
              onOpenDel()
            }}
          >
            Delete
          </MenuItem>
        </MenuList>
      </Menu></Box>
      {/* <AccordionItem flex={1} >
        <h2>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Flex justify="space-between">
                <Button variant="link">{dataProject.name}</Button>
                {dataProject.status === 0 && (
                  <Code colorScheme="green" sx={{borderRadius: '20px', padding: '0px  10px'}}>Active</Code>
                )}
                {dataProject.status === 1 && (
                  <Code colorScheme="gray" sx={{borderRadius: '20px', padding: '0px  10px'}}>DeActive</Code>
                )}
              </Flex>
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4} backgroundColor="green.100">
          <Table variant="simple" textAlign="center">
            <Thead>
              <Tr>
                <Th>Pms</Th>
                <Th>Total Member</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                <Td>
                  {dataProject.pms.map((pm, index) => (
                    <Text key={index} colorScheme="red">{`${pm},`}</Text>
                  ))}
                </Td>
                <Td>{dataProject.activeMember}</Td>
                <Td>{`${formatDay(dataProject.timeStart)}-${formatDay(
                  dataProject.timeEnd
                )}`}</Td>
              </Tr>
            </Tbody>
          </Table>
          <Box mt="10px" pl="20px">
            {/* <Button colorScheme="blue" size="sm" mr={2}>
              View
            </Button> */}
            {/* <Button
              colorScheme="blue"
              size="sm"
              mr={2}
              onClick={() => {
                setCurrentProject(dataProject.id);
                onOpenEditProject();
              }}
            >
              Edit
            </Button>
            <Button
              colorScheme="red"
              size="sm"
              onClick={() => {
                dispatch(addId(dataProject));
                onOpenDel()
              }}
            >
              Delete
            </Button>
          </Box>
        </AccordionPanel>
      </AccordionItem> */} 
      
      <AlertDialog
          motionPreset='slideInBottom'
          isOpen={isOpenDel}
          leastDestructiveRef={cancelRef}
          onClose={onCloseDel}
        >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold' display='flex'>
              Delete Project: <Text pl='4' pr='2' fontStyle='italic'>{getId.pId.name}</Text>?
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onCloseDel}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialogOverlay>
        </AlertDialog>
    </Flex>
    
  );
}
