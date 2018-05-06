import { Employee } from "./employee";
export interface Work{
  employee: Employee,
  status: string
  date:  Date,
  startTime: Date,
  endTime: Date,
}