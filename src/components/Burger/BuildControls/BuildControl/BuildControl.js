import React from 'react';

import classes from './BuildControl.css'

const buildControl = (props) => {
    return (
        <div className={classes.BuildControl}>
            <div className={classes.Label}>{props.label}</div>
            <button className={classes.Label}>Less</button>
            <button className={classes.Label}>More</button>
        </div>
    );
};

export default buildControl;