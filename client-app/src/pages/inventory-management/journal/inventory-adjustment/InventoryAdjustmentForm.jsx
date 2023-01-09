import { useSnackbar } from "notistack";
import { Button, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import FormHeader from "./../../../../common/form/FormHeader";
import { store } from "../../../../utils/store/configureStore";
import { Link, useParams, useHistory } from "react-router-dom";
import { ValidatorForm } from "react-material-ui-form-validator";
import MaterialDataGrid from "./../../../../common/MaterialDataGrid";
import MaterialTableSelect from "../../../../common/MaterialTableSelect";
import InventoryFinder from "../../../../common/product-finder/InventoryFinder";
import { getEmployees } from "./../../../../utils/services/pages/EmployeeService";
import { toggleLoadingGlobal } from "../../../../utils/store/pages/globalSettings";
import {
  PostPurchaseOrderLines,
  GetInvAdjHeaderAndLine,
  PostInvAdjLines,
} from "../../../../utils/services/pages/inventory/InventoryService";
import MaterialTextField from "../../../../common/MaterialTextField";

export default function InventoryAdjustmentForm() {
  const hist = useHistory();
  const { id: IdFromUrl } = useParams();
  const [users, setUsers] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [invLines, setInvLines] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [showInvFinder, setShowInvFinder] = useState(false);
  const [mockData, setMockData] = useState({
    reason: "",
    requestedById: "",
  });
  const tableColumns = [
    {
      field: "name",
      headerName: "Inventory Name",
      width: 400,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      type: "number",
      width: 170,
      sortable: false,
    },
    {
      field: "adjustmentAction",
      headerName: "Adjustment Action",
      width: 200,
      sortable: false,
    },
    {
      field: "inventoryLocation",
      headerName: "Inventory Location",
      width: 200,
      sortable: false,
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 170,
      sortable: false,
    },
    {
      field: "note",
      headerName: "Note",
      width: 300,
      sortable: false,
    },
  ];

  const setValue = (e) => {
    const { name, value } = e.target;
    setMockData({ ...mockData, [name]: value });
  };

  useEffect(() => {
    const calling = async () => {
      await _getUsers();

      if (IdFromUrl !== "new") {
        await _getInvAdjustment();
      }
    };

    calling();
  }, []);

  const _getInvAdjustment = async () => {
    //
    store.dispatch(toggleLoadingGlobal(true));

    GetInvAdjHeaderAndLine(IdFromUrl)
      .then((resp) => {
        const { requestedById, reason } = resp.data.singleRecord.header;
        setMockData({
          requestedById,
          reason,
        });

        const data = resp.data.singleRecord.lines.map((n) => {
          return {
            ...n,
            id: n._id,
            name: n.inventoryMaster.name,
            unit: n.inventoryMaster.inventoryUnit.name,
          };
        });
        setInvLines(data);
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

  const _handleAddPOLines = (selectedInv, mockData) => {
    const obj = {
      id: selectedInv._id,
      InventoryMasterId: selectedInv._id,
      inv: selectedInv,
      note: mockData.note,
      quantity: mockData.quantity,
      unit: mockData.unit,
      unitId: mockData.unitId,
      name: selectedInv.name,
      adjustmentAction: mockData.adjustmentAction,
      inventoryLocation: mockData.inventoryLocation,
    };

    let newObbj = [...invLines];
    newObbj.push(obj);
    setInvLines(newObbj);
    setShowInvFinder(false);
  };
  const _handleRemoveLine = (z, s) => {
    const newData = invLines.filter((n) => n.id !== selectedRecord.id);
    setInvLines(newData);
  };
  const _handlePostRecords = async () => {
    const currentUser = store.getState().entities.user.user;
    const obj = {
      header: {
        ...mockData,
        createdById: currentUser.id,
      },
      lines: [...invLines],
    };

    store.dispatch(toggleLoadingGlobal(true));

    const promises = [
      PostInvAdjLines(obj)
        .then(() => {
          enqueueSnackbar("Adjusting the records SUCCESS.", {
            variant: "success",
          });
          hist.push("/a/inventory-management/inventory-adjustment");
        })
        .catch((error) => {
          enqueueSnackbar(`PostInvAdjLines Error`, {
            variant: "error",
          });
        })
        .finally(() => {
          store.dispatch(toggleLoadingGlobal(false));
        }),
    ];
    await Promise.all(promises);
  };
  const HandleSelectedRowChange = (data) => setSelectedRecord(data);

  return (
    <div className="container__wrapper">
      <InventoryFinder
        onCloseModal={() => setShowInvFinder(false)}
        showModal={showInvFinder}
        onSaveRecord={_handleAddPOLines}
        showNote={true}
        showAdjustmentAction={true}
      />

      <FormHeader
        isVisibleBtn={false}
        header="Inventory Adjustment"
        second="Inventory Management"
        third="Inventory Adjustment"
      />
      <ValidatorForm
        onSubmit={() => _handlePostRecords()}
        onError={(errors) => console.log(errors)}
      >
        <Grid container alignItems="center">
          <Grid item md={6} xs={10}>
            <MaterialTextField
              id="reason"
              label="Reason of Adjustment"
              handleChange={setValue}
              values={mockData.reason || ""}
              required={true}
              size="small"
            />
            <MaterialTableSelect
              style={{ marginTop: 10 }}
              data={users}
              label="Requested By"
              name="requestedById"
              value={mockData.requestedById || ""}
              onChange={(e) => setValue(e)}
              displayKey="id"
              displayAttribute="display"
            />
          </Grid>
          <Grid
            style={{ marginTop: 25 }}
            item
            xs={12}
            className="landingTbl-txtSearch__wrapper grid-webScheduler"
          >
            <MaterialDataGrid
              showToolbar={IdFromUrl === "new" ? true : false}
              HandleAddRecord={() => setShowInvFinder(true)}
              HandleDeleteRecord={_handleRemoveLine}
              tableData={invLines}
              onSelectedRow={HandleSelectedRowChange}
              tableColumns={tableColumns}
            />
          </Grid>
        </Grid>
        <div style={{ marginTop: 15 }}>
          <Link
            to="/a/inventory-management/inventory-adjustment"
            className="link"
          >
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
