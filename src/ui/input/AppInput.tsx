import React, {InputHTMLAttributes} from 'react';
import classes from './AppInput.module.css';
import {FC} from "react";

const AppInput: FC<InputHTMLAttributes<any>> = (props) => {
    return (
        <input 
          className={`${classes.appInput} body-1`} 
          {...props}
        />
    );
};

export default AppInput;
