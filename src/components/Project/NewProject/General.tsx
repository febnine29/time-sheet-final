import {
  chakra,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Text,
} from "@chakra-ui/react";
import React,{useState} from "react";
import axios from 'axios'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  Control,
  Controller,
  FieldValues,
  UseFormRegister,
  UseFormSetValue,
} from "react-hook-form";
import type { Customer } from "../../../type/Customer";
import { PayloadNewProject } from "../../../type/Project";
import {url} from "../../../api/index"

const DatePickerChakra = chakra(DatePicker);
export interface GeneralProps {
  customer: Customer[] | null;
  register: UseFormRegister<FieldValues>;
  setValue: UseFormSetValue<Partial<PayloadNewProject>>;
  control: Control<PayloadNewProject, object>;
}

function General({
  customer,
  register,
  setValue,
  control,
}: 
GeneralProps) {
 

  return (
    <div>
      <FormControl id="client">
        <FormLabel>Client*</FormLabel>
        <Controller
          control={control}
          name="customerId"
          render={({
            field: { onChange, onBlur, value, name, ref },
            fieldState: { invalid, isTouched, isDirty, error },
            formState,
          }) => (
            <Select 
              onChange={(e) => onChange(+e.target.value)} 
              onBlur={onBlur}
              placeholder='Select customer'
            >

              {customer?.map((item: any) => (
                <option
                  selected={value === item.id}
                  value={item.id}
                  key={item.id}
                >
                  {item.name}
                </option>
              ))}
            </Select>
          )}
        />
      </FormControl>

      <FormControl id="name">
        <FormLabel>Project Name*</FormLabel>
        <Input
          type="text"
          {...register("name")}
          // onChange={(e) => handleFormData(e)}
        />
      </FormControl>

      <FormControl>
        <FormLabel id="code">Project Code*</FormLabel>
        <Input
          type="text"
          {...register("code")}
          // onChange={(e) => handleFormData(e)}
        />
      </FormControl>

      <FormControl id="date">
        <FormLabel>Dates*</FormLabel>
        <Flex>
          <Controller
            control={control}
            name="timeStart"
            render={({ field: { onChange, onBlur, value } }) => (
              <DatePickerChakra
                border="1px solid black"
                padding={2}
                borderRadius={5}
                selected={typeof value === "string" ? new Date(value) : value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
          <Controller
            control={control}
            name="timeEnd"
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <DatePickerChakra
                border="1px solid black"
                padding={2}
                borderRadius={5}
                selected={typeof value === "string" ? new Date(value) : value}
                onChange={onChange}
                onBlur={onBlur}
              />
            )}
          />
        </Flex>
      </FormControl>
      <FormControl id="note">
        <FormLabel>Note*</FormLabel>
        <Input type="text" {...register("note")} />
      </FormControl>
      <Flex alignItems="center" mt={2} mb={2}>
        <Checkbox
          mr={2}
          {...register("isAllUserBelongTo")}
          // onChange={(e) => handleIsAllUserBelongToCheckBox(e.target.checked)}
        />
        <Text>
          {" "}
          Auto add user as a member of this project when creating new user
        </Text>
      </Flex>
      <FormControl id="projectType">
        <FormLabel>Project Type*</FormLabel>
        <Select {...register("projectType", { valueAsNumber: true })}>
          <option value={0} defaultChecked>
            Time - Materials
          </option>
          <option value={1}>Fixed Fee</option>
          <option value={2}>Non-Billable</option>
          <option value={3}>ODC</option>
        </Select>
      </FormControl>
    </div>
  );
}
export default React.memo(General);
