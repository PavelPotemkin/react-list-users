import {IUser} from "../../types/user";

type IGetUsers = (page?: number) => Promise<IUser[]>

interface IUsersList {
  list: {
    [key:IUser['userId']]: Omit<IUser, 'userId'>
  }
}

// Количество элементов на странице
const count = 6

// Как будто отправляем запрос на получение пользователей по странице
const getUsers: IGetUsers = async (page = 1) => {
  const users: IUsersList = await fetch('/list.json').then(result => result.json())

  const startUsersNum = (page - 1) * count
  
  const convertedUsers = Object.entries(users.list).map(item => {
    return {
      userId: item[0],
      ...item[1]
    }
  })

  return convertedUsers.slice(startUsersNum, startUsersNum + count)
}

export default getUsers