import { Select } from "antd";
import "./css/ReservationDiscount.css";
import { useSnackbar } from "notistack";
import { Grid } from "@material-ui/core";
import { useMountedState } from "react-use";
import React, { useEffect, useState } from "react";
import { store } from "../../../../../../utils/store/configureStore";
import { writeToken } from "../../../../../../utils/store/pages/users";
import { getDiscounts } from "./../../../../../../utils/services/pages/functionality/DiscountService";
import { roomLinesSelectedDiscountAdded } from "../../../../../../utils/store/pages/createReservation";

const ReservationDiscount = () => {
  const isMounted = useMountedState();
  const { enqueueSnackbar } = useSnackbar();
  const [discounts, setDiscounts] = useState([]);
  const [selectedDiscount, setSelectedDiscount] = useState({});

  const storeData = store.getState().entities.createReservation.rooms;

  useEffect(() => {
    async function populateDiscounts() {
      try {
        const { data } = await getDiscounts();

        const { token, listRecords } = data;

        const sortedPayment = listRecords.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        if (isMounted()) {
          store.dispatch(writeToken({ token }));
          setDiscounts([{ _id: 0, name: "Not Applicable" }, ...sortedPayment]);
        }
      } catch (error) {
        enqueueSnackbar(
          "An error occured while fetching the reservation type in the server.",
          {
            variant: "error",
          }
        );
      }
    }
    function populaterecords() {
      if (Object.keys(storeData.discount).length === 0) return;
      setSelectedDiscount(storeData.discount);
    }

    populateDiscounts();
    populaterecords();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const onSelectChange = (value, e) => {
    store.dispatch(roomLinesSelectedDiscountAdded(e.obj));
    setSelectedDiscount(e.obj);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <div className="reservationtype-container">
          <div className="header-label__wrapper">
            <label htmlFor="res-type">DISCOUNT TYPE</label>
          </div>
          <Select
            id="res-type"
            className="reservationtype__select"
            showSearch
            placeholder="Select a person"
            optionFilterProp="children"
            onChange={onSelectChange}
            value={selectedDiscount.name}
            filterSort={(optionA, optionB) =>
              optionA.children
                .toLowerCase()
                .localeCompare(optionB.children.toLowerCase())
            }
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {discounts.map((n) => (
              <Select.Option value={n.name} key={n._id} obj={n}>
                {n.name}
              </Select.Option>
            ))}
          </Select>
        </div>
      </Grid>
    </Grid>
  );
};

export default ReservationDiscount;
