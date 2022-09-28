import type { DataSingleProject } from "../type/Project";
interface InputProject {
  check: boolean;
  data: DataSingleProject;
}
export const transFormCheckProjects = (
  dataInput: InputProject,
  dataCurrent: DataSingleProject[] | []
) => {
  let result = [...dataCurrent];

  if (dataCurrent.length !== 0) {
    //check data exits
    dataCurrent.forEach((item, index) => {
      // check if dataInput exits and check : true => replace
      if (
        (item as DataSingleProject).name === dataInput.data.name &&
        dataInput.check
      ) {
        result[index] = dataInput.data;
      }
      // check if dataInput exits and check : false => delete
      else if (
        (item as DataSingleProject).name === dataInput.data.name &&
        !dataInput.check
      ) {
        result.splice(index, 1);
      }
    });
    // check data not exits
    // check if dataInput not exits and check : true => push
    if (
      dataCurrent.every((item) => item.name !== dataInput.data.name) &&
      dataInput.check
    ) {
      result.push(dataInput.data);
    }
  } else {
    result.push(dataInput.data);
  }
  return result;
};
