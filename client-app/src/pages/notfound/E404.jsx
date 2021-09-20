import React from "react";
import EmptyContent from "./../../common/EmptyContent";

const E404 = () => {
  return (
    <div>
      <EmptyContent
        text="NO ACCESS"
        subText="If you think this is a mistake, kindly contact the System Administartor"
        image="/img/404.svg"
      />
    </div>
  );
};

export default E404;
