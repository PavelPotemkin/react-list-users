import React, {FC} from 'react';
import UserCard from "../userCard/UserCard";
import {IUser} from "../../../types/user";
import classes from "./UserList.module.css";
import {ISelect} from "../../ui/select/AppSelect";
import {onStatusChangeMethod} from "../../App";

interface IUserList {
  users: IUser[]
  statuses: ISelect['options']
  onStatusChange: onStatusChangeMethod
}

const UserList: FC<IUserList> = ({users, statuses, onStatusChange}) => {
  return (
    <section>
      <h1>Список клиентов</h1>
      
      <div className={classes.userList}>
        {
          users.map(user =>
            <UserCard user={user}
                      key={user.userId}
                      onStatusChange={onStatusChange}
                      statuses={statuses}
            />
          )
        }
      </div>
    </section>
  );
};

export default UserList;