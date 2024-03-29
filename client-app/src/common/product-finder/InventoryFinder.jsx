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
import MaterialTableSelect from "../MaterialTableSelect";
import Enums from "../../utils/services/pages/inventory/Enums";

export default function InventoryFinder({
  showModal,
  onCloseModal,
  onSaveRecord,
  showNote = false,
  applyQntyValidation = false,
  showAdjustmentAction = false,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [inventory, setInventory] = useState([]);
  const [selectedInv, setSelectedInv] = useState({});
  const [mockSelectedData, setMockSelectedData] = useState({
    quantity: "",
    unit: "",
    unitId: "",
    note: "",
    prodQty: "",
    qtyMainInventory: "",
    adjustmentAction: Enums.AdjustmentAction.Decrease,
    inventoryLocation: Enums.InventoryLocation.Main,
  });

  useEffect(() => {
    if (showModal === false) return;

    setMockSelectedData({
      quantity: "",
      unit: "",
      unitId: "",
      note: "",
      prodQty: "",
      qtyMainInventory: "",
      adjustmentAction: Enums.AdjustmentAction.Decrease,
      inventoryLocation: Enums.InventoryLocation.Main,
    });
  }, [showModal]);

  const HandleSaveRecord = (selectedInv, mockSelectedData) => {
    const { quantity, qtyMainInventory } = mockSelectedData;
    if (applyQntyValidation) {
      if (Math.floor(quantity) > Math.floor(qtyMainInventory)) {
        enqueueSnackbar("We do not have that QTY in MAIN inventory.", {
          variant: "error",
        });
        return;
      }
    }
    onSaveRecord(selectedInv, mockSelectedData);
  };

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
      qtyMainInventory: val.qtyMainInventory,
      qtyProductionInventory: val.qtyProductionInventory,
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
            onSubmit={() => HandleSaveRecord(selectedInv, mockSelectedData)}
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
              <Grid item xs={6}>
                <MaterialTextField
                  id="qtyProductionInventory"
                  label="Production QTY"
                  handleChange={setValue}
                  values={mockSelectedData.qtyProductionInventory || ""}
                  size="small"
                  disabled={true}
                  required={false}
                />
              </Grid>
              <Grid item xs={6}>
                <MaterialTextField
                  id="qtyMainInventory"
                  label="Main Inventory QTY"
                  handleChange={setValue}
                  values={mockSelectedData.qtyMainInventory || ""}
                  required={false}
                  size="small"
                  disabled={true}
                />
              </Grid>
              {showAdjustmentAction && (
                <>
                  <Grid item xs={6}>
                    <MaterialTableSelect
                      data={[
                        {
                          id: Enums.AdjustmentAction.Decrease,
                          display: "Decrease",
                        },
                        {
                          id: Enums.AdjustmentAction.Increase,
                          display: "Increase",
                        },
                      ]}
                      required={showAdjustmentAction && true}
                      label="Adjustment Action"
                      name="adjustmentAction"
                      value={
                        mockSelectedData.adjustmentAction ||
                        Enums.AdjustmentAction.Decrease
                      }
                      onChange={(e) => setValue(e)}
                      displayKey="id"
                      displayAttribute="display"
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <MaterialTableSelect
                      data={[
                        {
                          id: Enums.InventoryLocation.Main,
                          display: "Main",
                        },
                        {
                          id: Enums.InventoryLocation.Production,
                          display: "Production",
                        },
                      ]}
                      required={showAdjustmentAction && true}
                      label="Inventory Location"
                      name="inventoryLocation"
                      value={
                        mockSelectedData.inventoryLocation ||
                        Enums.InventoryLocation.Main
                      }
                      onChange={(e) => setValue(e)}
                      displayKey="id"
                      displayAttribute="display"
                    />
                  </Grid>
                </>
              )}
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
