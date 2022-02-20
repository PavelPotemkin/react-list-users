import React, {FC, SelectHTMLAttributes} from 'react';
import {IStatus} from "../../../types/status";
import classes from './AppSelect.module.css'

export interface ISelectValue {
  value: string,
  label: string
}

export interface ISelect {
  options: ISelectValue[]
  currentValue: ISelectValue['value'],
  onValueChange: (value: IStatus['code']) => void
}

const AppSelect: FC<ISelect & SelectHTMLAttributes<any>> = ({options, currentValue, onValueChange, ...props}) => {
  return (
    <select
      className={`${classes.appSelect} body-1`}
      {...props}
      value={currentValue}
      onChange={e => onValueChange(+e.target.value)}
    >
      {
        options.map(option =>
          <option
            value={option.value}
            key={option.value}
          >
            {option.label}
          </option>
        )
      }
    </select>
  );
};

export default AppSelect;