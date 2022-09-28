import type { UserNotPagging } from "../type/User";
export const filterUser =
  (users: UserNotPagging[] | null) =>
  (branch: number) =>
  (type: number) =>
  (level: number) =>
  (name: string) => {
    //   if -1 return old users
    if (users) {
      return users
        .filter((item) => (branch === -1 ? true : item.branch === branch))
        .filter((item) => (type === -1 ? true : item.type === type))
        .filter((item) => (level === -1 ? true : item.level === level))
        .filter((item) => (name === "" ? true : item.name.includes(name)));
    }
  };
