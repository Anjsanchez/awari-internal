import React from "react";
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";

export default function MaterialTableSelect({
  data,
  label,
  onChange,
  value,
  style,
  size = "small",
  name,
  readOnly = false,
  displayAttribute,
  displayKey,
  required = true,
}) {
  const ClassProps = {
    PaperProps: {
      style: {
        maxHeight: 250,
      },
    },
  };
  const RenderDisplay = (n) => {
    if (displayKey !== undefined) {
      return (
        <MenuItem value={n[displayKey]} key={n[displayKey]}>
          {n[displayAttribute]}
        </MenuItem>
      );
    } else
      return (
        <MenuItem value={n} key={n}>
          {n}
        </MenuItem>
      );
  };
  return (
    <>
      <FormControl
        required={required}
        variant="outlined"
        style={{ ...style }}
        size={size}
        className="pms-select__wrapper"
      >
        <InputLabel id="shadowdatabase-select-label">{label}</InputLabel>
        <Select
          readOnly={readOnly}
          labelId="shadowdatabase-select-label"
          id="shadowdatabase-select"
          name={name}
          label="Shadow Database *"
          onChange={onChange}
          value={value || ""}
          MenuProps={ClassProps}
        >
          {data && data.map((n) => RenderDisplay(n))}
        </Select>
      </FormControl>
    </>
  );
}
