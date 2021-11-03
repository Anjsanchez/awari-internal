import { Badge } from "antd";
import { Divider } from "antd";
import { Button as AntBtn } from "antd";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import LocalBarSharpIcon from "@material-ui/icons/LocalBarSharp";
import ShoppingBasketTwoToneIcon from "@material-ui/icons/ShoppingBasketTwoTone";

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

const CommerceHeader = ({ onFilterShow, products, onSearch }) => {
  //
  const classes = useStyles();
  const { id: employeeIdFromUrl } = useParams();
  const [cartLength, setCartLength] = useState(0);
  const [navLink, setNavLink] = useState("/a/commerce-management/cart");

  const createTransaction = useSelector(
    (state) => state.entities.createTransaction.products
  );

  useEffect(() => {
    if (employeeIdFromUrl !== undefined)
      setNavLink(navLink + "/" + employeeIdFromUrl);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const count = createTransaction.reduce((a, b) => a + b.quantity, 0);
    setCartLength(count);
  }, [createTransaction]);

  const options = products.map((option) => {
    const firstLetter = option["longName"][0].toUpperCase();
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
            // getOptionSelected={(option, value) => {
            //   console.log(value._id);
            //   console.log(option);
            //   return option._id == value._id;
            // }}
            id="grouped-demo"
            options={options.sort(
              (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
            )}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option["longName"]}
            renderInput={(params) => (
              <TextField {...params} label="Search" variant="outlined" />
            )}
            onChange={onSearch}
          />
        </div>
        <Divider type="vertical" />
        <div className="div">
          <Button
            onClick={onFilterShow}
            variant="text"
            color="default"
            startIcon={<LocalBarSharpIcon style={{ fill: "#B39DDB" }} />}
          >
            Filter
          </Button>
        </div>
      </div>
      <AntBtn
        type="primary"
        id="commerceAddToCard"
        icon={
          <Link to={navLink} className="ch-link__wrapper">
            <Badge count={cartLength}>
              <ShoppingBasketTwoToneIcon />
            </Badge>
          </Link>
        }
      />
    </div>
  );
};

export default CommerceHeader;
