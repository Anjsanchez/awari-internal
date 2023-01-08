import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

export default function ToolTipWithIcon({ title, onClick, Icon, style }) {
  return (
    <Tooltip title={title} onClick={onClick} style={{ ...style }}>
      <IconButton>
        <Icon fontSize="medium" />
      </IconButton>
    </Tooltip>
  );
}
