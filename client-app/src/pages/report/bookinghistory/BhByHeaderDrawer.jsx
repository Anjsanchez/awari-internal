import { Radio } from "antd";
import { Drawer, Table } from "antd";
import React, { useState } from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import ListItemText from "@material-ui/core/ListItemText";
import { Grid, Checkbox, FormControlLabel, Button } from "@material-ui/core";

const BhByHeaderDrawer = ({
  reservationType,
  customers,
  customersFiltr,
  isFilterDrawerShow,
  onFilterShow,
}) => {
  const [value, setValue] = useState(0);
  const [localSTypes, setLocalSTypes] = useState([]);
  const [localSCategs, setLocalSCategs] = useState([]);
  const [visible, setVisible] = useState([
    { id: "Reservation Types", open: false },
    { id: "customers", open: false },
    { id: "Location", open: false },
  ]);

  const onClearFilter = () => {
    // setSelectedCategory([]);
    // setSelectedTypes([]);
    // setSelectedPrice([]);
    setLocalSTypes([]);
    setValue(0);
  };

  const onChange = (e) => {
    // setSelectedPrice(e.target.value);
    setValue(e.target.value);
  };

  const handleCheckboxCheck = (name) => {
    var xtype = [...localSTypes];
    const index = xtype.findIndex((x) => x === name);

    if (index === -1) {
      return setLocalSTypes([...localSTypes, name]);
      // return setSelectedTypes([...localSTypes, name]);
    }

    const filtered = xtype.filter((n) => n !== name);
    setLocalSTypes(filtered);
    //   setSelectedTypes(filtered);
  };

  const handleListCLick = (id) => {
    var visi = [...visible];
    var foundIndex = visible.findIndex((x) => x.id === id);
    visi[foundIndex].open = !visi[foundIndex].open;
    setVisible(visi);
  };

  return (
    <div>
      <Drawer
        placement="right"
        closable={false}
        className="cd__drawer-container"
        width={350}
        onClose={onFilterShow}
        visible={isFilterDrawerShow}
      >
        <div className="cd__container bh">
          <List component="nav" aria-labelledby="nested-list-subheader">
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
                              localSTypes.indexOf(n.name) === -1 ? false : true
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

            <ListItem button onClick={() => handleListCLick("customers")}>
              <ListItemText primary="Customers" />
              {visible[1].open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={visible[1].open} timeout="auto" unmountOnExit>
              <div className="cd-prices__container bh">
                {console.log(customersFiltr)}
                <Table
                  size="small"
                  bordered
                  rowSelection={{}}
                  columns={[
                    {
                      name: "key",
                      dataIndex: "name",
                      filters: customers,
                      // {
                      //   text: "Adrian",
                      //   value: "Adrian",
                      // },
                      onFilter: (value, record) => {
                        console.log(value);
                        return record.name.indexOf(value) === 0;
                      },
                      sorter: (a, b) => a.name.length - b.name.length,
                    },
                  ]}
                  dataSource={customers}
                />
              </div>
            </Collapse>

            {/* CATEGORY */}
            {/* <ListItem button onClick={() => handleListCLick("Location")}>
          <ListItemText primary="Location" />
          {visible[2].open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={visible[2].open} timeout="auto" unmountOnExit>
          <div className="cd-category__container">
            <Grid container spacing={1}>
              {categories.map((n) => (
                <Grid item xs={6} key={n._id}>
                  <FormControlLabel
                    control={<Checkbox name="checkedB" color="primary" />}
                    label={n.name}
                    checked={
                      localSCategs.indexOf(n.name) === -1 ? false : true
                    }
                    onChange={() => handleCategsCheck(n.name)}
                  />
                </Grid>
              ))}
            </Grid>
          </div>
        </Collapse> */}
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
