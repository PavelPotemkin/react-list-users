import {IStatus} from "./status";

export interface IUser {
  userId: string 
  firstName: string
  lastName: string
  patronymic: string
  status: IStatus['code']
} 