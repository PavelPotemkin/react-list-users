import React, {ButtonHTMLAttributes, FC} from 'react';
import classes from "./AppButton.module.css";

const AppButton: FC<ButtonHTMLAttributes<any>> = ({children, ...props}) => {
  return (
    <button 
      className={`${classes.appBtn} body-1`} 
      {...props}
    >
      {children}
    </button>
  );
};

export default AppButton;