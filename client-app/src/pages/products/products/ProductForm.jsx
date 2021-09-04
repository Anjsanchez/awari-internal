import { Image } from "antd";
import "./css/ProductForm.css";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import MDialog from "../../../common/MDialog";
import { useHistory } from "react-router-dom";
import SaveIcon from "@material-ui/icons/Save";
import MSwitch from "../../../common/form/MSwitch";
import DeleteIcon from "@material-ui/icons/Delete";
import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import UseProductForm from "./validation/UseProductForm";
import MaterialButton from "../../../common/MaterialButton";
import BackupTwoToneIcon from "@material-ui/icons/BackupTwoTone";
import MaterialSelect from "../../../common/form/MaterialSelect";
import ProductFormValidate from "./validation/ProductFormValidate";
import MaterialTextField from "./../../../common/MaterialTextField";
import { Grid, Paper, ButtonGroup, IconButton } from "@material-ui/core";
import { getProdTypes } from "./../../../utils/services/pages/products/ProductTypeServices";
import { getProdCategory } from "./../../../utils/services/pages/products/ProductCategoryService";

const useStyles = makeStyles((theme) => ({
  root: { padding: "15px", paddingTop: "30px" },
  textField: {
    [`& fieldset`]: {
      borderRadius: 16,
    },
  },
  loginDiv__margin: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const ProductForm = ({ data, onCancel, onSuccessEdit, onSuccessAdd }) => {
  const hist = useHistory();
  const classes = useStyles();
  const [types, setTypes] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [category, setCategory] = useState([]);
  const isLoading = useSelector(
    (state) => state.entities.roomVariant.isLoading
  );
  const {
    askConfirmation,
    handleChange,
    values,
    handleSubmit,
    errors,
    handleValueOnLoad,
    handleDialogProceed,
    handleDialogCancel,
    handleChangeImage,
  } = UseProductForm(ProductFormValidate, onSuccessEdit, onSuccessAdd);

  useEffect(() => {
    async function populateCategories() {
      try {
        const { data } = await getProdCategory();

        const sortedProducts = data.listRecords.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setCategory(sortedProducts);
      } catch (error) {
        enqueueSnackbar(
          "An error occured while fetching the roles in the server.",
          {
            variant: "error",
          }
        );
      }
    }

    async function populateProductType() {
      try {
        const { data } = await getProdTypes();

        const sortedProducts = data.sort((a, b) =>
          a.name.localeCompare(b.name)
        );

        setTypes(sortedProducts);
      } catch (error) {
        enqueueSnackbar(
          "An error occured while fetching the roles in the server.",
          {
            variant: "error",
          }
        );
      }
    }

    async function populateRoom() {
      try {
        if (!data.hasOwnProperty("_id")) return;

        handleValueOnLoad(data);
      } catch (ex) {
        if (ex && ex.status === 400) hist.replace("/not-found");
      }
    }
    populateProductType();
    populateCategories();
    populateRoom();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {askConfirmation && (
        <MDialog
          openDialog={askConfirmation}
          handleClose={handleDialogCancel}
          handleOk={handleDialogProceed}
        />
      )}

      <Paper
        elevation={3}
        square
        className={`formList-container ${classes.root}`}
      >
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div className="prf-container__wrapper">
                <Image
                  height={240}
                  width="100%"
                  src={values.imageSrc}
                  fallback="data:image/png;base64,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"
                />
                <div className="prf-btnUpload__wrapper">
                  <input
                    onChange={handleChangeImage}
                    accept="image/*"
                    id="icon-button-file"
                    type="file"
                  />
                  <label htmlFor="icon-button-file">
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <BackupTwoToneIcon />
                    </IconButton>
                    {errors.imageFile && (
                      <span className="prf-container__span-error">
                        Image is Required
                      </span>
                    )}
                  </label>
                </div>
              </div>
            </Grid>
            <Grid item xs={12}>
              <MaterialTextField
                id="longName"
                label="Long Name"
                handleChange={handleChange}
                errors={errors.longName}
                values={values.longName}
              />
            </Grid>
            <Grid item xs={12}>
              <MaterialTextField
                id="shortName"
                label="Short Name"
                handleChange={handleChange}
                errors={errors.shortName}
                values={values.shortName}
              />
            </Grid>
            <Grid item xs={12}>
              <MaterialTextField
                multiline={true}
                id="description"
                label="Description"
                handleChange={handleChange}
                errors={errors.description}
                values={values.description}
              />
            </Grid>

            <Grid item xs={12}>
              <MaterialTextField
                id="numberOfServing"
                label="Number of Serving"
                type="number"
                handleChange={handleChange}
                errors={errors.numberOfServing}
                values={values.numberOfServing}
              />
            </Grid>
            <Grid item xs={12}>
              <MaterialTextField
                id="sellingPrice"
                label="Selling Price"
                type="number"
                handleChange={handleChange}
                errors={errors.sellingPrice}
                values={values.sellingPrice}
              />
            </Grid>

            <Grid item xs={12}>
              <MaterialSelect
                name="productCategoryId"
                label="Category"
                value={values.productCategoryId}
                handleChangeInput={handleChange}
                errors={errors.productCategoryId}
                datas={category}
                displayText="name"
                menuItemValue="_id"
                maxWidth="100%"
              />
            </Grid>
            <Grid item xs={12}>
              <MaterialSelect
                name="productTypeId"
                label="Type"
                value={values.productTypeId}
                handleChangeInput={handleChange}
                errors={errors.productTypeId}
                datas={types}
                displayText="name"
                menuItemValue="_id"
                maxWidth="100%"
              />
            </Grid>
            <Grid item xs={12} md={10}>
              <MSwitch
                values={values.isActivityType}
                handleChange={handleChange}
                name="Activity Type"
                switchName="isActivityType"
                subName="These are product that requires appointments"
              />
            </Grid>
            <Grid item xs={12}>
              <MSwitch
                values={values.isActive}
                handleChange={handleChange}
                name="Active Status"
                subName="This will prevent from making transactions"
              />
            </Grid>
          </Grid>

          <div className={classes.loginDiv__margin}>
            <ButtonGroup
              variant="contained"
              color="primary"
              aria-label="text primary button group"
            >
              <MaterialButton
                disabled={isLoading}
                text="Cancel"
                color="secondary"
                startIcon={<DeleteIcon />}
                onClick={onCancel}
              />
              <MaterialButton
                disabled={isLoading}
                text="Submit"
                color="primary"
                endIcon={<SaveIcon />}
                onClick={handleSubmit}
              />
            </ButtonGroup>
          </div>
        </form>
      </Paper>
    </>
  );
};
export default ProductForm;
