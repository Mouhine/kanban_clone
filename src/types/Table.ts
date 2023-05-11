import Task from "./Task";
export interface Table {
  name: string;
  userId: string;
  id?: string;
  tasks?: Task[];
}
