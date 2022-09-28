import { Spinner } from "@chakra-ui/spinner";
import {
  Accordion,
  Box,
  Button,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useToast,
  useDisclosure,
  Select,
  Input,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  deActiveProject,
  deleteProject,
  getAllProject,
  projectSelector,
  setMess,
} from "../features/ProjectSlice";

import { transformProject } from "../configs/transformProject";
import { Heading } from "@chakra-ui/layout";
import SingleProject from "../components/Project/SingleProject";
import { Code as CodeIcon, Plus } from "react-feather";
import { DataSingleProject } from "../type/Project";
import Modal from "../components/Common/Modal";
import SaveProject from "../components/Project/NewProject";
import EditProject from "../components/Project/EditProject";
import FilterProject from "../components/Project/FilterProject";
import useDebounce from "../customHooks/useDebounce";
export interface ProjectManagerProps {}

export default function ProjectManager(props: ProjectManagerProps) {
  //Chakraui
  const toast = useToast();
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
  useEffect(() => {
    dispatch(getAllProject({ search: "", status: "" }));
  }, []);
  const [projectCheck, setProjectCheck] = useState<DataSingleProject[] | []>(
    []
  );

  const [currentProject, setCurrentProject] = useState<null | number>(null);
  // console.log('currentProject', projectCheck)
  const [currentStatusFilter, setCurrentStatusFilter] = useState("");
  const [inputFilter, setInputFilter] = useState("");
  // handle Action
  const handleClickDeactive = () => {
    dispatch(deActiveProject(projectCheck));
    setProjectCheck([]);
  };
  const handleClickDelete = () => {
    dispatch(deleteProject(projectCheck));
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
  const valueDebounce = useDebounce<string>(inputFilter, 500);
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
  console.log('render')
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
      {/* {projectLoading && <Spinner />} */}

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
              backgroundColor="red.20"
              borderBottomLeftRadius={5}
              borderBottomRightRadius={5}
            >
              <Accordion allowToggle>
                {item.data.map((data, index) => (
                  <SingleProject
                    key={index}
                    dataProject={data}
                    setProjectCheck={setProjectCheck}
                    projectCheck={projectCheck}
                    isOpenEditProject={isOpenEditProject}
                    onOpenEditProject={onOpenEditProject}
                    currentProject={currentProject}
                    setCurrentProject={setCurrentProject}
                  />
                ))}
              </Accordion>
            </Box>
          </Box>
        );
      })}
    </Box>
  );
}
