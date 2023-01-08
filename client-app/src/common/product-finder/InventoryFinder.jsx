import { useSnackbar } from "notistack";
import { TextField } from "@material-ui/core";
import ViewIcon from "@material-ui/icons/Cancel";
import React, { useState, useEffect } from "react";
import ToolTipWithIcon from "./../ToolTipWithIcon";
import MaterialTextField from "./../MaterialTextField";
import { Button, Modal, Grid } from "@material-ui/core";
import { store } from "../../utils/store/configureStore";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { ValidatorForm } from "react-material-ui-form-validator";
import { toggleLoadingGlobal } from "../../utils/store/pages/globalSettings";
import { GetInventoryMaster } from "../../utils/services/pages/inventory/InventoryService";

export default function InventoryFinder({
  showModal,
  onCloseModal,
  onSaveRecord,
  showNote = false,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [inventory, setInventory] = useState([]);
  const [selectedInv, setSelectedInv] = useState({});
  const [mockSelectedData, setMockSelectedData] = useState({
    quantity: "",
    unit: "",
    unitId: "",
    note: "",
  });

  useEffect(() => {
    store.dispatch(toggleLoadingGlobal(true));
    GetInventoryMaster(true)
      .then((resp) => {
        const newData = resp.data.listRecords.map((obj) => ({
          ...obj,
          id: obj._id,
        }));
        setInventory(newData);
      })
      .catch((error) => {
        enqueueSnackbar(
          "GetInventoryMaster: An error occured while calling the server.",
          {
            variant: "error",
          }
        );
      })
      .finally(() => {
        store.dispatch(toggleLoadingGlobal(false));
      });
  }, []);

  const options = inventory.map((option) => {
    const firstLetter = option["name"][0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? "0-9" : firstLetter,
      ...option,
    };
  });

  const onChange = (da, val) => {
    setMockSelectedData({
      ...mockSelectedData,
      unit: val.inventoryUnit.name,
      unitId: val.inventoryUnitId,
    });

    setSelectedInv(val);
  };

  const setValue = (e) => {
    const { name, value } = e.target;

    setMockSelectedData({
      ...mockSelectedData,
      [name]: value,
    });
  };

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
          <span style={{ cursor: "default" }}>Inventory Finder</span>
          <div>
            <ToolTipWithIcon
              title="Close"
              Icon={ViewIcon}
              onClick={() => onCloseModal(false)}
            />
          </div>
        </div>
        <div className="Shadow-modal-body__container">
          <ValidatorForm
            onSubmit={() => onSaveRecord(selectedInv, mockSelectedData)}
          >
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={12}>
                <Autocomplete
                  size="small"
                  getOptionSelected={(option, value) =>
                    option._id === value._id
                  }
                  id="grouped-demo"
                  options={options.sort(
                    (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
                  )}
                  groupBy={(option) => option.firstLetter}
                  getOptionLabel={(option) => option["name"]}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Search"
                      variant="outlined"
                      required
                    />
                  )}
                  onChange={onChange}
                />
              </Grid>
              <Grid item xs={6}>
                <MaterialTextField
                  id="quantity"
                  label="Quantity"
                  handleChange={setValue}
                  values={mockSelectedData.quantity || ""}
                  required={true}
                  size="small"
                  type="number"
                />
              </Grid>
              <Grid item xs={6}>
                <MaterialTextField
                  id="unit"
                  label="Unit"
                  handleChange={setValue}
                  values={mockSelectedData.unit || ""}
                  size="small"
                  disabled={true}
                />
              </Grid>
              {showNote && (
                <Grid item xs={12}>
                  <MaterialTextField
                    id="note"
                    label="Note"
                    handleChange={setValue}
                    values={mockSelectedData.note || ""}
                    required={false}
                    size="small"
                  />
                </Grid>
              )}
            </Grid>
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
                Save
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
