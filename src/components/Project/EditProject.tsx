import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { getProjectApi } from "../../api/projectapi";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getSingleProject,
  projectSelector,
  setProjectEmtyl,
} from "../../features/ProjectSlice";
import { PayloadNewProject } from "../../type/Project";
import SaveProject from "./NewProject";
type SaveProjectType = "ADD_PROJECT" | "EDIT_PROJECT";
export interface EditProjectProps {
  onClose: () => void;
  currentProject: number | null;
}

export default function EditProject({
  onClose,
  currentProject,
}: EditProjectProps) {
 
  const dispatch = useAppDispatch();
  const { project } = useAppSelector(projectSelector);
  console.log('project', project)
  
  useEffect(() => {
    if (currentProject) {
      dispatch(getSingleProject(`${getProjectApi}?input=${currentProject}`));
      console.log('currentProject')
    }
    return () => {
      dispatch(setProjectEmtyl());
    };
    
  }, []);

  return (
    <Box>
      {" "}
      {project && (
        <SaveProject
          TYPE_SAVE="EDIT_PROJECT"
          onClose={onClose}
          defaultValues={project as PayloadNewProject}
        />
      )}
    </Box>
  );
}
