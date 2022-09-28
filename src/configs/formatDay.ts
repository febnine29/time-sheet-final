import dayjs from "dayjs";
export const formatDay = (day: string) => dayjs(day).format("DD/MM/YYYY");
