import {IUser} from "../../types/user";

type IGetUsers = (page: number, limit: number) => Promise<{ users: IUser[], total: number}>

interface IUsersList {
  list: {
    [key:IUser['userId']]: Omit<IUser, 'userId'>
  }
}

// Как будто отправляем запрос на получение пользователей по странице
const getUsers: IGetUsers = async (page = 1, limit) => {
  const users: IUsersList = await fetch('/list.json').then(result => result.json())

  const startUsersNum = (page - 1) * limit
  
  const convertedUsers = Object.entries(users.list).map(item => {
    return {
      userId: item[0],
      ...item[1]
    }
  })

  return {
    users: convertedUsers.slice(startUsersNum, startUsersNum + limit),
    total: convertedUsers.length
  }
}

export default getUsers