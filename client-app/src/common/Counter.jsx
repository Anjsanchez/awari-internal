import "./css/Counter.css";
import React from "react";
import { Button } from "@material-ui/core";

const Counter = ({ name, label, counterV, onIncrement, onDecrement }) => {
  if (!label) label = name;
  return (
    <div className="counter__container">
      <span className="counter-spanHeader">{label.toUpperCase()}</span>
      <div className="counter__wrapper">
        <Button
          disabled={counterV === 0}
          size="small"
          variant="contained"
          color="secondary"
          className="counter-btn"
          onClick={() => onDecrement(name)}
        >
          -
        </Button>
        <div className="counter-span__wrapper">
          <span className="counter-span">{counterV}</span>
        </div>
        <Button
          size="small"
          variant="contained"
          color="primary"
          className="counter-btn pos"
          onClick={() => onIncrement(name)}
        >
          +
        </Button>
      </div>
    </div>
  );
};

export default Counter;
