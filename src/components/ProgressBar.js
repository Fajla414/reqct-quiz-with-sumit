import React, { useRef, useState } from "react";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";

const ProgressBar = ({ next, prev, submit, progress }) => {
  const [tooltip, setTooltip] = useState(false);
  const tooltipRef = useRef();

  const toggleTooptip = () => {
    if (tooltip) {
      setTooltip(false);
      tooltipRef.current.style.disple = "none";
    } else {
      setTooltip(true);
      tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
      tooltipRef.current.style.disple = "block";
    }
  };

  return (
    <div className={classes.progressBar}>
      <div className={classes.backButton} onClick={prev}>
        <span className="material-icons-outlined"> arrow_back </span>
      </div>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRef}>
          {progress}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${progress}%` }}
            onMouseOver={toggleTooptip}
            onMouseOut={toggleTooptip}
          ></div>
        </div>
      </div>
      <Button
        className={classes.next}
        onClick={progress === 100 ? submit : next}
      >
        <span>{progress === 100 ? "Submit Quiz" : "Next Question"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
};

export default ProgressBar;
