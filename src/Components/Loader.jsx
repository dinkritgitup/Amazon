import React from 'react';
import classes from './Loader.module.css';

function Loader() {
  return (
    <div className={classes.loader}>
      <div className={classes.spinner}></div>
    </div>
  );
}

export default Loader;
