import { useSnackbar } from "notistack";
import { Button, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import moment from "moment";
import FormHeader from "./../../../../common/form/FormHeader";
import { store } from "../../../../utils/store/configureStore";
import { Link, useParams, useHistory } from "react-router-dom";
import { ValidatorForm } from "react-material-ui-form-validator";
import MaterialTableSelect from "../../../../common/MaterialTableSelect";
import { getEmployees } from "./../../../../utils/services/pages/EmployeeService";
import { toggleLoadingGlobal } from "../../../../utils/store/pages/globalSettings";
import {
  GetWorkOrders,
  PostInvAdjLines,
  PostWorkOrder,
} from "../../../../utils/services/pages/inventory/InventoryService";
import MaterialTextField from "../../../../common/MaterialTextField";
import Enums from "../../../../utils/services/pages/inventory/Enums";
import { DatePicker } from "antd";

export default function WorkOrderForm() {
  const hist = useHistory();
  const { id: IdFromUrl } = useParams();
  const [users, setUsers] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [mockData, setMockData] = useState({
    typeOfWork: Enums.TypeOfWork.Carpentry,
    location: Enums.Location.Admin,
    reason: "",
    requestedById: "",
    targetWorkDate: moment(),
  });
  const [dataSet, setDataSet] = useState({
    typeOfWork: [],
    location: [],
  });

  const setValue = (e) => {
    const { name, value } = e.target;
    setMockData({ ...mockData, [name]: value });
  };

  useEffect(() => {
    const SetData = () => {
      const typeOfWork = [];
      const location = [];

      Object.keys(Enums.TypeOfWork).map((key) => {
        typeOfWork.push({ display: key, id: key });
      });

      Object.keys(Enums.Location).map((key) => {
        location.push({ display: key, id: key });
      });
      setDataSet({ ...dataSet, typeOfWork, location });
    };

    const calling = async () => {
      await _getUsers();

      if (IdFromUrl !== "new") {
        await _getData();
      }
    };

    SetData();
    calling();
  }, []);

  const _getData = async () => {
    //
    store.dispatch(toggleLoadingGlobal(true));

    GetWorkOrders(IdFromUrl)
      .then((resp) => {
        const { reason, typeOfWork, location, requestedBy, targetWorkDate } =
          resp.data.singleRecord;

        setMockData({
          requestedById: requestedBy.id,
          location,
          requestedBy: typeOfWork,
          reason,
          targetWorkDate,
        });
      })
      .catch(() => {
        enqueueSnackbar("GetInvAdjHeaderAndLine: error", {
          variant: "error",
        });
      })
      .finally(() => {
        store.dispatch(toggleLoadingGlobal(false));
      });
  };
  const _getUsers = async () => {
    //
    store.dispatch(toggleLoadingGlobal(true));

    getEmployees(true)
      .then((resp) => {
        const data = resp.data.listRecords.map((obj) => ({
          ...obj,
          display: obj.firstName + " " + obj.lastName,
        }));

        setUsers(data);
      })
      .catch(() => {
        enqueueSnackbar("getEmployees: error", {
          variant: "error",
        });
      })
      .finally(() => {
        store.dispatch(toggleLoadingGlobal(false));
      });
  };

  const _handlePostRecords = async () => {
    const currentUser = store.getState().entities.user.user;
    let date_moment = moment(
      mockData.targetWorkDate,
      "ddd MMM DD YYYY HH:mm:ss ZZ"
    );

    const obj = {
      ...mockData,
      createdById: currentUser.id,
      TargetWorkDate: date_moment.format("YYYY-MM-DD HH:mm:ss"),
    };

    store.dispatch(toggleLoadingGlobal(true));

    const promises = [
      PostWorkOrder(obj)
        .then(() => {
          enqueueSnackbar("Adjusting the records SUCCESS.", {
            variant: "success",
          });
          hist.push("/a/inventory-management/work-order");
        })
        .catch((error) => {
          enqueueSnackbar(`PostWorkOrder Error`, {
            variant: "error",
          });
        })
        .finally(() => {
          store.dispatch(toggleLoadingGlobal(false));
        }),
    ];
    await Promise.all(promises);
  };
  const onChangeRangePicker = (d) =>
    setMockData({ ...mockData, targetWorkDate: d });

  return (
    <div className="container__wrapper">
      <FormHeader
        isVisibleBtn={false}
        header="Work Order"
        second="Inventory Management"
        third="Work Order"
      />
      <ValidatorForm
        onSubmit={() => _handlePostRecords()}
        onError={(errors) => console.log(errors)}
      >
        <Grid container alignItems="center" spacing={2}>
          <Grid item md={6} xs={12}>
            <MaterialTableSelect
              data={dataSet.typeOfWork}
              label="Type of Work"
              value={mockData.typeOfWork || Enums.TypeOfWork.Carpentry}
              name="typeOfWork"
              onChange={(e) => setValue(e)}
              displayKey="id"
              displayAttribute="display"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <MaterialTableSelect
              data={dataSet.location}
              label="Location of Work"
              value={mockData.location || Enums.Location.Admin}
              name="location"
              onChange={(e) => setValue(e)}
              displayKey="id"
              displayAttribute="display"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <MaterialTextField
              id="reason"
              label="Reason/Description of Work"
              handleChange={setValue}
              values={mockData.reason || ""}
              required={true}
              size="small"
            />
          </Grid>

          <Grid item md={6} xs={12}>
            <MaterialTableSelect
              data={users}
              label="Requested By"
              name="requestedById"
              value={mockData.requestedById || ""}
              onChange={(e) => setValue(e)}
              displayKey="id"
              displayAttribute="display"
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <div>
              <label style={{ marginBottom: "15px" }}>Target Start Date</label>
              <DatePicker
                size="small"
                format="yyyy-MM-DD"
                value={moment(mockData.targetWorkDate)}
                onChange={onChangeRangePicker}
              />
            </div>
          </Grid>
        </Grid>
        <div style={{ marginTop: 15 }}>
          <Link to="/a/inventory-management/work-order" className="link">
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              style={{ marginRight: 5 }}
            >
              Back
            </Button>
          </Link>
          {IdFromUrl === "new" && (
            <Button
              type="submit"
              variant="outlined"
              color="primary"
              style={{ marginRight: 5 }}
            >
              Save
            </Button>
          )}
        </div>
      </ValidatorForm>
    </div>
  );
}
