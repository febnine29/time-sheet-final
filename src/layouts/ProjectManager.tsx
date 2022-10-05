import { Menu, MenuItem, MenuButton } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import dayjs from 'dayjs'
import ReactDOM from 'react-dom';
import * as Feather from "react-feather"
import { Spinner } from "@chakra-ui/spinner";
import { 
  Box, Button, AlertDialog, AlertDialogOverlay, AlertDialogContent,AlertDialogBody,AlertDialogHeader, AlertDialogFooter, useToast,useDisclosure,Select,Input,Flex, Text
} from "@chakra-ui/react";
import React, { useEffect, useState, useMemo, useRef } from "react";
import axios from 'axios';
import {useSelector} from 'react-redux'
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  deActiveProject,
  deleteProject,
  getAllProject,
  projectSelector,
  setMess,
} from "../features/ProjectSlice";
import { deleteProjectApi } from '../api/projectapi';
import {addId, idSelector} from "../features/StoreId"
import { transformProject } from "../configs/transformProject";
import { Heading } from "@chakra-ui/layout";
import SingleProject from "../components/Project/SingleProject";
import { Code as CodeIcon, Plus,Eye, Edit, X, Check, Trash2 } from "react-feather";
import { Icon,ChevronDownIcon } from "@chakra-ui/icons";
import { DataSingleProject } from "../type/Project";
import Modal from "../components/Common/Modal";
import SaveProject from "../components/Project/NewProject";
import EditProject from "../components/Project/EditProject";
import FilterProject from "../components/Project/FilterProject";
import useDebounce from "../customHooks/useDebounce";
export interface ProjectManagerProps {}

