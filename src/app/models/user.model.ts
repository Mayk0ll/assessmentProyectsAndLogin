import { IUser } from "@interfaces/index.ts";

export class User implements IUser {
  id: number = 0;
  name: string = "";
  email: string = "";
  password: string = "";
}
