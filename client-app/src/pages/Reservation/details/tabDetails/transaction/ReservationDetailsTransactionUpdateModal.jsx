import { Modal } from "antd";
import { useSnackbar } from "notistack";
import { useMountedState } from "react-use";
import React, { useState, useEffect } from "react";
import MDialog from "./../../../../../common/MDialog";
import { makeStyles } from "@material-ui/core/styles";
import { ButtonGroup, List } from "@material-ui/core";
import Counter from "./../../../../../common/Counter";
import EcoTwoToneIcon from "@material-ui/icons/EcoTwoTone";
import AListItem from "./../../../../../common/antd/AListItem";
import { store } from "../../../../../utils/store/configureStore";
import MaterialButton from "./../../../../../common/MaterialButton";
import FastfoodTwoToneIcon from "@material-ui/icons/FastfoodTwoTone";
import PieChartTwoToneIcon from "@material-ui/icons/PieChartTwoTone";
import AAutoComplete from "./../../../../../common/select/AAutoComplete";
import ReservationApprovalRemark from "./../../../../../common/ReservationApprovalRemark";
import { toggleModifyProduct } from "../../../../../utils/store/pages/reservationDetails";
import { getDiscounts } from "./../../../../../utils/services/pages/functionality/DiscountService";
import { UpdateDiscountData } from "../../../../../utils/services/pages/reservation/ReservationTrans";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    fontSize: "14px",
  },
  actionsContainer: {},
  resetContainer: {},
  button__wrapper: {
    display: "flex",
    justifyContent: "flex-end",
  },
  labelSpan: {
    fontWeight: 400,
    fontSize: "15px",
    fontFamily: `"Poppins", sans-serif`,
  },
}));

