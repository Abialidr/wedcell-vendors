import React from 'react';
import styles from './steps.module.css';

const Steps = ({ totalSteps, currStep, changeSteps }) => {
  var arr = [];

  for (var i = 1; i <= totalSteps; i++) {
    arr.push(i);
  }
  return (
    <div className={styles.steps}>
      {arr.map((val) => {
        return (
          <span
            key={val}
            style={
              currStep >= val
                ? { backgroundColor: '#b6255a', color: 'white' }
                : {}
            }
          >
            {val}
          </span>
        );
      })}
    </div>
  );
};

export default Steps;
