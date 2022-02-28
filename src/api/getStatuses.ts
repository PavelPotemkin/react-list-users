import {IStatus} from "../../types/status";

interface IGetStatuses {
  status: IStatus[]
}

const getStatuses = async (): Promise<IGetStatuses['status']> => {
  const users: IGetStatuses = await fetch((process.env.NODE_ENV === 'development' ? process.env.PUBLIC_URL : '/react-list-users/') + 'status.json').then(result => result.json())

  return users.status
}

export default getStatuses