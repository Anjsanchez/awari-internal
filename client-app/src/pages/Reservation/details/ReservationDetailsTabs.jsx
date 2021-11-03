import React from "react";
import Tab from "@material-ui/core/Tab";
import "./css/ReservationDetailsTabs.css";
import Tabs from "@material-ui/core/Tabs";
import WatchLaterTwoToneIcon from "@material-ui/icons/WatchLaterTwoTone";
import FolderOpenTwoToneIcon from "@material-ui/icons/FolderOpenTwoTone";
import ReservationDetailsTabDetails from "./tabDetails/ReservationDetailsTabDetails";
import ReservationTimeLine from "./tabDetails/timeline/ReservationTimeLine";

const ReservationDetailsTabs = (props) => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => setValue(newValue);

  const TabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`nav-tabpanel-${index}`}
        aria-labelledby={`nav-tab-${index}`}
        {...other}
      >
        {value === index && <>{children}</>}
      </div>
    );
  };

  return (
    <>
      <div className="details-tab__wrapper">
        <div>
          <Tabs
            TabIndicatorProps={{ style: { background: "#42A5F5" } }}
            value={value}
            onChange={handleChange}
            variant="fullWidth"
            indicatorColor="secondary"
            textColor="secondary"
            aria-label="icon label tabs example"
          >
            <Tab icon={<FolderOpenTwoToneIcon />} label="DETAILS" />
            <Tab icon={<WatchLaterTwoToneIcon />} label="TIMELINE" />
          </Tabs>
        </div>
      </div>
      <TabPanel value={value} index={0}>
        <ReservationDetailsTabDetails />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ReservationTimeLine />
      </TabPanel>
    </>
  );
};

export default ReservationDetailsTabs;
