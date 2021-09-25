import React from "react";
import EmptyContent from "./../../common/EmptyContent";

const NotFound = () => {
  return (
    <>
      <EmptyContent
        text="404 NOT FOUND"
        subText="Sorry, the page you visited does not exist."
        image="/img/404.svg"
      />
    </>
  );
};

export default NotFound;
