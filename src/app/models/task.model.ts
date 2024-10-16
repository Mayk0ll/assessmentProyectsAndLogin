import { ITask } from "@interfaces/index.ts";

export class Task implements ITask {
  userId: number = 0;
  id: number = 0;
  title: string = "";
  completed: boolean = false;
}

