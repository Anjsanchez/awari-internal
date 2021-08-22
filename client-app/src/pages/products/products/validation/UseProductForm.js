import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";
import { store } from "../../../../utils/store/configureStore";
import { writeToken } from "../../../../utils/store/pages/users";
import {
  requestStarted,
  requestFinished,
} from "../../../../utils/store/pages/roomVariant";
import { saveProduct } from "../../../../utils/services/pages/products/ProductService";

const UseProductForm = (validate, onSuccessEdit, onSuccessAdd) => {
  //..
  const didMount = useRef(false);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [askConfirmation, setAskConfirmation] = useState(false);

  const [values, setValues] = useState({
    id: "",
    shortName: "",
    longName: "",
    numberOfServing: "",
    costPrice: "0",
    sellingPrice: "",
    productCategoryId: "",
    isActive: false,
    isActivityType: false,
    createdBy: "",
    createdDate: "",
  });

  const handleValueOnLoad = (product) => {
    setValues({
      id: product._id || "",
      shortName: product.shortName || "",
      longName: product.longName || "",
      numberOfServing: product.numberOfServing || "",
      sellingPrice: product.sellingPrice || "",
      productCategoryId: product.productCategory._id || "",
      isActive: product.isActive || false,
      isActivityType: product.isActivityType || false,
      createdBy: product.user.firstName + " " + product.user.lastName || "",
      createdDate: product.createdDate || "",
    });
  };

  const handleDialogProceed = async () => {
    //
    setAskConfirmation(false);
    store.dispatch(requestStarted());

    try {
      const currentUser = store.getState().entities.user.user.id;
      const objEmp = { ...values, userId: currentUser };

      const { data } = await saveProduct(objEmp);
      const { token, singleRecord } = data;
      store.dispatch(writeToken({ token }));

      enqueueSnackbar("Successfully updated records!", { variant: "success" });

      if (objEmp.id) return onSuccessEdit(singleRecord);

      return onSuccessAdd(singleRecord);
    } catch (ex) {
      if (ex && ex.status === 400) {
      }
      if (ex && ex.status === 500)
        enqueueSnackbar(ex.data, { variant: "success" });
    } finally {
      store.dispatch(requestFinished());
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "isActive" || name === "isActivityType")
      return setValues({ ...values, [name]: e.target.checked });

    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    //..
    async function doSubmit() {
      //..
      if (!didMount.current) {
        didMount.current = true;
        return;
      }

      if (Object.keys(errors).length === 0) setAskConfirmation(true);
    }
    doSubmit();
    // eslint-disable-next-line
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(validate(values));
  };

  const handleDialogCancel = () => {
    setAskConfirmation(false);
  };

  return {
    handleChange,
    values,
    handleSubmit,
    errors,
    handleValueOnLoad,
    askConfirmation,
    handleDialogProceed,
    handleDialogCancel,
  };
};

export default UseProductForm;
