import React, { useState } from "react";
import "./css/Commerce.css";
import { Divider } from "antd";
import CommerceHeader from "./CommerceHeader";
import CommerceBody from "./CommerceBody";
import CommerceDrawer from "./CommerceDrawer";

const Commerce = () => {
  const [isFilterDrawerShow, setIsFilterDrawerShow] = useState(false);

  const onFilterShow = () => setIsFilterDrawerShow(!isFilterDrawerShow);
  return (
    <div className="container__wrapper commerce">
      <CommerceHeader onFilterShow={onFilterShow} />
      <CommerceDrawer
        onFilterShow={onFilterShow}
        isFilterDrawerShow={isFilterDrawerShow}
      />
      <Divider className="com-divider" />
      <CommerceBody />
    </div>
  );
};

export default Commerce;
