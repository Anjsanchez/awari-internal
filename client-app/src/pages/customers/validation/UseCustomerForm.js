import { useSnackbar } from "notistack";
import { useHistory } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { store } from "../../../utils/store/configureStore";
import { saveCustomer } from "./../../../utils/services/pages/CustomerService";
import moment from "moment";

const UseCustomerForm = (validate) => {
  //..
  const defaultImgSrc = "/img/document.jpg";
  const hist = useHistory();
  const didMount = useRef(false);
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [askConfirmation, setAskConfirmation] = useState(false);

  const [values, setValues] = useState({
    id: "",
    customerid: "",
    emailAddress: "",
    firstname: "",
    lastname: "",
    isActive: false,
    mobile: "",
    birthday: moment().format("yyyy-MM-DD"),
    address: "",
    createdBy: "",
    createdDate: "",

    imageFile: null,
    imageSrc: defaultImgSrc,
    imageName: "",
  });

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

  const handleValueOnLoad = (customer) => {
    setValues({
      id: customer._id || "",
      isActive: customer.isActive || false,
      emailAddress: customer.emailAddress || "",
      firstname: customer.firstName || "",
      lastname: customer.lastName || "",
      customerid: customer.customerid || "",
      mobile: customer.mobile || "",
      birthday: customer.birthday || "",
      address: customer.address || "",
      createdDate: customer.createdDate || "",
      createdBy: customer.user.firstName + " " + customer.user.lastName || "",

      imageFile: customer.imageFile || null,
      imageSrc: customer.imageSrc || defaultImgSrc,
      imageName: customer.imageName || "",
    });
  };

  const formObjViewModel = () => {
    const currentUser = store.getState().entities.user.user.id;
    const formData = new FormData();
    formData.append("_id", values.id);
    formData.append("customerid", values.customerid);
    formData.append("firstname", values.firstname);
    formData.append("lastname", values.lastname);
    formData.append("address", values.address);
    formData.append("emailAddress", values.emailAddress);
    formData.append("mobile", values.mobile);
    formData.append("birthday", values.birthday);
    formData.append("isActive", values.isActive);
    formData.append("createdDate", values.createdDate);
    formData.append("userId", currentUser);
    formData.append("imageFile", values.imageFile);
    formData.append("imageName", values.imageName);

    return formData;
  };

  const handleDialogProceed = async () => {
    setAskConfirmation(false);
    setIsLoading(true);

    try {
      const currentUser = store.getState().entities.user.user.id;
      // const objEmp = { ...values, userId: currentUser };

      const obj = formObjViewModel();
      setIsLoading(false);
      await saveCustomer(obj);
      enqueueSnackbar("Successfully updated records!", { variant: "success" });
      hist.push("/a/user-management/customers");
    } catch (ex) {
      setIsLoading(false);
      if (ex && ex.status === 400) {
        enqueueSnackbar(ex.data, { variant: "error" });
      }
      if (ex && ex.status === 500)
        enqueueSnackbar(ex.data, { variant: "error" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "isActive") {
      setValues({ ...values, [name]: e.target.checked });
      return;
    }

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

  const handleChangeBirthday = (value) =>
    setValues({ ...values, birthday: value });

  return {
    handleChange,
    values,
    handleSubmit,
    errors,
    handleValueOnLoad,
    askConfirmation,
    handleDialogProceed,
    isLoading,
    handleDialogCancel,
    handleChangeBirthday,
    handleChangeImage,
  };
};

export default UseCustomerForm;
