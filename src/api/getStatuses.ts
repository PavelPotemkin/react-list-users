import {IStatus} from "../../types/status";

interface IGetStatuses {
  status: IStatus[]
}

const getStatuses = async (): Promise<IGetStatuses['status']> => {
  const users: IGetStatuses = await fetch('/status.json').then(result => result.json())

  return users.status
}

export default getStatuses