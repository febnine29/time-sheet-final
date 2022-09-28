import { array } from "yup/lib/locale";
import { UserFormNewProject } from "../type/Project";
import type { UserNotPagging } from "../type/User";

export const deleteArrInArrById = (
  arrayNeedDelete: UserNotPagging[],
  array: UserNotPagging[] | null
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

export const deleteArrRemoveUserForm =
  (userForm: UserFormNewProject[]) => (userId: number) => {
    return userForm.filter((item) => item.userId !== userId);
  };

export const mergeObjectById =
  (array1: UserNotPagging[]) =>
  (array2: UserFormNewProject[])
  : (UserNotPagging & { typeOffice: number })[] | null => {
    if (!array1 || !array2) return null;

    return array1.map((itemArr1) => { 
      let result!: UserNotPagging & { typeOffice: number };
      for (let item of array2) {
        if (itemArr1.id === item?.userId) {
          result = { ...itemArr1, typeOffice: item.type };
        }
      }
      return result;
    });
  
  };

export const mergeObjectUserForm =
  (userFrom1: UserFormNewProject[]) =>
  (userForm2: UserFormNewProject): UserFormNewProject[] | null => {
    if (!userFrom1 || !userForm2) return null;
    console.log('userFrom1', userFrom1);
    return userFrom1.map((itemArr1) => {
      if (itemArr1.userId === userForm2.userId) {
        console.log('userForm2', userForm2)
        return userForm2;
      } else {
        console.log('itemArr1', itemArr1)
        return itemArr1;
      }
    });
    
  };

export const getObjectById =
  (listId: UserFormNewProject[]) => (array: UserNotPagging[]) => {
    console.log(array);
    if (!listId || !array) return null;
    const arrayClone = [...array];
    return listId.map((item) => {
      let result!: UserNotPagging;
      for (let itemInArray of arrayClone) {
        if (itemInArray.id === item.userId) {
          result = itemInArray;
        }
      }
      return result;
    });
  };
