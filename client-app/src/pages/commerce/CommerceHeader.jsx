import React from "react";
import { Divider } from "antd";
import { makeStyles } from "@material-ui/core/styles";
import { Button, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocalBarSharpIcon from "@material-ui/icons/LocalBarSharp";

const useStyles = makeStyles((theme) => ({
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

const CommerceHeader = () => {
  const classes = useStyles();
  const options = data.map((option) => {
    const firstLetter = option["name"][0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  return (
    <div className="com-title__wrapper">
      <div>
        <span className="com-title__leftSpan">Shop</span>
      </div>
      <div className="com-title__rightWrapper">
        <div className="com-title__autocomplete">
          <Autocomplete
            size="small"
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
        <Divider type="vertical" />
        <div className="div">
          <Button
            variant="text"
            color="default"
            startIcon={<LocalBarSharpIcon style={{ fill: "#B39DDB" }} />}
          >
            Filter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CommerceHeader;
