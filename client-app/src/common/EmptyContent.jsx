import React from "react";
import { Empty } from "antd";
import "./css/EmptyContent.css";

const defaultImgSrc = "/img/empty.png";
const EmptyContent = ({ text, subText, link }) => {
  return (
    <div>
      <Empty
        image={defaultImgSrc}
        imageStyle={{
          height: 300,
        }}
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
