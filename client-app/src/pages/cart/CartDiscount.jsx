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
import MaterialTextField from "./../../common/MaterialTextField";
import FastfoodTwoToneIcon from "@material-ui/icons/FastfoodTwoTone";
import PieChartTwoToneIcon from "@material-ui/icons/PieChartTwoTone";
import { toggleAddCartDiscount } from "../../utils/store/pages/createTransaction";
import { getDiscounts } from "./../../utils/services/pages/functionality/DiscountService";

const CartDiscount = ({ showModal, handleCancelModal, selectedProduct }) => {
  const isMounted = useMountedState();
  const [senior, setSenior] = useState(0);
  const [remark, setRemark] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [discounts, setDiscounts] = useState(0);
  const [netDiscount, setNetDiscount] = useState(0);
  const [selectedDiscount, setSelectedDiscount] = useState({});
  const { longName, numberOfServing, quantity, sellingPrice } = selectedProduct;

  useEffect(() => {
    if (showModal === false) return;

    setSelectedDiscount(selectedProduct.discount);
    setNetDiscount(selectedProduct.netDiscount);
    setSenior(selectedProduct.seniorPax);
    setRemark(selectedProduct.remark);
  }, [showModal]); // eslint-disable-line react-hooks/exhaustive-deps

  const onSelectChange = (value, e) => setSelectedDiscount(e.obj);

  useEffect(() => {
    async function populateDiscounts() {
      try {
        const { data } = await getDiscounts(true);

        const { token, listRecords } = data;

        const sortedPayment = listRecords.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        if (isMounted()) {
          store.dispatch(writeToken({ token }));
          setDiscounts([{ _id: 0, name: "Not Applicable" }, ...sortedPayment]);
        }
      } catch (error) {
        enqueueSnackbar("0028: An error occured in the server.", {
          variant: "error",
        });
      }
    }

    populateDiscounts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSaveDiscount = () => {
    store.dispatch(
      toggleAddCartDiscount({
        discount: selectedDiscount,
        seniorPax: senior,
        netDiscount: netDiscount,
        product: selectedProduct,
        remark: remark,
      })
    );

    enqueueSnackbar("Successfully added a discount!", {
      variant: "success",
    });
    handleCancelModal();
  };

  const handleRemarkChange = (n) => setRemark(n.target.value);

  useEffect(() => {
    //..GROSS AMOUNT
    const totalHeadsForDiscount = numberOfServing * quantity;
    const grossAmount = quantity * sellingPrice;
    //..NET DISCOUNT
    const { _id, value, name } = selectedDiscount;

    const amtHalf = grossAmount / totalHeadsForDiscount;

    let accumulatedDisc = 0;

    if (senior === 0 && _id === 0) return setNetDiscount(0);

    //Vat Free Discount Calculation
    if (
      (selectedDiscount !== null || _id !== 0) &&
      (selectedDiscount.name != undefined || selectedDiscount.name != null) &&
      selectedDiscount.name.toLowerCase().includes("vat free")
    ) {
      const discAmount12 = Math.round(grossAmount / 1.12);
      const discAmount20 = Math.round(grossAmount - discAmount12 * 0.88);

      accumulatedDisc += Math.round(discAmount20);

      setNetDiscount(accumulatedDisc);
      // we return it out of the function because theorically, no vat and senior discount can go all at the same time
      return;
    }

    //Senior Discount Calculation
    if (senior !== 0) {
      const amtMulSenior = amtHalf * senior;

      const discAmount12 = Math.round(amtMulSenior / 1.12);
      const discAmount20 = Math.round(grossAmount - discAmount12 * 0.8);

      accumulatedDisc += Math.round(discAmount20);
    }

    if (_id !== 0) {
      const totalHeadsNoSenr = (numberOfServing * quantity - senior) * amtHalf;
      accumulatedDisc += Math.round(totalHeadsNoSenr * (value / 100));
    }

    setNetDiscount(accumulatedDisc);
  }, [selectedDiscount, senior]); // eslint-disable-line react-hooks/exhaustive-deps

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
              label="senior/PWD"
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

          <div className="cd-mattress__autoComplete">
            <MaterialTextField
              label="REMARK"
              id="remark"
              values={remark}
              handleChange={handleRemarkChange}
              type="text"
              multiline={true}
              size="small"
            />
          </div>

          <div className="cd-mattress__button">
            <div className="cf-button__container">
              <Button
                variant="contained"
                color="primary"
                onClick={handleSaveDiscount}
              >
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
