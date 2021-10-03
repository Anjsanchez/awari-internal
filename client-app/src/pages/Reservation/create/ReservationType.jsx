import { Input } from "antd";
import { Select } from "antd";
import "./css/ReservationType.css";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import { store } from "../../../utils/store/configureStore";
import { writeToken } from "../../../utils/store/pages/users";
import { headerTypeAdded } from "../../../utils/store/pages/createReservation";
import { GetTravelAgency } from "./../../../utils/services/pages/others/TravelAgencyService";
import { GetReservationTypes } from "./../../../utils/services/pages/reservation/ReservationType";

const ReservationType = React.memo(() => {
  const { enqueueSnackbar } = useSnackbar();
  const [travelAgency, setTravelAgency] = useState([]);
  const [reservationTypes, setReservationTypes] = useState([]);
  const [selectedType, setSelectedType] = useState({
    name: "",
    key: "",
    voucher: "",
    agency: "",
  });

  const onSelectChange = (value, e) =>
    setSelectedType((n) => ({ ...n, name: e.value, key: e.key }));

  const onSelectChangeAgency = (value, e) =>
    setSelectedType((n) => ({ ...n, agency: e.value }));

  const handleVoucherChange = (e) =>
    setSelectedType((n) => ({ ...n, voucher: e.target.value }));

  const typeInStore = useSelector(
    (state) => state.entities.createReservation.header
  );

  useEffect(() => {
    async function populateReservationTypes() {
      try {
        const { data } = await GetReservationTypes();

        const { token, listRecords } = data;

        const sortedPayment = listRecords.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        store.dispatch(writeToken({ token }));

        setReservationTypes(sortedPayment);
      } catch (error) {
        enqueueSnackbar("0020: An error occured in the server.", {
          variant: "error",
        });
      }
    }

    function initialLoadValues() {
      const { type, voucher } = typeInStore;
      const { name, key } = type;

      if (name === "" || name === null) return;

      setSelectedType({
        name,
        key,
        voucher,
      });
    }

    async function populateTravelAgency() {
      try {
        const { data } = await GetTravelAgency();

        const sortData = data.sort((a, b) => a.name.localeCompare(b.name));

        setTravelAgency(sortData);
      } catch (error) {
        enqueueSnackbar("0019: An error occured in the server.", {
          variant: "error",
        });
      }
    }
    populateTravelAgency();
    populateReservationTypes();
    initialLoadValues();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    store.dispatch(headerTypeAdded(selectedType));
  }, [selectedType]);

  const renderTravelAgency = (d) => {
    if (d !== "ota/travel agency") return null;
    return (
      <div className="remark__container">
        <div className="remark__wrapper">
          <div className="header-label__wrapper">
            <label htmlFor="voucher">AGENCY</label>
          </div>
          <div className="remark-input__wrapper">
            <Select
              id="res-type"
              className="reservationtype__select"
              showSearch
              placeholder="Select a person"
              optionFilterProp="children"
              onChange={onSelectChangeAgency}
              value={selectedType.agency}
              filterSort={(optionA, optionB) =>
                optionA.children
                  .toLowerCase()
                  .localeCompare(optionB.children.toLowerCase())
              }
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
              {travelAgency.map((n) => (
                <Select.Option value={n.name} key={n._id}>
                  {n.name}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
    );
  };
  const conditionA = () => {
    if (
      selectedType.name === null ||
      selectedType.name === "" ||
      selectedType.name === undefined
    )
      return null;

    const typeInlower = selectedType.name.toLowerCase();

    if (
      typeInlower === "day tour" ||
      typeInlower === "walk in" ||
      typeInlower === "restaurant"
    )
      return null;

    return (
      <>
        {renderTravelAgency(typeInlower)}
        <div className="remark__container">
          <div className="remark__wrapper">
            <div className="header-label__wrapper">
              <label htmlFor="voucher">VOUCHER</label>
            </div>
            <div className="remark-input__wrapper">
              <Input
                id="voucher"
                size="large"
                key="voucher"
                value={selectedType.voucher}
                onChange={handleVoucherChange}
              />
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="reservationtype-container">
      <div className="header-label__wrapper">
        <label htmlFor="res-type">RESERVATION TYPE</label>
      </div>
      <Select
        id="res-type"
        className="reservationtype__select"
        showSearch
        placeholder="Select a person"
        optionFilterProp="children"
        onChange={onSelectChange}
        value={selectedType.name}
        filterSort={(optionA, optionB) =>
          optionA.children
            .toLowerCase()
            .localeCompare(optionB.children.toLowerCase())
        }
        filterOption={(input, option) =>
          option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
        }
      >
        {reservationTypes.map((n) => (
          <Select.Option value={n.name} key={n._id}>
            {n.name}
          </Select.Option>
        ))}
      </Select>
      {conditionA()}
    </div>
  );
});

export default ReservationType;
