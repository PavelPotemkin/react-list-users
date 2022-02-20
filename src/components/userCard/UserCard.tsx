import React, {FC} from 'react';
import classes from "./UserCard.module.css";
import {IUser} from "../../../types/user";
import AppSelect, {ISelect} from "../../ui/select/AppSelect";
import {onStatusChangeMethod} from "../../App";

interface IUserCard {
  user: IUser,
  statuses: ISelect['options']
  onStatusChange: onStatusChangeMethod
}

const UserCard: FC<IUserCard> = ({user, statuses, onStatusChange}) => {
  const onSelectValueChange: ISelect['onValueChange'] = (value) => {
    onStatusChange(value, user.userId)
  }
  
  return (
    <div className={classes.userCard}>
      <div className={`${classes.userCardContent} body-1`}>
        <div className={classes.userCardLeft}>
          <span>{user.firstName}</span>
          <span>{user.lastName}</span>
          <span>{user.patronymic}</span>
        </div>

        <div className={classes.userCardRight}>
          <span>Статус: </span>
          <AppSelect
            onValueChange={onSelectValueChange}
            currentValue={String(user.status)}
            options={statuses}
          />
        </div>
      </div>
    </div>
  );
};

export default UserCard;