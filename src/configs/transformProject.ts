import type { ResultResponseGetAllProject } from "../type/Project";
interface Result {
  customerName: string;
  data: {
    name: string;
    code: string;
    status: number;
    pms: string[];
    activeMember: number;
    projectType: number;
    timeStart: string;
    timeEnd: string;
    id: number;
  }[];
}
const transformProject = (
  projectData: ResultResponseGetAllProject[] | null
) => {
  return projectData?.reduce<Result[]>((acc, cur) => {
    const { customerName, ...rest } = cur;
    if (acc.every((item) => item.customerName !== cur.customerName)) {
      acc.push({
        customerName: cur.customerName,
        data: [rest],
      });
    } else {
      const index = acc.findIndex(
        (item) => item.customerName === cur.customerName
      );
      acc[index].data.push(rest);
    }
    return acc;
  }, []);
};

export { transformProject };
