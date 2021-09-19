import React from "react";
import { Link } from "react-router-dom";
import { IconButton, Tooltip } from "@material-ui/core";
import DeleteTwoToneIcon from "@material-ui/icons/DeleteTwoTone";
import VisibilityTwoToneIcon from "@material-ui/icons/VisibilityTwoTone";

const EditDeleteIconButton = (props) => {
  const { rowId, handleDelete, linkPath, showDelete = true } = props;
  return (
    <>
      <Link to={linkPath}>
        <Tooltip title="View" placement="top">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className="navbar_iconBtn"
          >
            <VisibilityTwoToneIcon />
          </IconButton>
        </Tooltip>
      </Link>
      {showDelete && (
        <Tooltip title="Delete" placement="top">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className="navbar_iconBtn"
            onClick={() => handleDelete(rowId)}
          >
            <DeleteTwoToneIcon style={{ color: "ff6e40" }} />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default EditDeleteIconButton;
