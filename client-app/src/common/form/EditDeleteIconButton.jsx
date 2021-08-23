import React from "react";
import { Link } from "react-router-dom";
import { RiEditBoxFill, RiDeleteBin7Fill } from "react-icons/ri";
import { IconButton, Tooltip } from "@material-ui/core";
import { BsEyeFill } from "react-icons/bs";

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
            <BsEyeFill color="rgb(86, 100, 210)" />
          </IconButton>
        </Tooltip>
      </Link>
      {showDelete && (
        <Tooltip title="Delete" placement="top">
          <IconButton
            style={{ paddingLeft: "15px" }}
            edge="start"
            color="inherit"
            aria-label="menu"
            className="navbar_iconBtn"
            onClick={() => handleDelete(rowId)}
          >
            <RiDeleteBin7Fill color="#ff6e40" />
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default EditDeleteIconButton;
