import PropTypes from "prop-types";
import { useSnackbar } from "notistack";
import ViewIcon from "@material-ui/icons/Cancel";
import React, { useState, useEffect } from "react";
import MSwitch from "./../../../../common/form/MSwitch";
import { Button, Grid, Modal } from "@material-ui/core";
import { ValidatorForm } from "react-material-ui-form-validator";
import ToolTipWithIcon from "./../../../../common/ToolTipWithIcon";
import MaterialTextField from "./../../../../common/MaterialTextField";
import MaterialTableSelect from "./../../../../common/MaterialTableSelect";
import { getProdCategory } from "./../../../../utils/services/pages/products/ProductCategoryService";
import {
  GetInventoryTypes,
  GetInventoryUnits,
} from "../../../../utils/services/pages/inventory/InventoryService";

export default function InventoryMasterModal({
  showModal,
  onCloseModal,
  selectedData,
  isActionAdd,
  onSaveRecord,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [invTypes, setInvTypes] = useState([]);
  const [invUnits, setInvUnits] = useState([]);
  const [prodCategory, setProdCategory] = useState([]);

  const [mockSelectedData, setMockSelectedData] = useState({
    _id: null,
    name: "",
    qtyMainInventory: "",
    qtyProductionInventory: "",
    isActive: false,
    inventoryTypeId: "",
    inventoryUnitId: "",
    productCategoryId: "",
  });

  useEffect(() => {
    const GetInvTypes = () => {
      GetInventoryTypes()
        .then((resp) => {
          const newData = resp.data.listRecords.map((obj) => ({
            ...obj,
            id: obj._id,
          }));
          setInvTypes(newData);
        })
        .catch((error) => {
          enqueueSnackbar(
            "GetInventoryTypes: An error occured while calling the server.",
            {
              variant: "error",
            }
          );
        })
        .finally(() => {});
    };

    const GetInvUnits = () => {
      GetInventoryUnits()
        .then((resp) => {
          const newData = resp.data.listRecords.map((obj) => ({
            ...obj,
            id: obj._id,
          }));
          setInvUnits(newData);
        })
        .catch((error) => {
          enqueueSnackbar(
            "GetInventoryUnits: An error occured while calling the server.",
            {
              variant: "error",
            }
          );
        })
        .finally(() => {});
    };

    const GetProdCategory = () => {
      getProdCategory()
        .then((resp) => {
          const newData = resp.data.listRecords.map((obj) => ({
            ...obj,
            id: obj._id,
          }));
          setProdCategory(newData);
        })
        .catch((error) => {
          enqueueSnackbar(
            "getProdCategory: An error occured while calling the server.",
            {
              variant: "error",
            }
          );
        })
        .finally(() => {});
    };

    GetProdCategory();
    GetInvUnits();
    GetInvTypes();
  }, []);

  useEffect(() => {
    if (isActionAdd)
      return setMockSelectedData({
        _id: null,
        name: "",
        qtyMainInventory: "",
        qtyProductionInventory: "",
        isActive: false,
        inventoryTypeId: "",
        inventoryUnitId: "",
        productCategoryId: "",
      });

    setMockSelectedData({ ...selectedData });
    // eslint-disable-next-line
  }, [showModal]);

  const setValue = (e) => {
    const { name, value } = e.target;

    if (name === "isActive") {
      setMockSelectedData({ ...mockSelectedData, [name]: e.target.checked });
      return;
    }

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
          <span style={{ cursor: "default" }}>Inventory Master</span>
          <div>
            <ToolTipWithIcon
              title="Close"
              Icon={ViewIcon}
              onClick={() => onCloseModal(false)}
            />
          </div>
        </div>
        <div className="Shadow-modal-body__container">
          <ValidatorForm onSubmit={() => onSaveRecord(mockSelectedData)}>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs={6}>
                <MaterialTextField
                  id="name"
                  label="Inventory Name"
                  handleChange={setValue}
                  values={mockSelectedData.name || ""}
                  required={true}
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <MaterialTableSelect
                  data={prodCategory}
                  label="Product Category"
                  value={mockSelectedData.productCategoryId || ""}
                  name="productCategoryId"
                  onChange={(e) => setValue(e)}
                  displayKey="_id"
                  displayAttribute="name"
                />
              </Grid>
              <Grid item xs={6}>
                <MaterialTextField
                  id="qtyMainInventory"
                  label="Main Inventory QTY"
                  handleChange={setValue}
                  values={mockSelectedData.qtyMainInventory || ""}
                  required={true}
                  type="number"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <MaterialTextField
                  id="qtyProductionInventory"
                  label="Prod Inventory QTY"
                  handleChange={setValue}
                  values={mockSelectedData.qtyProductionInventory || ""}
                  required={true}
                  type="number"
                  size="small"
                />
              </Grid>
              <Grid item xs={6}>
                <MaterialTableSelect
                  data={invTypes}
                  label="Inventory Type"
                  value={mockSelectedData.inventoryTypeId || ""}
                  name="inventoryTypeId"
                  onChange={(e) => setValue(e)}
                  displayKey="_id"
                  displayAttribute="name"
                />
              </Grid>
              <Grid item xs={6}>
                <MaterialTableSelect
                  data={invUnits}
                  label="Inventory Unit"
                  value={mockSelectedData.inventoryUnitId || ""}
                  name="inventoryUnitId"
                  onChange={(e) => setValue(e)}
                  displayKey="_id"
                  displayAttribute="name"
                />
              </Grid>
              <Grid item xs={6}>
                <MSwitch
                  values={mockSelectedData.isActive || false}
                  handleChange={setValue}
                  name="Is Inventory Active?"
                />
              </Grid>
            </Grid>

            <div className="Shadow-modal-button__container">
              <Button
                type="submit"
                variant="outlined"
                color="primary"
                style={{ marginRight: 5 }}
              >
                Save
              </Button>
              <Button
                onClick={() => onCloseModal(false)}
                variant="outlined"
                color="secondary"
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
InventoryMasterModal.propTypes = {
  isActionAdd: PropTypes.bool,
};
