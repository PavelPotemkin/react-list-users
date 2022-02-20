import React, {FC} from 'react';
import classes from "./AppLoader.module.css";

const AppLoader: FC = () => {
  return (
    <div className={classes.appLoader}>
      <svg height="104" width="104">
        <circle cx="52" cy="52" r="50" stroke="var(--border-color)" strokeWidth="2" fill="transparent" />
      </svg>
    </div>
  );
};

export default AppLoader;