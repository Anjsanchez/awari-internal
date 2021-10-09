import { useSnackbar } from "notistack";
import { useState, useEffect, useRef } from "react";
import auth from "../../../utils/services/authServices";
import { useLocation, useHistory } from "react-router-dom";
import { store } from "../../../utils/store/configureStore";
import { userAdded } from "../../../utils/store/pages/users";

const useLoginForm = (validate) => {
  //..
  const hist = useHistory();
  const didMount = useRef(false);
  const location = useLocation();
  const [errors, setErrors] = useState({});
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  useEffect(() => {
    async function fetchData() {
      if (!didMount.current) {
        didMount.current = true;
        return;
      }

      if (errors.username || errors.password) return;

      try {
        const { username, password } = values;
        setIsLoading(true);

        const data = await auth.login(username, password);

        if (data.singleRecord.isActive === false)
          return enqueueSnackbar(
            "This account is inactive. Kindly contact the administrator.",
            { variant: "error" }
          );
        store.dispatch(userAdded({ data }));

        let pathToRelocate;
        if (location.state) pathToRelocate = location.state.from.pathname;
        else pathToRelocate = "/";
        hist.push(pathToRelocate);
      } catch (ex) {
        setIsLoading(false);
        if (ex && ex.status === 400) {
          enqueueSnackbar(ex.data, { variant: "error" });
        }
        if (ex && ex.status === 500)
          enqueueSnackbar(ex.data, { variant: "error" });
      } finally {
      }
    }

    fetchData();
    return function cleanup() {
      setIsLoading(false);
    };
    // eslint-disable-next-line
  }, [errors]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setErrors(validate(values));
  };

  return { handleChange, values, handleSubmit, errors, isLoading };
};

export default useLoginForm;
