import { useSnackbar } from "notistack";
import { TextField } from "@material-ui/core";
import ViewIcon from "@material-ui/icons/Cancel";
import { Button, Modal } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import ToolTipWithIcon from "./../ToolTipWithIcon";
import { store } from "../../utils/store/configureStore";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ValidatorForm } from "react-material-ui-form-validator";
import { toggleLoadingGlobal } from "../../utils/store/pages/globalSettings";
import { getProducts } from "./../../utils/services/pages/products/ProductService";

export default function ProductFinder({
  showModal,
  onCloseModal,
  onSelectRecord,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [products, setProducts] = useState([]);
  const [selectedProd, setSelectedProd] = useState({});

  useEffect(() => {
    if (showModal === false) return;
  }, [showModal]);

  useEffect(() => {
    store.dispatch(toggleLoadingGlobal(true));
    getProducts(true)
      .then((resp) => {
        const newData = resp.data.listRecords.map((obj) => ({
          ...obj,
          id: obj._id,
        }));
        setProducts(newData);
      })
      .catch((error) => {
        enqueueSnackbar(
          "getProducts: An error occured while calling the server.",
          {
            variant: "error",
          }
        );
      })
      .finally(() => {
        store.dispatch(toggleLoadingGlobal(false));
      });
  }, []);

  const options = products.map((option) => {
    const firstLetter = option["longName"][0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  const onChange = (da, val) => setSelectedProd(val);

  return (
    <Modal
      open={showModal}
      onClose={() => onCloseModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="Shadow-modal__wrapper"
    >
      <div className="Shadow-modal__container">
        <div className="Shadow-modal-title__container">
          <span style={{ cursor: "default" }}>Product Finder</span>
          <div>
            <ToolTipWithIcon
              title="Close"
              Icon={ViewIcon}
              onClick={() => onCloseModal(false)}
            />
          </div>
        </div>
        <div className="Shadow-modal-body__container">
          <ValidatorForm onSubmit={() => onSelectRecord(selectedProd)}>
            <Autocomplete
              size="small"
              getOptionSelected={(option, value) => option._id === value._id}
              id="grouped-demo"
              options={options.sort(
                (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
              )}
              groupBy={(option) => option.firstLetter}
              getOptionLabel={(option) => option["longName"]}
              renderInput={(params) => (
                <TextField {...params} label="Search" variant="outlined" />
              )}
              onChange={onChange}
            />
            <div
              className="Shadow-modal-button__container"
              style={{ marginTop: 20 }}
            >
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                style={{ marginRight: 5 }}
              >
                Select
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => onCloseModal(false)}
              >
                Cancel
              </Button>
            </div>
          </ValidatorForm>
        </div>
      </div>
    </Modal>
  );
}
