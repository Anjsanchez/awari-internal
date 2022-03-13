import moment from "moment";
import { DatePicker } from "antd";
import { Drawer } from "antd";
import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import { makeStyles } from "@material-ui/core/styles";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Autocomplete from "@material-ui/lab/Autocomplete";
import ListItemText from "@material-ui/core/ListItemText";
import {
  Grid,
  Checkbox,
  FormControlLabel,
  TextField,
  Button,
} from "@material-ui/core";
import BhPriceSlider from "../../Common/BhPriceSlider";

const { RangePicker } = DatePicker;

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

const BhByHeaderDrawer = ({
  customers,
  reservationType,
  isFilterDrawerShow,
  onFilterShow,
  transHeader,
  setSelectedTypes,
  setSelectedVoucher,
  setSelectedCustomer,
  setSelectedDate,
  setSelectedProfit,
}) => {
  const classes = useStyles();
  const [sLType, setLType] = useState([]);
  const [sLVoucher, setSLVoucher] = useState([]);
  const [sLCustomer, setSLCustomer] = useState([]);
  const [sLProfit, setSLProfit] = useState({
    from: 0,
    to: 500000,
  });

  const [sLocalDate, setSLocalDate] = useState({
    fromDate: moment().startOf("month"),
    toDate: moment().endOf("month"),
  });

  const [visible, setVisible] = useState([
    { id: "Reservation Types", open: false },
    { id: "customers", open: false },
    { id: "General", open: false },
    { id: "Profit", open: false },
    { id: "Rooms", open: false },
  ]);

  const options = transHeader
    .filter((n) => n.voucher !== "")
    .map((option) => {
      const firstLetter = option["voucher"].toUpperCase();

      return {
        firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
        ...option,
      };
    });

  const customerOption = customers.map((opt) => {
    const firstLetter = opt.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...opt,
    };
  });

  const onClearFilter = () => {
    setSLocalDate({
      fromDate: moment().startOf("month"),
      toDate: moment().endOf("month"),
    });
    setSLVoucher([]);
    setLType([]);
    setSLCustomer([]);
    setSLProfit({ from: 0, to: 500000 });
  };

  const handleCheckboxCheck = (name) => {
    var xtype = [...sLType];
    const index = xtype.findIndex((x) => x === name);

    if (index === -1) return setLType([...sLType, name]);

    const filtered = xtype.filter((n) => n !== name);
    setLType(filtered);
  };

  const handleListCLick = (id) => {
    var visi = [...visible];
    var foundIndex = visible.findIndex((x) => x.id === id);
    visi[foundIndex].open = !visi[foundIndex].open;
    setVisible(visi);
  };

  const handleChangeTableCustomer = (e, v) => {
    if (v === null) return setSLCustomer([]);
    setSLCustomer([v.key]);
  };

  const handleChangeVoucher = (e, v) => {
    if (v === null) v = [];
    setSLVoucher(v);
  };

  const onChangeRangePicker = (d) => {
    let fromDate = moment().startOf("month");
    let toDate = moment().endOf("month");

    if (d !== null && d[0] !== null) {
      fromDate = d[0];
      toDate = d[1];
    }

    setSLocalDate({ fromDate, toDate });
  };

  const renderValue = () =>
    Object.keys(sLVoucher).length === 0 ? null : sLVoucher;

  const onSubmitSearch = () => {
    setSelectedProfit(sLProfit);
    setSelectedVoucher(sLVoucher);
    setSelectedDate(sLocalDate);
    setSelectedCustomer(sLCustomer);
    setSelectedTypes(sLType);
  };
  return (
    <div>
      <Drawer
        placement="right"
        closable={false}
        className="cd__drawer-container bh"
        width={350}
        onClose={onFilterShow}
        visible={isFilterDrawerShow}
      >
        <div className="cd__container bh">
          <List component="nav" aria-labelledby="nested-list-subheader">
            {/* GENERAL */}
            <ListItem button onClick={() => handleListCLick("General")}>
              <ListItemText primary="General" />
              {visible[2].open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={visible[2].open} timeout="auto" unmountOnExit>
              <div className="cd-category__container">
                <Grid container spacing={1}>
                  <div className="cd-prices__container bhAutoComplete">
                    <span className="bhDrawer-searchTitle__span">
                      CHECK OUT
                    </span>
                    <RangePicker
                      value={[
                        moment(sLocalDate.fromDate),
                        moment(sLocalDate.toDate),
                      ]}
                      onChange={onChangeRangePicker}
                    />
                    <span className="bhDrawer-searchTitle__span">VOUCHER</span>
                    <Autocomplete
                      value={renderValue()}
                      size="small"
                      classes={{
                        option: classes.option,
                        groupLabel: classes.groupLabel,
                        inputRoot: classes.inputRoot,
                      }}
                      getOptionSelected={(option, value) =>
                        option._id === value._id
                      }
                      id="grouped-demo"
                      options={options.sort(
                        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                      )}
                      groupBy={(option) => option.firstLetter}
                      getOptionLabel={(option) => option["voucher"]}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Search"
                          variant="outlined"
                        />
                      )}
                      onChange={handleChangeVoucher}
                    />
                  </div>
                </Grid>
              </div>
            </Collapse>

            {/* TYPES */}
            <ListItem
              button
              onClick={() => handleListCLick("Reservation Types")}
            >
              <ListItemText primary="Reservation Types" />
              {visible[0].open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={visible[0].open} timeout="auto" unmountOnExit>
              <div className="cd-category__container">
                <Grid container spacing={1}>
                  {reservationType.map((n) => (
                    <Grid item xs={6} key={n._id}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            name="checkedB"
                            color="primary"
                            checked={
                              sLType.indexOf(n.name) === -1 ? false : true
                            }
                            onChange={() => handleCheckboxCheck(n.name)}
                          />
                        }
                        label={n.name}
                      />
                    </Grid>
                  ))}
                </Grid>
              </div>
            </Collapse>

            {/* CUSTOMERS */}
            <ListItem button onClick={() => handleListCLick("customers")}>
              <ListItemText primary="Customers" />
              {visible[1].open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={visible[1].open} timeout="auto" unmountOnExit>
              <div className="cd-prices__container bh">
                <Autocomplete
                  size="small"
                  classes={{
                    option: classes.option,
                    groupLabel: classes.groupLabel,
                    inputRoot: classes.inputRoot,
                  }}
                  getOptionSelected={(option, value) =>
                    option._id === value._id
                  }
                  id="grouped-demo"
                  options={customerOption.sort(
                    (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                  )}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => {
                    return option["name"];
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="Search" variant="outlined" />
                  )}
                  onChange={handleChangeTableCustomer}
                />
              </div>
            </Collapse>

            {/* PROFIT RANGE */}
            <ListItem button onClick={() => handleListCLick("Profit")}>
              <ListItemText primary="Profit" />
              {visible.open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={visible[3].open} timeout="auto" unmountOnExit>
              <div className="cd-prices__container bh">
                <BhPriceSlider setSLProfit={setSLProfit} sLProfit={sLProfit} />
              </div>
            </Collapse>
          </List>

          <div className="cd-button__container submit">
            <Button
              variant="contained"
              color="primary"
              onClick={onSubmitSearch}
            >
              SEARCH
            </Button>
          </div>

          <div className="cd-button__container">
            <Button variant="contained" color="primary" onClick={onClearFilter}>
              Clear All
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default BhByHeaderDrawer;