export default function ProjectManager(props: ProjectManagerProps) {
  //Chakraui
  const toast = useToast()
  const {
    isOpen: isOpenNewProject,
    onOpen: onOpenNewProject,
    onClose: onCloseNewProject,
  } = useDisclosure();
  const {
    isOpen: isOpenEditProject,
    onOpen: onOpenEditProject,
    onClose: onCloseEditProject,
  } = useDisclosure();
  //Redux
  const dispatch = useAppDispatch();
  const { projectLoading, projects, message } = useAppSelector(projectSelector);
  // React Hook
  
  const [projectCheck, setProjectCheck] = useState<DataSingleProject[] | []>([]);
  const [currentProject, setCurrentProject] = useState<null | number>(null);
  // console.log('currentProject', projectCheck)
  const [currentStatusFilter, setCurrentStatusFilter] = useState("");
  const [inputFilter, setInputFilter] = useState("");
  // handle Action
  const handleClickDeactive = () => {
    dispatch(deActiveProject(projectCheck));
    setProjectCheck([]);
  };
  //
  if (message.mess) {
    console.log("oke set toast");
    toast({
      title: message.mess,
      status: message.type,
      isClosable: true,
      duration: 3000,
      position: "bottom-right",
    });
    dispatch(setMess({ mess: "", type: "success" }));
  }
  // Filter project
  const valueDebounce = useDebounce<string>(inputFilter, 700);
  useEffect(() => {
    dispatch(
      getAllProject({ status: currentStatusFilter, search: valueDebounce })
    );
  }, [valueDebounce]);

  const handleOnchangeOptionFilter = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setCurrentStatusFilter(e.target.value);
    console.log('current status', currentStatusFilter, 'etarget', e.target.value)
    if (!e.target.value) {
      dispatch(getAllProject({ status: "", search: inputFilter }));
    } else {
      dispatch(getAllProject({ status: e.target.value, search: inputFilter }));
    }
  };
  const handleOnChangeInputFilter = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setInputFilter(e.target.value);
  };
  // console.log('current status after', currentStatusFilter, 'etarget after', e.target.value)
  
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
  const [openPop, setOpenPop] = useState(false)
  const styleButton = {
    width: '80px', 
    display: 'flex', 
    justifyContent: 'center',
    alignItems: 'center',
    background: 'white',
    padding: '5px 0px',
    borderRadius: '5px',
    border: '1px solid lightgray',
  }
  const styleText = {
    borderRadius: '5px',
    color: 'white'
  }
  return (
    <Box p={5} width="100%" maxW="1200px" m="0 auto">
      <Modal
        isOpen={isOpenNewProject}
        onOpen={onOpenNewProject}
        onClose={onCloseNewProject}
        component={
          <SaveProject TYPE_SAVE="ADD_PROJECT" onClose={onCloseNewProject} />
        }
        title="Create Project"
      />
      {/* <PopPop open={openPop}>

      </PopPop> */}
      <Modal
        isOpen={isOpenEditProject}
        onOpen={onOpenEditProject}
        onClose={onCloseEditProject}
        component={
          <EditProject
            onClose={onCloseEditProject}
            currentProject={currentProject}
          />
        }
        title="Edit Project"
      />
      <Box mb={5} display='flex' justifyContent='center'>
        <Button
          leftIcon={<Plus />}
          colorScheme="green"
          onClick={onOpenNewProject}
        >
          Create New Project
        </Button>
      </Box>
      <FilterProject
        handleOnchangeOptionFilter={handleOnchangeOptionFilter}
        currentStatusFilter={currentStatusFilter}
        handleOnChangeInputFilter={handleOnChangeInputFilter}
        inputFilter={inputFilter}
      />
      {projectLoading && <Spinner thickness='4px'
                                  speed='0.65s'
                                  emptyColor='gray.200'
                                  color='red.500'
                                  size='lg'/>}

      {transformProject(projects)?.map((item, index) => {
        return (
          <Box key={index} mt={2}>
            <Box
              fontSize="20px"
              fontWeight="bold"
              color="white"
              backgroundColor="red.400"
              p={2}
              borderTopLeftRadius={5}
              borderTopRightRadius={5}
            >
              {item.customerName.toUpperCase()}
            </Box>
            <Box
              backgroundColor="red.50"
              borderBottomLeftRadius={5}
              borderBottomRightRadius={5}
            >
              {/* {item.data.map((data, index) => {
                <SingleProject
                  key={data.id}
                  dataProject={data}
                  setProjectCheck={setProjectCheck}
                  projectCheck={projectCheck}
                  isOpenEditProject={isOpenEditProject}
                  onOpenEditProject={onOpenEditProject}
                  currentProject={currentProject}
                  setCurrentProject={setCurrentProject}
              />
              })} */}
              
                {item.data.map((data, index) => (
                  <Flex key={data.id} alignItems="center" py={1} pr={2} borderBottom='1px solid #dddbdb'>
                    <Box>
                      <Text pl={2} fontWeight='bold' color='gray'>{data.name}</Text>
                    </Box>
                    <Box display='flex' flexWrap='wrap'>
                      <span style={{background: '#2E95EA', color: 'white', borderRadius: '10px', padding: '0px 5px', fontSize: '14px', marginLeft: '5px'}}>{data.pms.join(', ')}</span>
                      <span style={{background: 'red', color: 'white', borderRadius: '10px', padding: '0px 5px', fontSize: '14px', marginLeft: '5px'}}>{data.activeMember} members</span>
                      <span style={{background: '#4CAF50', color: 'white', borderRadius: '10px', padding: '0px 5px', fontSize: '14px', marginLeft: '5px'}}><span style={{padding: '0px', margin: '0'}}>{dayjs(data.timeStart).format('DD/MM/YYYY')}</span> {data.timeEnd ? <span style={{padding: '0px', margin: '0'}}>- {dayjs(data.timeEnd).format('DD/MM/YYYY')}</span>:""}</span>
                      
                      
                    </Box>

                    <Box ml='auto' display='flex' alignItems='center'> 
                      <span className='active-status' style={{marginLeft: 'auto',color: 'white', borderRadius: '10px', padding: '0px 55', fontSize: '14px',}}>{data.status  ? <span style={{background: 'grey',color: 'white', borderRadius: '10px', padding: '0px 5px', fontSize: '14px', paddingBottom: '3px'}}>InActive</span> 
                                          : <span style={{background: '#4CAF50',color: 'white', borderRadius: '10px', padding: '0px 5px', fontSize: '14px', paddingBottom: '3px'}}>Active</span>}</span>
                      <Menu menuButton={<MenuButton style={styleButton}>
                          Action <Feather.ChevronDown size={20} />
                          </MenuButton>} transition>
                        <MenuItem style={{marginBottom: '10px'}}>
                          <Feather.Eye size={20} style={{marginRight: '15px'}}/>
                          View
                        </MenuItem>
                        <MenuItem  style={{marginBottom: '10px'}}
                              onClick={() => {
                                setCurrentProject(data.id);
                                onOpenEditProject();
                              }}
                        >
                          <Feather.Edit size={20} style={{marginRight: '15px'}}/>
                          Edit
                        </MenuItem>
                        <MenuItem 
                          style={{marginBottom: '10px'}}
                          onClick={() => {
                            dispatch(addId(data));
                            onOpenDel()
                          }}
                        >
                          <Feather.Trash2 size={20} style={{marginRight: '15px'}}/>
                          Delete
                        </MenuItem>
                      </Menu>
                      {/* <Menu>
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
                              // setCurrentProject(data.id);
                              // onOpenEditProject();
                            }}
                          >
                            Edit
                          </MenuItem>
                          <MenuItem icon={data.status ? <Icon h={5} w={5} as={X}/> : <Icon h={5} w={5} as={Check} />}>
                            Active
                          </MenuItem>
                          <MenuItem 
                            icon={<Icon h={5} w={5} as={Trash2}/>}
                            onClick={() => {
                              // dispatch(addId(dataProject));
                              // onOpenDel()
                            }}
                          >
                            Delete
                          </MenuItem>
                        </MenuList>
                      </Menu> */}
                      {/* <Button 
                        onClick={() => {
                                setCurrentProject(data.id);
                                onOpenEditProject();
                              }}
                      
                      >Edit</Button> */}
                    </Box>
                  </Flex>
                  // <SingleProject
                  //   key={index}
                  //   dataProject={data}
                  //   setProjectCheck={setProjectCheck}
                  //   projectCheck={projectCheck}
                  //   isOpenEditProject={isOpenEditProject}
                  //   onOpenEditProject={onOpenEditProject}
                  //   currentProject={currentProject}
                  //   setCurrentProject={setCurrentProject}
                  // />
                  
                ))}
            </Box>
          </Box>
        );
      })}
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
    </Box>
  );
}
