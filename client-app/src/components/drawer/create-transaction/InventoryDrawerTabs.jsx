import React from "react";
import { Tabs, Tab } from "@material-ui/core";

const InventoryDrawerTabs = ({ onChange, value, items }) => {
  return (
    <div className="id-tabs__container">
      <Tabs
        value={value}
        onChange={onChange}
        variant="scrollable"
        scrollButtons="on"
        indicatorColor="primary"
        textColor="primary"
        aria-label="scrollable force tabs example"
      >
        {items.map((n) => (
          <Tab label={n.name} key={n._id} value={n._id} />
        ))}
      </Tabs>
    </div>
  );
};

export default InventoryDrawerTabs;
