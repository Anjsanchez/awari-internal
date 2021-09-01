import moment from "moment";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { store } from "../../utils/store/configureStore";
import { writeToken } from "../../utils/store/pages/users";
import { getCustomers } from "./../../utils/services/pages/CustomerService";

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
    color: "#484848",
    fontWeight: 300,
    fontSize: "14px",
    fontFamily: `"Poppins", sans-serif`,
  },
  groupLabel: {
    fontSize: "0.875rem;",
  },
  root: {
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#D9D9D9",
      },
      "&:hover fieldset": {
        borderColor: "#40a9ff",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#40a9ff",
      },
    },
  },
}));

const SelectTransactionLinesRooms = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();
  const [customers, setCustomers] = useState([]);
  const [searchCustomer, setSearchCustomer] = useState({});

  useEffect(() => {
    async function populateReservationTypes() {
      try {
        const { data } = await getCustomers();

        const { token, listRecords } = data;

        const sortedData = listRecords.sort((a, b) =>
          a.firstName.localeCompare(b.firstName)
        );

        store.dispatch(writeToken({ token }));

        setCustomers(sortedData);
      } catch (error) {
        console.log(error);
        enqueueSnackbar(
          "An error occured while fetching the reservation type in the server.",
          {
            variant: "error",
          }
        );
      }
    }
    populateReservationTypes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const options = customers.map((option) => {
    const firstLetter = option["firstName"][0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  const handleSearch = (e, val) =>
    val === null ? setSearchCustomer({}) : setSearchCustomer(val);

  const custInStore = useSelector((state) => state.entities);

  useEffect(() => {
    const { customer } = custInStore.createReservation.header;

    return Object.keys(customer).length === 0
      ? setSearchCustomer({})
      : setSearchCustomer(customer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   // if (action === "createReservation")
  //   //   store.dispatch(headerCustomerAdded(searchCustomer));
  //   // else if (action === "inventoryTransaction")
  //   //   store.dispatch(toggleCustomeAdded(searchCustomer));
  // }, [searchCustomer]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderSpace = (text) =>
    text.firstName === "" || text.firstName === null ? "" : " ";

  const renderValue = () =>
    Object.keys(searchCustomer).length === 0 ? null : searchCustomer;

  return (
    <div>
      <div className="header-label__wrapper">
        <label htmlFor="grouped-demo">ROOM</label>
      </div>
      <Autocomplete
        value={renderValue()}
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
        getOptionLabel={(option) =>
          option["firstName"] + renderSpace(option) + option["lastName"]
        }
        renderInput={(params) => (
          <TextField {...params} variant="outlined" className={classes.root} />
        )}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SelectTransactionLinesRooms;
