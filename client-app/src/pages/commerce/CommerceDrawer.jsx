import { useSnackbar } from "notistack";
import List from "@material-ui/core/List";
import { Drawer, Divider, Radio } from "antd";
import ListItem from "@material-ui/core/ListItem";
import Collapse from "@material-ui/core/Collapse";
import React, { useState, useEffect } from "react";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import GuestChecker from "./../../common/GuestChecker";
import { store } from "../../utils/store/configureStore";
import ListItemText from "@material-ui/core/ListItemText";
import CommerceTimeline from "./Transactions/CommerceTimeline";
import CommerceTransaction from "./Transactions/CommerceTransaction";
import { Grid, Checkbox, FormControlLabel, Button } from "@material-ui/core";
import { getTransLineByUserId } from "./../../utils/services/pages/reservation/ReservationTrans";

const CommerceDrawer = ({
  isFilterDrawerShow,
  onFilterShow,
  categories,
  types,
  setSelectedTypes,
  setSelectedCategory,
  setSelectedPrice,
  onFilterSearch,
}) => {
  const [value, setValue] = useState(0);
  const [trans, setTrans] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [showModal, setShowModal] = useState(false);
  const [localSTypes, setLocalSTypes] = useState([]);
  const [localSCategs, setLocalSCategs] = useState([]);
  const [showTimeline, setShowTimeline] = useState(false);
  const [showModalTransaction, setShowModalTransaction] = useState(false);
  const [visible, setVisible] = useState([
    { id: "Classification", open: false },
    { id: "prices", open: false },
    { id: "Location", open: false },
  ]);

  const onChange = (e) => {
    setSelectedPrice(e.target.value);
    setValue(e.target.value);
  };

  const onClearFilter = () => {
    setLocalSCategs([]);
    setSelectedCategory([]);
    setSelectedTypes([]);
    setSelectedPrice([]);
    setLocalSTypes([]);
    setValue(0);
    onFilterSearch(null, false, true);
  };

  const handleCheckboxCheck = (name) => {
    var xtype = [...localSTypes];
    const index = xtype.findIndex((x) => x === name);

    if (index === -1) {
      setLocalSTypes([...localSTypes, name]);
      return setSelectedTypes([...localSTypes, name]);
    }

    const filtered = xtype.filter((n) => n !== name);
    setLocalSTypes(filtered);
    setSelectedTypes(filtered);
  };

  const handleCategsCheck = (name) => {
    var xtype = [...localSCategs];
    const index = xtype.findIndex((x) => x === name);

    if (index === -1) {
      setLocalSCategs([...localSCategs, name]);
      return setSelectedCategory([...localSCategs, name]);
    }

    const filtered = xtype.filter((n) => n !== name);
    setLocalSCategs(filtered);
    setSelectedCategory(filtered);
  };

  const handleListCLick = (id) => {
    var visi = [...visible];
    var foundIndex = visible.findIndex((x) => x.id === id);
    visi[foundIndex].open = !visi[foundIndex].open;
    setVisible(visi);
  };

  useEffect(() => {
    const getRecords = async () => {
      const { id } = store.getState().entities.user.user;

      try {
        const { data } = await getTransLineByUserId(id);

        const sorted = data.listRecords.sort(function (a, b) {
          return new Date(a.createdDate) - new Date(b.createdDate);
        });

        setTrans(sorted);
      } catch (error) {
        enqueueSnackbar("0071: An error occured.", {
          variant: "error",
        });
      }
    };

    getRecords();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <GuestChecker visible={showModal} setOnVisible={setShowModal} />
      <CommerceTimeline
        trans={trans}
        visible={showTimeline}
        setOnVisible={setShowTimeline}
      />
      <CommerceTransaction
        trans={trans}
        setTrans={setTrans}
        visible={showModalTransaction}
        setOnVisible={setShowModalTransaction}
      />
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
            {/* TYPES */}
            <ListItem button onClick={() => handleListCLick("Classification")}>
              <ListItemText primary="Classification" />
              {visible[0].open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={visible[0].open} timeout="auto" unmountOnExit>
              <div className="cd-category__container">
                <Grid container spacing={1}>
                  {types.map((n) => (
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

            <ListItem button onClick={() => handleListCLick("prices")}>
              <ListItemText primary="Price" />
              {visible[1].open ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={visible[1].open} timeout="auto" unmountOnExit>
              <div className="cd-prices__container">
                <Radio.Group onChange={onChange} value={value}>
                  <Grid container spacing={1}>
                    <Grid item xs={6}>
                      <Radio value={0}>
                        <span className="cd-prices__span">ALL PRICES</span>
                      </Radio>
                    </Grid>
                    <Grid item xs={6}>
                      <Radio value={3}>
                        <span className="cd-prices__span">₱100 - ₱300</span>
                      </Radio>
                    </Grid>
                    <Grid item xs={6}>
                      <Radio value={5}>
                        <span className="cd-prices__span">₱300 - ₱500</span>
                      </Radio>
                    </Grid>
                    <Grid item xs={6}>
                      <Radio value={7}>
                        <span className="cd-prices__span">₱500 - ₱700</span>
                      </Radio>
                    </Grid>
                    <Grid item xs={6}>
                      <Radio value={9}>
                        <span className="cd-prices__span">₱700 - ₱900</span>
                      </Radio>
                    </Grid>
                    <Grid item xs={6}>
                      <Radio value={10}>
                        <span className="cd-prices__span">Over ₱1,000</span>
                      </Radio>
                    </Grid>
                  </Grid>
                </Radio.Group>
              </div>
            </Collapse>

            {/* CATEGORY */}
            <ListItem button onClick={() => handleListCLick("Location")}>
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
            </Collapse>
          </List>

          <div className="cd-button__container">
            <Button
              variant="contained"
              color="primary"
              onClick={() => onFilterSearch(null, false)}
            >
              Search
            </Button>
          </div>
          <div className="cd-button__container">
            <Button
              variant="contained"
              color="primary"
              onClick={() => onClearFilter()}
            >
              Clear All
            </Button>
          </div>

          <Divider className="cd-button__container div" />
          <div className="cd-button__container">
            <span className="com-title__leftSpan"> Actions</span>
          </div>
          <div className="cd-button__container gc">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowModal(true)}
            >
              Guest Checker
            </Button>
          </div>
          <div className="cd-button__container gc">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowTimeline(true)}
            >
              Transaction Timeline
            </Button>
          </div>
          <div className="cd-button__container gc">
            <Button
              variant="contained"
              color="primary"
              onClick={() => setShowModalTransaction(true)}
            >
              My Transactions
            </Button>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default CommerceDrawer;
