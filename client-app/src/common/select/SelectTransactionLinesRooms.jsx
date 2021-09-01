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
import { GetRoomLines } from "./../../utils/services/pages/reservation/ReservationLines";

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
  const [rooms, setRooms] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [searchRoom, setSearchRoom] = useState({});

  const createTransaction = useSelector(
    (state) => state.entities.createTransaction
  );

  useEffect(() => {
    console.log(rooms);
  }, [createTransaction.customer]);

  useEffect(() => {
    async function populateReservationTypes() {
      try {
        const { data } = await GetRoomLines();

        const { token, listRecords } = data;

        const sortedData = listRecords.sort((a, b) =>
          a.room.roomLongName.localeCompare(b.room.roomLongName)
        );

        store.dispatch(writeToken({ token }));

        setRooms(sortedData);
      } catch (error) {
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

  const options = rooms.map((option) => {
    const firstLetter = option["room"]["roomLongName"][0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  const handleSearch = (e, val) =>
    val === null ? setSearchRoom({}) : setSearchRoom(val);

  const custInStore = useSelector((state) => state.entities);

  useEffect(() => {
    const { customer } = custInStore.createReservation.header;

    return Object.keys(customer).length === 0
      ? setSearchRoom({})
      : setSearchRoom(customer);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   // if (action === "createReservation")
  //   //   store.dispatch(headerCustomerAdded(searchCustomer));
  //   // else if (action === "inventoryTransaction")
  //   //   store.dispatch(toggleCustomeAdded(searchCustomer));
  // }, [searchCustomer]); // eslint-disable-line react-hooks/exhaustive-deps

  const renderValue = () =>
    Object.keys(searchRoom).length === 0 ? null : searchRoom;

  return (
    <div>
      <div className="header-label__wrapper">
        <label htmlFor="grouped-demo">ROOM</label>
      </div>
      <Autocomplete
        // value={renderValue()}
        classes={{
          option: classes.option,
          groupLabel: classes.groupLabel,
          inputRoot: classes.inputRoot,
        }}
        getOptionSelected={(option, value) => option._id === value._id}
        id="grouped-demo"
        options={options.sort(
          (a, b) => -b.room.roomLongName.localeCompare(a.room.roomLongName)
        )}
        groupBy={(option) => option.room.roomLongName}
        getOptionLabel={
          (option) => option.room.roomLongName
          // option.room.roomLongName + renderSpace(option) + option["lastName"]
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
