import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import { TextField } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { store } from "../../utils/store/configureStore";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { toggleRoomAdded } from "../../utils/store/pages/createTransaction";
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

const SelectTransactionLinesRooms = ({ customer, activeRoom }) => {
  const classes = useStyles();
  const isMounted = useMountedState();
  const [rooms, setRooms] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [searchedRoom, setSearchedRoom] = useState({});
  const [filteredRooms, setFilteredRooms] = useState([]);

  useEffect(() => {
    if (rooms.length === 0) return;
    const zz = rooms.filter(
      (n) => n.reservationHeader._id === customer.headerId
    );

    setSearchedRoom({});
    setFilteredRooms(zz);
  }, [customer]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    store.dispatch(toggleRoomAdded(searchedRoom));
  }, [searchedRoom]);

  useEffect(() => {
    async function populateReservationTypes() {
      try {
        const { data } = await GetRoomLines();
        const { listRecords } = data;
        listRecords.map((n) => {
          if (n.room === null)
            return (n.room = { roomLongName: n.remark, _id: n._id });

          return null;
        });

        const withOutNullValues = listRecords.filter((n) => n.room !== null);
        const sortedData = withOutNullValues.sort((a, b) =>
          a.room.roomLongName.localeCompare(b.room.roomLongName)
        );

        const zz = sortedData.filter(
          (n) => n.reservationHeader._id === customer.headerId
        );

        if (!isMounted()) return;

        setRooms(sortedData);
        setFilteredRooms(zz);
      } catch (error) {
        enqueueSnackbar("0027: An error occured in the server.", {
          variant: "error",
        });
      }
    }
    populateReservationTypes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const options = filteredRooms.map((option) => {
    const firstLetter = option["room"]["roomLongName"][0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  const handleSearch = (e, val) =>
    val === null ? setSearchedRoom({}) : setSearchedRoom(val);

  const renderValue = () =>
    Object.keys(searchedRoom).length === 0 ? null : searchedRoom;

  return (
    <div>
      <div className="header-label__wrapper">
        <label htmlFor="grouped-demo1">ROOM</label>
      </div>
      <Autocomplete
        value={renderValue()}
        classes={{
          option: classes.option,
          groupLabel: classes.groupLabel,
          inputRoot: classes.inputRoot,
        }}
        getOptionSelected={(option, value) =>
          option.room._id === value.room._id
        }
        id="grouped-demo1"
        options={options.sort(
          (a, b) => -b.room.roomLongName.localeCompare(a.room.roomLongName)
        )}
        groupBy={(option) => option.room.roomLongName}
        getOptionLabel={(option) => option.room.roomLongName}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" className={classes.root} />
        )}
        onChange={handleSearch}
      />
    </div>
  );
};

export default SelectTransactionLinesRooms;
