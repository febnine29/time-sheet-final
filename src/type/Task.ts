interface Task {
  name: string;
  type: number;
  isDeleted: boolean;
  id: number;
}

interface ResponseGetTask {
  error: null;
  success: boolean;
  targetUrl: null;
  unAuthorizedRequest: boolean;
  result: Task[] | null;
}

interface ResponseEditTask {
  error: null;
  success: boolean;
  targetUrl: null;
  unAuthorizedRequest: boolean;
  result: Task | null;
}
interface TaskAddProject {
  taskId: number;
  billable: boolean;
}
export type { Task, ResponseGetTask, ResponseEditTask, TaskAddProject };
