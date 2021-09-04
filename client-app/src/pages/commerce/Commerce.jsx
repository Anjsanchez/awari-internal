import React from "react";
import "./css/Commerce.css";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { Divider } from "antd";
import LocalBarSharpIcon from "@material-ui/icons/LocalBarSharp";
import CommerceHeader from "./CommerceHeader";
import CommerceBody from "./CommerceBody";

const Commerce = () => {
  return (
    <div className="container__wrapper commerce">
      <CommerceHeader />
      <Divider className="com-divider" />
      <CommerceBody />
    </div>
  );
};

export default Commerce;
