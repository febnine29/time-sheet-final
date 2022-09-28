interface ResultResponseGetAllProject {
  customerName: string;
  name: string;
  code: string;
  status: number;
  pms: string[];
  activeMember: number;
  projectType: number;
  timeStart: string;
  timeEnd: string;
  id: number;
}
interface DataSingleProject {
  name: string;
  code: string;
  status: number;
  pms: string[];
  activeMember: number;
  projectType: number;
  timeStart: string;
  timeEnd: string;
  id: number;
}
interface ResponseGetAllProject {
  error: null;
  result: ResultResponseGetAllProject[];
  success: boolean;
  targetUrl: null;
  unAuthorizedRequest: boolean;
}
interface PayloadNewProject {
  name: string;
  code: string;
  status: number;
  timeStart: Date;
  timeEnd: Date;
  note: string;
  projectType: number;
  customerId: number;
  tasks: TaskFormNewProject[];
  users: UserFormNewProject[];
  projectTargetUsers: [];
  isAllUserBelongTo: boolean;
  id: number;
}

interface TaskFormNewProject {
  taskId: number;
  billable: boolean;
  id?: number;
}
interface UserFormNewProject {
  userId: number;
  type: number;
  id?: number;
}
interface PayloadGetProject {
  status?: string;
  search?: string;
}
export type {
  ResultResponseGetAllProject,
  ResponseGetAllProject,
  DataSingleProject,
  PayloadNewProject,
  UserFormNewProject,
  TaskFormNewProject,
  PayloadGetProject,
};
