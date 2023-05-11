interface Task {
  id?: string;
  title: string;
  description: string;
  status: string;
  userId: string;
  tabelId?: string;
  boardId?: string;
  subTasks: SubTask[];
}

export interface SubTask {
  title: string;
  checked: boolean;
  createdAt?: Date;
  updatedAt?: Date;
  id?: string;
  postId?: string;
}

export default Task;