const ReservationDetailsTransactionUpdateModal = ({
  onVisible,
  visible,
  selectedTrans,
  isTrans,
  onSuccessRequestApproval,
}) => {
  //..
  const isMounted = useMountedState();
  const [senior, setSenior] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const [discounts, setDiscounts] = useState(0);

  const [netDiscount, setNetDiscount] = useState(0);
  const [requestOnGoing, setRequestOnGoing] = useState(false);
  const [selectedDiscount, setSelectedDiscount] = useState({});
  const [askConfirmation, setAskConfirmation] = useState(false);
  const [transObj, setTransObj] = useState({
    transId: 0,
    discountId: null,
    seniorPax: 0,
    netDiscount: 0,
  });
  const [askConfirmationApproval, setAskConfirmationApproval] = useState({
    value: false,
    action: "DELETE",
  });

  const { product, quantity, seniorPax, discount } = selectedTrans;

  useEffect(() => {
    setSenior(seniorPax);

    if (discount === null)
      return setSelectedDiscount({ _id: 0, name: "Not Applicable" });

    setSelectedDiscount(discount);
  }, [seniorPax, discount]);

  const objViewModel = () => {
    const discountId = selectedDiscount._id === 0 ? null : selectedDiscount._id;
    const grossAmount =
      selectedTrans.product.sellingPrice * selectedTrans.quantity;
    const netAmount = grossAmount - netDiscount;

    const obj = {
      transId: selectedTrans._id,
      seniorPax: senior,
      netDiscount: netDiscount,
      discountId: discountId,
      grossAmount: grossAmount,
      netAmount: netAmount,
    };

    return obj;
  };

  useEffect(() => {
    async function populateDiscounts() {
      try {
        const { data } = await getDiscounts(true);

        const { listRecords } = data;

        const sortedPayment = listRecords.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        if (!isMounted()) return;
        setDiscounts([{ _id: 0, name: "Not Applicable" }, ...sortedPayment]);
      } catch (error) {
        enqueueSnackbar("0049: An error occured in the server.", {
          variant: "error",
        });
      }
    }

    populateDiscounts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleIncrement = (action) => {
    const totalHeads = product.numberOfServing * quantity;
    if (action === "add") {
      if (totalHeads <= senior) return;
      return setSenior(senior + 1);
    }
    setSenior(senior - 1);
  };

  useEffect(() => {
    if (selectedTrans.length === 0 || Object.keys(selectedTrans).length === 0)
      return null;

    //..GROSS AMOUNT
    const totalHeadsForDiscount = product.numberOfServing * quantity;
    const grossAmount = quantity * product.sellingPrice;
    //..NET DISCOUNT
    const { _id, value } = selectedDiscount;

    const amtHalf = grossAmount / totalHeadsForDiscount;

    let accumulatedDisc = 0;

    if (senior === 0 && _id === 0) return setNetDiscount(0);

    if (senior !== 0) {
      const amtMulSenior = amtHalf * senior;

      accumulatedDisc += Math.round(amtMulSenior * 0.2);
    }

    if (_id !== 0) {
      const totalHeadsNoSenr =
        (product.numberOfServing * quantity - senior) * amtHalf;
      accumulatedDisc += Math.round(totalHeadsNoSenr * (value / 100));
    }

    setNetDiscount(accumulatedDisc);
  }, [selectedDiscount, senior]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleModify = (e) => {
    e.preventDefault();

    const currentUser = store.getState().entities.user.user;

    if (currentUser.role.rolename !== "Administrator") {
      setTransObj(objViewModel());

      return setAskConfirmationApproval({
        action: "MODIFY",
        value: true,
      });
    }

    setAskConfirmation(true);
  };

  const handleOk = async () => {
    //
    setAskConfirmation(false);
    setRequestOnGoing(true);

    const discountId = selectedDiscount._id === 0 ? null : selectedDiscount._id;

    const obj = {
      transId: selectedTrans._id,
      seniorPax: senior,
      netDiscount: netDiscount,
      discountId: discountId,
    };

    try {
      await UpdateDiscountData(obj);

      enqueueSnackbar("Successfully updated records!", { variant: "success" });

      store.dispatch(toggleModifyProduct(obj));
      setRequestOnGoing(false);
      onVisible({ value: false, action: "cancel" });
    } catch (ex) {
      setRequestOnGoing(false);

      if (ex && ex.status === 400)
        enqueueSnackbar("0065: " + ex.data, { variant: "error" });
    }
  };
  const onSelectChange = (value, e) => setSelectedDiscount(e.obj);

  const Footer = () => {
    const classes = useStyles();

    if (isTrans) return null;
    if (selectedTrans.length === 0 || selectedTrans === undefined) return null;

    if (selectedTrans.approvalStatus === 1) return null;

    return (
      <ButtonGroup
        className={classes.button}
        variant="text"
        color="primary"
        aria-label="text primary button group"
      >
        <MaterialButton
          className={classes.button}
          size="small"
          disabled={requestOnGoing}
          onClick={handleModify}
          color="secondary"
          text="MODIFY"
        />
      </ButtonGroup>
    );
  };
  const handleDialogCancel = () => {
    if (visible.action !== "add")
      setAskConfirmationApproval({
        action: "DELETE",
        value: false,
      });
    setAskConfirmation(false);
  };

  const renderBody = () => {
    return (
      <List component="nav" aria-label="mailbox folders">
        <AListItem
          txtLbl="Product"
          txtValue={product.longName}
          Icon={FastfoodTwoToneIcon}
        />

        <AListItem
          txtLbl="Number of Serving"
          txtValue={product.numberOfServing}
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
      </List>
    );
  };
  if (selectedTrans.length === 0 || Object.keys(selectedTrans).length === 0)
    return null;

  return (
    <>
      <ReservationApprovalRemark
        approvalType="trans"
        visible={askConfirmationApproval}
        onSuccessRequestApproval={onSuccessRequestApproval}
        onCancel={handleDialogCancel}
        onCancelWholeDialog={() =>
          onVisible({ value: false, action: "cancel" })
        }
        values={transObj}
      />
      {askConfirmation && (
        <MDialog
          openDialog={askConfirmation}
          handleClose={() => setAskConfirmation(false)}
          handleOk={handleOk}
        />
      )}
      <Modal
        title="Modify Transaction"
        centered
        visible={visible.action === "update" && visible.value}
        onOk={onVisible}
        onCancel={() => onVisible({ value: false, action: "cancel" })}
        footer={<Footer />}
      >
        {renderBody()}
      </Modal>
    </>
  );
};

export default ReservationDetailsTransactionUpdateModal;
