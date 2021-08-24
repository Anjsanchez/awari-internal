import React from "react";
import MaterialTextField from "./../MaterialTextField";

const AInput = (props) => {
  const { label, id, values, errors, handleChange } = props;

  return (
    <div className="remark__container">
      <div className="remark__wrapper">
        <div className="header-label__wrapper">
          <label htmlFor={id}>{label}</label>
        </div>
        <div className="remark-input__wrapper">
          <MaterialTextField
            size="small"
            id={id}
            key={id}
            label=""
            handleChange={handleChange}
            errors={errors}
            values={values}
          />
        </div>
      </div>
    </div>
  );
};

export default AInput;
