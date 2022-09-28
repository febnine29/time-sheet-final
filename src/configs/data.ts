export const dataLevel = [
  { level: 0, name: "Intern_0" },
  { level: 1, name: "Intern_1" },
  { level: 2, name: "Intern_2" },
  { level: 3, name: "Prefresher" },
  { level: 4, name: "Fresher-" },
  { level: 5, name: "Fresher" },
  { level: 6, name: "Fresher+" },
  { level: 7, name: "Junior-" },
  { level: 8, name: "Junior" },
  { level: 9, name: "Junior+" },
  { level: 10, name: "Middle-" },
  { level: 11, name: "Middle" },
  { level: 12, name: "Middle+" },
  { level: 13, name: "Senior-" },
  { level: 14, name: "Senior" },
  { level: 15, name: "Senior+" },
];
export const checkLevel = (level: number | null): string => {
  if (level || level === 0) {
    const data = dataLevel.filter((item) => item.level === level);
    return data[0].name;
  }
  return "";
};

export const dataBranch = [
  { branch: 0, name: "Ha Noi" },
  { branch: 1, name: "Da Nang" },
  { branch: 2, name: "HCM" },
  { branch: 3, name: "Vinh" },
];
export const checkBranch = (branch: number | null): string => {
  if (branch || branch === 0) {
    const data = dataBranch.filter((item) => item.branch === branch);
    return data[0].name;
  }
  return "";
};

export const dataTypeUser = [
  { type: 0, name: "Staff" },
  { type: 1, name: "Internship" },
  { type: 2, name: "Collaborator" },
];

export const checkTypeUser = (type: number | null): string => {
  if (type || type === 0) {
    const data = dataTypeUser.filter((item) => item.type === type);
    return data[0].name;
  }
  return "";
};
