import React from "react";
import "./css/Commerce.css";
import { SearchBar } from "material-ui-search-bar";
import MSearchBar from "./../../common/form/MSearchBar";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { IconButton, Tooltip, Collapse, TextField } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  roomVariant_container: {
    background: "#fff",
    padding: "15px 20px 15px 20px",
  },
  roomVariantChild_container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#fff",
  },
  autoComplete: {
    width: "100%",
    marginTop: "20px",
    background: "rgb(250, 250, 250)",
  },
  option: {
    fontSize: "0.875rem;",
    "&:hover": {
      backgroundColor: "#EDF7FE !important",
    },
  },
  inputRoot: {
    color: "black",
    fontWeight: 500,
    borderRadius: "16px",
    fontFamily: `"Poppins", sans-serif`,
  },
  groupLabel: {
    fontSize: "0.875rem;",
  },
}));

const data = [{ name: "angelo" }];

const Commerce = () => {
  const classes = useStyles();
  const options = data.map((option) => {
    const firstLetter = option["name"][0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  return (
    <div className="container__wrapper commerce">
      <div className="com-title__wrapper">
        <span className="com-title__leftSpan">Shop</span>
        <Autocomplete
          classes={{
            option: classes.option,
            groupLabel: classes.groupLabel,
            inputRoot: classes.inputRoot,
          }}
          getOptionSelected={(option, value) => option._id === value._id}
          id="grouped-demo"
          options={options.sort(
            (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
          )}
          groupBy={(option) => option.firstLetter}
          getOptionLabel={(option) => option["name"]}
          renderInput={(params) => (
            <TextField {...params} label="Search" variant="outlined" />
          )}
          //   onChange={onSearch}
        />
      </div>
    </div>
  );
};

export default Commerce;
