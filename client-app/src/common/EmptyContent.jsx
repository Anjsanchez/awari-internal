import React from "react";
import { Empty } from "antd";
import "./css/EmptyContent.css";

const defaultImgSrc = "/img/empty.png";
const EmptyContent = ({ text, subText, link, image = defaultImgSrc }) => {
  return (
    <div>
      <Empty
        image={image}
        className="ec-img__wrapper"
        description={
          <div>
            <span className="ec-span__content">{text}</span>
            <span className="ec-span__subContent">{subText}</span>
          </div>
        }
      >
        {link}
      </Empty>
    </div>
  );
};

export default EmptyContent;
