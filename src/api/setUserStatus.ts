import {IUser} from "../../types/user";
import {IStatus} from "../../types/status";

interface ISetUserStatus {
  userId: IUser['userId'],
  value: IStatus['code']
}

// Как будто отправляем запрос на бэк чтобы изменить статус
const setUserStatus = async (data: ISetUserStatus): Promise<ISetUserStatus> => {
  return await new Promise(resolve => resolve(data))
}

export default setUserStatus