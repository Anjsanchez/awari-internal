import { Modal } from "antd";
import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import Counter from "./../../common/Counter";
import { List, Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import AListItem from "./../../common/antd/AListItem";
import { store } from "../../utils/store/configureStore";
import { writeToken } from "../../utils/store/pages/users";
import EcoTwoToneIcon from "@material-ui/icons/EcoTwoTone";
import AAutoComplete from "./../../common/select/AAutoComplete";
import FastfoodTwoToneIcon from "@material-ui/icons/FastfoodTwoTone";
import PieChartTwoToneIcon from "@material-ui/icons/PieChartTwoTone";
import { getDiscounts } from "./../../utils/services/pages/functionality/DiscountService";

const CartDiscount = ({ showModal, handleCancelModal, selectedProduct }) => {
  const isMounted = useMountedState();
  const [senior, setSenior] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [discounts, setDiscounts] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState({});

  const { longName, numberOfServing, quantity } = selectedProduct;

  useEffect(() => {
    setSenior(0);
    setSelectedDiscount({});
  }, [showModal]);

  const onSelectChange = (value, e) => setSelectedDiscount(e.obj);

  useEffect(() => {
    async function populateDiscounts() {
      try {
        const { data } = await getDiscounts();

        const { token, listRecords } = data;

        console.log(listRecords);
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

    populateDiscounts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleIncrement = (action) => {
    const totalHeads = numberOfServing * quantity;

    if (action === "add") {
      if (totalHeads <= senior) return;
      return setSenior(senior + 1);
    }

    setSenior(senior - 1);
  };

  return (
    <>
      <Modal
        className="cd-modal__wrapper"
        title="Item Discount"
        visible={showModal}
        onOk={handleCancelModal}
        onCancel={handleCancelModal}
        footer={null}
      >
        <List component="nav" aria-label="mailbox folders">
          <AListItem
            txtLbl="Product"
            txtValue={longName}
            Icon={FastfoodTwoToneIcon}
          />
          <AListItem
            txtLbl="Number of Serving"
            txtValue={numberOfServing}
            Icon={PieChartTwoToneIcon}
          />
          <AListItem
            txtLbl="Quantity"
            txtValue={quantity}
            Icon={EcoTwoToneIcon}
            hasDivider={false}
          />

          <div className="cd-mattress__war">
            <Counter
              name="Senior"
              onIncrement={() => handleIncrement("add")}
              counterV={senior}
              onDecrement={handleIncrement}
            />
          </div>
          <div className="cd-mattress__autoComplete">
            <AAutoComplete
              label="DISCOUNTS"
              onSelectChange={onSelectChange}
              selectedData={selectedDiscount}
              data={discounts}
            />
          </div>

          <div className="cd-mattress__button">
            <div className="cf-button__container">
              <Button variant="contained" color="primary">
                Save Discount
              </Button>
            </div>
          </div>
        </List>
      </Modal>
    </>
  );
};

export default CartDiscount;
