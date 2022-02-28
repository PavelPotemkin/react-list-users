import React, {useEffect, useState} from 'react';
import {useFetching} from "./hooks/useFetching";
import getUsers from "./api/getUsers";
import {IUser} from "../types/user";
import UserList from "./components/userList/UserList";
import UserFilter, {IUserFilter} from "./components/userFilter/UserFilter";
import {useUsers} from "./hooks/useUsers";
import getStatuses from "./api/getStatuses";
import {ISelect} from "./ui/select/AppSelect";
import convertStatusesIntoSelectOptions from "./utils/status";
import {IStatus} from "../types/status";
import classes from './App.module.css'
import AppLoader from "./ui/loader/AppLoader";
import setUserStatus from "./api/setUserStatus";
import Pagination from "./ui/pagination/Pagination";
import {getPageCount} from "./utils/page";

export type onStatusChangeMethod = (value: IStatus['code'], id: IUser['userId']) => void

// Количество карточек на странице
const limit = 6

function App() {
  const [users, setUsers] = useState<IUser[]>([])
  const [filter, setFilter] = useState<IUserFilter['filter']>({query: ''})
  const [statuses, setStatuses] = useState<ISelect['options']>([])
  const [page, setPage] = useState<number>(1)
  const [totalPages, setTotalPages] = useState<number>(0)
  
  const [fetchUsers, isUsersLoading] = useFetching(async () => {
    const {users, total}  = await getUsers(page, limit);
    setUsers(users)
    setTotalPages(getPageCount(total, limit))
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
    fetchUsers().then(r => console.log(r));
    // @ts-ignore
    fetchStatuses().then(r => console.log(r))
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [])
  
  useEffect(() => {
    // @ts-ignore
    fetchUsers();
  }, [page])

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
            <>
              <UserList
                statuses={statuses}
                users={filteredUsers}
                onStatusChange={onStatusChange}
              />
              
              <div className={classes.pagination}>
                <Pagination
                  totalPages={totalPages}
                  page={page}
                  setPage={setPage}
                />
              </div>
            </>
        }
      </div>
    </div>
  );
}

export default App;
