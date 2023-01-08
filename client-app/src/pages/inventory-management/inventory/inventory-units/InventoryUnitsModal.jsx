import PropTypes from "prop-types";
import ViewIcon from "@material-ui/icons/Cancel";
import { Button, Modal } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import MSwitch from "./../../../../common/form/MSwitch";
import { ValidatorForm } from "react-material-ui-form-validator";
import ToolTipWithIcon from "./../../../../common/ToolTipWithIcon";
import MaterialTextField from "./../../../../common/MaterialTextField";
export default function InventoryUnitsModal({
  showModal,
  onCloseModal,
  selectedData,
  isActionAdd,
  onSaveRecord,
}) {
  const [mockSelectedData, setMockSelectedData] = useState({
    _id: null,
    name: "",
    isActive: false,
    createdBy: "",
  });

  useEffect(() => {
    if (isActionAdd)
      return setMockSelectedData({
        _id: null,
        name: "",
        isActive: false,
        createdBy: "",
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
          <span style={{ cursor: "default" }}>Inventory Unit</span>
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
            <MaterialTextField
              id="name"
              label="Inventory Unit Name"
              handleChange={setValue}
              values={mockSelectedData.name}
              required={true}
            />

            <MSwitch
              values={mockSelectedData.isActive}
              handleChange={setValue}
              name="Inventory Unit Active"
            />

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
InventoryUnitsModal.propTypes = {
  isActionAdd: PropTypes.bool,
};
