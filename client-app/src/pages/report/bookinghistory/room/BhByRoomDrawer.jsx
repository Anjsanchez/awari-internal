import moment from "moment";
import { DatePicker } from "antd";
import { Drawer, Table } from "antd";
import React, { useState } from "react";
import List from "@material-ui/core/List";
import { Grid, Button } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemText from "@material-ui/core/ListItemText";
const { RangePicker } = DatePicker;

const BhByRoomDrawer = ({
  roomVariants,
  rooms,
  onFilterShow,
  employees,
  employeeRole,
  isFilterDrawerShow,
  discounts,
  setSelectedEmployee,
  setSelectedDate,
  setSelectedProduct,
  setSelectedVariant,
  setSelectedDiscount,
}) => {
  const [sLProduct, setSLProduct] = useState([]);
  const [sLDiscount, setSLDiscount] = useState([]);
  const [sLVariant, setSLVariant] = useState([]);
  const [sLEmployee, setSLEmployee] = useState([]);
  const [sLocalDate, setSLocalDate] = useState({
    fromDate: moment().startOf("month"),
    toDate: moment().endOf("month"),
  });

  const [visible, setVisible] = useState([
    { id: "General", open: false },
    { id: "Created By", open: false },
    { id: "Rooms", open: false },
    { id: "Discounts", open: false },
    { id: "Variant", open: false },
  ]);

  const onClearFilter = () => {
    setSLocalDate({
      fromDate: moment().startOf("month"),
      toDate: moment().endOf("month"),
    });

    setSLProduct([]);
    setSLDiscount([]);
    setSLVariant([]);
    setSLEmployee([]);
  };
  const handleListCLick = (id) => {
    var visi = [...visible];
    var foundIndex = visible.findIndex((x) => x.id === id);
    visi[foundIndex].open = !visi[foundIndex].open;
    setVisible(visi);
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

  const onSubmitSearch = () => {
    setSelectedEmployee(sLEmployee);
    setSelectedDate(sLocalDate);
    setSelectedProduct(sLProduct);
    setSelectedVariant(sLVariant);
    setSelectedDiscount(sLDiscount);
  };

  const handleChangeTableEmployee = (selectedRowKeys) =>
    setSLEmployee(selectedRowKeys);
  const handleChangeTableProduct = (selectedRowKeys) =>
    setSLProduct(selectedRowKeys);
  const handleChangeTableDiscount = (selectedRowKeys) =>
    setSLDiscount(selectedRowKeys);
  const handleChangeTableVariant = (selectedRowKeys) =>
    setSLVariant(selectedRowKeys);

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
              {visible[0].open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={visible[0].open} timeout="auto" unmountOnExit>
              <div className="cd-Variant__container">
                <Grid container spacing={1}>
                  <div className="cd-prices__container bhAutoComplete">
                    <span className="bhDrawer-searchTitle__span">
                      TRANSACTION CREATED
                    </span>
                    <RangePicker
                      value={[
                        moment(sLocalDate.fromDate),
                        moment(sLocalDate.toDate),
                      ]}
                      onChange={onChangeRangePicker}
                    />
                  </div>
                </Grid>
              </div>
            </Collapse>

            {/* Employees */}
            <ListItem button onClick={() => handleListCLick("Created By")}>
              <ListItemText primary="Created By" />
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
                      filters: employeeRole,
                      onFilter: (value, record) =>
                        record.role.indexOf(value) === 0,
                      sorter: (a, b) => a.name.length - b.name.length,
                    },
                  ]}
                  dataSource={employees}
                  rowSelection={{
                    selectedRowKeys: sLEmployee,
                    onChange: handleChangeTableEmployee,
                  }}
                />
              </div>
            </Collapse>

            {/* Rooms */}
            <ListItem button onClick={() => handleListCLick("Rooms")}>
              <ListItemText primary="Rooms" />
              {visible[2].open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={visible[2].open} timeout="auto" unmountOnExit>
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
                      filters: roomVariants,
                      onFilter: (value, record) =>
                        record.variant.indexOf(value) === 0,
                      sorter: (a, b) => a.name.length - b.name.length,
                    },
                  ]}
                  dataSource={rooms}
                  rowSelection={{
                    selectedRowKeys: sLProduct,
                    onChange: handleChangeTableProduct,
                  }}
                />
              </div>
            </Collapse>

            {/* Variant */}
            <ListItem button onClick={() => handleListCLick("Variant")}>
              <ListItemText primary="Variant" />
              {visible[4].open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={visible[4].open} timeout="auto" unmountOnExit>
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
                      filters: roomVariants,
                      onFilter: (value, record) =>
                        record.value.indexOf(value) === 0,
                      sorter: (a, b) => a.name.length - b.name.length,
                    },
                  ]}
                  dataSource={roomVariants}
                  rowSelection={{
                    selectedRowKeys: sLVariant,
                    onChange: handleChangeTableVariant,
                  }}
                />
              </div>
            </Collapse>

            {/* Discounts */}
            <ListItem button onClick={() => handleListCLick("Discounts")}>
              <ListItemText primary="Discounts" />
              {visible[3].open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={visible[3].open} timeout="auto" unmountOnExit>
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
                      filters: discounts,
                      onFilter: (value, record) =>
                        record.value.indexOf(value) === 0,
                      sorter: (a, b) => a.name.length - b.name.length,
                    },
                  ]}
                  dataSource={discounts}
                  rowSelection={{
                    selectedRowKeys: sLDiscount,
                    onChange: handleChangeTableDiscount,
                  }}
                />
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

export default BhByRoomDrawer;
