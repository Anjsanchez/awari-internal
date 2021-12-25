import React from "react";
import { Button } from "@material-ui/core";
import BhExportExcel from "./BhExportExcel";
import LocalBarSharpIcon from "@material-ui/icons/LocalBarSharp";

const BookingHistoryHeader = ({
  onFilterShow,
  title,
  onExportBtnDate = [],
  onExportBtnData = [],
  onExportBtnShow = false,
}) => {
  return (
    <div>
      <div className="com-title__wrapper bh">
        <div className="bh-title__wrapper">
          <span className="com-title__leftSpan bh">{title}</span>
        </div>
        <div className="com-title__rightWrapper">
          <div className="div">
            {onExportBtnShow && (
              <BhExportExcel
                onExportBtnDate={onExportBtnDate}
                onExportBtnData={onExportBtnData}
              />
            )}
          </div>
          <div className="div">
            {onFilterShow && (
              <Button
                onClick={onFilterShow}
                variant="text"
                color="default"
                startIcon={<LocalBarSharpIcon style={{ fill: "#B39DDB" }} />}
              >
                Filter
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingHistoryHeader;
