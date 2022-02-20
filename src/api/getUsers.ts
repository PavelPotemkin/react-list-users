import {IUser} from "../../types/user";

interface IGetUsers {
  list: {
    [key:IUser['userId']]: Omit<IUser, 'userId'>
  }
}

const getUsers = async (): Promise<IUser[]> => {
  const users: IGetUsers = await fetch('/list.json').then(result => result.json())

  return Object.entries(users.list).map(item => {
    return {
      userId: item[0],
      ...item[1]
    }
  })
}

export default getUsers