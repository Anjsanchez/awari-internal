import { Drawer } from "antd";
import React from "react";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { Radio } from "antd";
import { Grid, Checkbox, FormControlLabel } from "@material-ui/core";

const CommerceDrawer = ({ isFilterDrawerShow, onFilterShow }) => {
  const [open, setOpen] = React.useState({ id: "", open: false });
  const [value, setValue] = React.useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };
  const handleClick = (id) =>
    id === open.id && open.open
      ? setOpen({ id, open: false })
      : setOpen({ id, open: true });

  return (
    <div>
      <Drawer
        placement="right"
        closable={false}
        className="cd__drawer-container"
        width={"auto"}
        onClose={onFilterShow}
        visible={isFilterDrawerShow}
      >
        <div className="cd__container">
          <List component="nav" aria-labelledby="nested-list-subheader">
            <ListItem button onClick={() => handleClick("categories")}>
              <ListItemText primary="Categories" />
              {open.open && open.id === "categories" ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
            <Collapse
              in={open.open && open.id === "categories"}
              timeout="auto"
              unmountOnExit
            >
              <div className="cd-category__container">
                <Grid container spacing={1}>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={<Checkbox name="checkedB" color="primary" />}
                      label="Primary"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <FormControlLabel
                      control={<Checkbox name="checkedB" color="primary" />}
                      label="Primary"
                    />
                  </Grid>
                </Grid>
              </div>
            </Collapse>

            <ListItem button onClick={() => handleClick("price")}>
              <ListItemText primary="Price" />
              {open.open && open.id === "price" ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItem>
            <Collapse
              in={open.open && open.id === "price"}
              timeout="auto"
              unmountOnExit
            >
              <div className="cd-prices__container">
                <Radio.Group onChange={onChange} value={value}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Radio value={1}>
                        <span className="cd-prices__span"> Below ₱100</span>
                      </Radio>
                    </Grid>
                    <Grid item xs={6}>
                      <Radio value={2}>
                        <span className="cd-prices__span">₱100 - ₱200</span>
                      </Radio>
                    </Grid>
                    <Grid item xs={6}>
                      <Radio value={3}>
                        <span className="cd-prices__span">₱200 - ₱400</span>
                      </Radio>
                    </Grid>
                    <Grid item xs={6}>
                      <Radio value={4}>
                        <span className="cd-prices__span">₱400 - ₱500</span>
                      </Radio>
                    </Grid>
                    <Grid item xs={6}>
                      <Radio value={5}>
                        <span className="cd-prices__span">₱500 - ₱1,000</span>
                      </Radio>
                    </Grid>
                    <Grid item xs={6}>
                      <Radio value={6}>
                        <span className="cd-prices__span">Over ₱1,000</span>
                      </Radio>
                    </Grid>
                  </Grid>
                </Radio.Group>
              </div>
            </Collapse>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

export default CommerceDrawer;
