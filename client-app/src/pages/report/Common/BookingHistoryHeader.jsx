import React from "react";
import LocalBarSharpIcon from "@material-ui/icons/LocalBarSharp";
import { Button } from "@material-ui/core";

const BookingHistoryHeader = ({ onFilterShow, title }) => {
  return (
    <div>
      <div className="com-title__wrapper bh">
        <div className="bh-title__wrapper">
          <span className="com-title__leftSpan bh">{title}</span>
        </div>
        <div className="com-title__rightWrapper">
          <div className="div">
            <Button
              onClick={onFilterShow}
              variant="text"
              color="default"
              startIcon={<LocalBarSharpIcon style={{ fill: "#B39DDB" }} />}
            >
              Filter
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryHeader;
