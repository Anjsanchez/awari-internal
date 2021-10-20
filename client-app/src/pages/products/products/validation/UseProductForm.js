import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";
import { store } from "../../../../utils/store/configureStore";
import { writeToken } from "../../../../utils/store/pages/users";
import { saveProduct } from "../../../../utils/services/pages/products/ProductService";
import {
  requestStarted,
  requestFinished,
} from "../../../../utils/store/pages/roomVariant";

const UseProductForm = (validate, onSuccessEdit, onSuccessAdd) => {
  //..
  const defaultImgSrc = "/img/preview.jpg";
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
    description: "",
    sellingPrice: "",
    productCategoryId: "",
    productTypeId: "",
    isActive: false,
    isActivityType: false,
    createdBy: "",
    createdDate: "",

    imageFile: null,
    imageSrc: defaultImgSrc,
    imageName: "",
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
      description: product.description || "",
      productTypeId: product.productType._id || "",
      imageFile: product.imageFile || null,
      imageSrc: product.imageSrc || defaultImgSrc,
      imageName: product.imageName || "",
    });
  };

  const handleChangeImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imageFile = e.target.files[0];

      const reader = new FileReader();
      reader.onload = (x) => {
        setValues({
          ...values,
          imageFile,
          imageSrc: x.target.result,
        });
      };
      reader.readAsDataURL(imageFile);
      return;
    }

    setValues({
      ...values,
      imageFile: null,
      imageSrc: defaultImgSrc,
    });
  };

  const formObjViewModel = () => {
    const currentUser = store.getState().entities.user.user.id;

    const formData = new FormData();
    formData.append("_id", values.id);
    formData.append("shortName", values.shortName);
    formData.append("longName", values.longName);
    formData.append("productCategoryId", values.productCategoryId);
    formData.append("numberOfServing", values.numberOfServing);
    formData.append("costPrice", 0);
    formData.append("sellingPrice", values.sellingPrice);
    formData.append("description", values.description);
    formData.append("isActive", values.isActive);
    formData.append("isActivityType", values.isActivityType);
    formData.append("productTypeId", values.productTypeId);
    formData.append("userId", currentUser);
    formData.append("imageFile", values.imageFile);
    formData.append("imageName", values.imageName);

    return formData;
  };

  const handleDialogProceed = async () => {
    //
    setAskConfirmation(false);
    store.dispatch(requestStarted());

    try {
      const obj = formObjViewModel();
      const { data } = await saveProduct(obj);
      const { token, singleRecord } = data;
      store.dispatch(writeToken({ token }));

      enqueueSnackbar("Successfully updated records!", { variant: "success" });

      const id = obj.get("_id");

      if (id) return onSuccessEdit(singleRecord);

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
    handleChangeImage,
  };
};

export default UseProductForm;
