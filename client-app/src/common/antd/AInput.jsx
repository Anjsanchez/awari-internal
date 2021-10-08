import React from "react";
import MaterialTextField from "./../MaterialTextField";

const AInput = (props) => {
  const {
    label,
    id,
    values,
    errors,
    handleChange,
    type = "text",
    multiline = false,
    disabled = false,
  } = props;

  return (
    <div className="remark__container">
      <div className="remark__wrapper">
        <div className="header-label__wrapper">
          <label htmlFor={id}>{label}</label>
        </div>
        <div className="remark-input__wrapper">
          <MaterialTextField
            disabled={disabled}
            size="small"
            id={id}
            key={id}
            type={type}
            multiline={multiline}
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
