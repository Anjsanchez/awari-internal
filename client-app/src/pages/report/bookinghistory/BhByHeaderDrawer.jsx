import moment from "moment";
import { DatePicker } from "antd";
import "./css/BookingHistory.css";
import { Drawer, Table } from "antd";
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
  reservationType,
  customers,
  isFilterDrawerShow,
  onFilterShow,
  transHeader,
  setSelectedTypes,
  setSelectedVoucher,
  setSelectedCustomer,
  setSelectedDate,
}) => {
  const classes = useStyles();
  const [sLType, setLType] = useState([]);
  const [sLVoucher, setSLVoucher] = useState([]);
  const [sLCustomer, setSLCustomer] = useState([]);
  const [sLocalDate, setSLocalDate] = useState({
    fromDate: {},
    toDate: {},
  });

  const [visible, setVisible] = useState([
    { id: "Reservation Types", open: false },
    { id: "customers", open: false },
    { id: "General", open: false },
  ]);

  const options = transHeader.map((option) => {
    const firstLetter = option["voucher"][0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  const onClearFilter = () => {
    setSLVoucher([]);
    setSLocalDate({ fromDate: moment(), toDate: moment() });
    setSLVoucher([]);
    setSLCustomer([]);
    setLType([]);
  };

  const handleCheckboxCheck = (name) => {
    var xtype = [...sLType];
    const index = xtype.findIndex((x) => x === name);

    if (index === -1) {
      setLType([...sLType, name]);
      return setSelectedTypes([...sLType, name]);
    }

    const filtered = xtype.filter((n) => n !== name);
    setLType(filtered);
    setSelectedTypes(filtered);
  };

  const handleListCLick = (id) => {
    var visi = [...visible];
    var foundIndex = visible.findIndex((x) => x.id === id);
    visi[foundIndex].open = !visi[foundIndex].open;
    setVisible(visi);
  };

  const handleChangeTableCustomer = (selectedRowKeys) => {
    setSLCustomer(selectedRowKeys);
    setSelectedCustomer(selectedRowKeys);
  };
  const handleChangeVoucher = (e, v) => {
    setSLVoucher(v);
    setSelectedVoucher(v);
  };

  const onChangeRangePicker = (d) => {
    setSelectedDate({ fromDate: d[0], toDate: d[1] });
    setSLocalDate({ fromDate: d[0], toDate: d[1] });
  };

  const renderValue = () =>
    Object.keys(sLVoucher).length === 0 ? null : sLVoucher;

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
                <Table
                  size="small"
                  style={{ marginTop: 10 }}
                  bordered
                  columns={[
                    {
                      title: "Name",
                      name: "key",
                      dataIndex: "name",
                      filters: customers,
                      onFilter: (value, record) =>
                        record.name.indexOf(value) === 0,
                      sorter: (a, b) => a.name.length - b.name.length,
                    },
                  ]}
                  dataSource={customers}
                  rowSelection={{
                    selectedRowKeys: sLCustomer,
                    onChange: handleChangeTableCustomer,
                  }}
                />
              </div>
            </Collapse>
          </List>

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
