import React from "react";
import LocalBarSharpIcon from "@material-ui/icons/LocalBarSharp";
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  autoComplete: {
    width: "100%",
    marginTop: "20px",
    background: "rgb(250, 250, 250)",
  },
  option: {
    fontSize: "0.875rem;",
    "&:hover": {
      backgroundColor: "#EDF7FE !important",
    },
  },
  inputRoot: {
    color: "black",
    fontWeight: 500,
    borderRadius: "16px",
    fontFamily: `"Poppins", sans-serif`,
  },
  groupLabel: {
    fontSize: "0.875rem;",
  },
}));

const BookingHistoryHeader = ({ onFilterShow }) => {
  return (
    <div>
      <div className="com-title__wrapper">
        <div>
          <span className="com-title__leftSpan">By Booking - History</span>
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
