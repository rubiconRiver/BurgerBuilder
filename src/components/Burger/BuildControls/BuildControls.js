import React from 'react';

import classes from './BuildControls.css'
import BuildControl from './BuildControl/BuildControl';

const controls = [
    {label: 'Lettuce', type: 'lettuce'},
    {label: 'Bacon', type: 'bacon'},
    {label: 'Cheese', type: 'cheese'},
    {label: 'Meat', type: 'meat'},
];

const buildControls = () => {
    return (
        <div className={classes.BuildControls}>
            {controls.map(ctrl => {
              return  <BuildControl key={ctrl.label} label={ctrl.label}/>
            })}
        </div>
    );
};

export default buildControls;