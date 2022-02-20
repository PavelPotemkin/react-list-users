import React, {useEffect, useState} from 'react';
import {useFetching} from "./hooks/useFetching";
import getUsers from "./api/getUsers";
import {IUser} from "../types/user";
import UserList from "./components/userList/UserList";
import UserFilter, {IUserFilter} from "./components/userFilter/UserFilter";
import {useUsers} from "./hooks/useUsers";
import getStatuses from "./api/getStatuses";
import {ISelect} from "./ui/select/AppSelect";
import convertStatusesIntoSelectOptions from "./utils/convertStatuses";
import {IStatus} from "../types/status";
import classes from './App.module.css'
import AppLoader from "./ui/loader/AppLoader";
import setUserStatus from "./api/setUserStatus";

export type onStatusChangeMethod = (value: IStatus['code'], id: IUser['userId']) => void 

function App() {
  const [users, setUsers] = useState<IUser[]>([])
  const [filter, setFilter] = useState<IUserFilter['filter']>({query: ''})
  const [statuses, setStatuses] = useState<ISelect['options']>([])

  const [fetchUsers, isUsersLoading] = useFetching(async () => {
    const response = await getUsers();
    setUsers(response)
  })

  const [fetchStatuses, isStatusesLoading] = useFetching(async () => {
    const response = await getStatuses();
    setStatuses(convertStatusesIntoSelectOptions(response))
  })

  const [setStatus] = useFetching(async (value: number, id: string) => {
    const changedData = await setUserStatus({userId: id, value})

    setUsers([...users.map(user => {
      if (user.userId === changedData.userId) {
        return {
          ...user,
          status: changedData.value
        };
      }
      return user;
    })])
  })
  
  const filteredUsers = useUsers(users, filter.query)
  
  const onStatusChange: onStatusChangeMethod = (value, id) => {
    // @ts-ignore
    setStatus(value, id)
  }

  useEffect(() => {
    // @ts-ignore
    fetchUsers();
    // @ts-ignore
    fetchStatuses()
  }, [])

  useEffect(() => {
    console.log(users)
  }, [users])

  return (
    <div className="container">
      <UserFilter 
        filter={filter} 
        setFilter={setFilter} 
      />

      <div className={classes.inner}>
        {
          isUsersLoading || isStatusesLoading
            ?
            <AppLoader/>
            :
            <UserList
              statuses={statuses}
              users={filteredUsers}
              onStatusChange={onStatusChange}
            />
        }
      </div>
    </div>
  );
}

export default App;
