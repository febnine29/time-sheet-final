import { TaskFormNewProject } from "../type/Project";
import { Task } from "../type/Task";

export const deleteArrInArrById = (
  arrayNeedDelete: Task[],
  array: Task[] | null
) => {
  if (!arrayNeedDelete || !array) return null;
  return arrayNeedDelete.filter((itemOfArrayNeedDelete) => {
    let result = true;
    for (let itemOfArray of array) {
      if (itemOfArray.id === itemOfArrayNeedDelete.id) result = false;
    }
    return result;
  });
};
export const deleteArrRemoveTaskForm =
  (userForm: TaskFormNewProject[]) => (taskId: number) => {
    return userForm.filter((item) => item.taskId !== taskId);
  };

export const mergeObjectById =
  (array1: Task[]) =>
  (array2: TaskFormNewProject[]): (Task & { billable: boolean })[] | null => {
    if (!array1 || !array2) return null;
    return array1.map((itemArr1) => {
      let result!: Task & { billable: boolean };

      array2.forEach((itemArr2) => {
        if (itemArr1.id === itemArr2.taskId) {
          result = { ...itemArr1, billable: itemArr2.billable };
        }
      });
      return result;
    });
  };

export const mergeObjectTaskForm =
  (taskForm: TaskFormNewProject[]) =>
  (dataChangeTaskForm: TaskFormNewProject) => {
    if (!taskForm || !dataChangeTaskForm) return null;
    return taskForm.map((itemArr1) => {
      if (itemArr1.taskId === dataChangeTaskForm.taskId) {
        return dataChangeTaskForm;
      } else {
        return itemArr1;
      }
    });
  };

export const getObjectById =
  (listId: TaskFormNewProject[]) => (array: Task[]) => {
    if (!listId || !array) return null;
    const arrayClone = [...array];
    return listId.map((item) => {
      let result!: Task;
      for (let itemInArray of arrayClone) {
        if (itemInArray.id === item.taskId) {
          result = itemInArray;
        }
      }
      return result;
    });
  };
