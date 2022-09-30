import { useState } from "react";
import { Box, Heading, Select, Input } from "@chakra-ui/react";
export interface FilterProjectProps {
  handleOnchangeOptionFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  currentStatusFilter: string;
  handleOnChangeInputFilter: (e: React.ChangeEvent<HTMLInputElement>) => void;
  inputFilter: string;
}

export default function FilterProject({
  handleOnchangeOptionFilter,
  currentStatusFilter,
  handleOnChangeInputFilter,
  inputFilter,
}: FilterProjectProps) {
  return (
    <Box mt={2}>
      <Select mt={2} onChange={(e) => handleOnchangeOptionFilter(e)}>
        <option value={"0"} selected={currentStatusFilter === "0"}>
          Active Projects
        </option>
        <option value={"1"} selected={currentStatusFilter === "1"}>
          Deactive Projects
        </option>
        <option value={""} selected={currentStatusFilter === ""}>
          All Projects
        </option>
      </Select>

      <Input
        placeholder="Search by client or project name"
        mt={2}
        onChange={(e) => handleOnChangeInputFilter(e)}
        value={inputFilter}
      ></Input>
    </Box>
  );
}
