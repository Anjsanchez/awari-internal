import { Button, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { ValidatorForm } from "react-material-ui-form-validator";
import { Link, useParams, useHistory } from "react-router-dom";
import MaterialTableSelect from "../../../../common/MaterialTableSelect";
import MaterialTextField from "../../../../common/MaterialTextField";
import { GetVendors } from "../../../../utils/services/pages/CustomerService";
import { store } from "../../../../utils/store/configureStore";
import { toggleLoadingGlobal } from "../../../../utils/store/pages/globalSettings";
import FormHeader from "./../../../../common/form/FormHeader";
import MaterialDataGrid from "./../../../../common/MaterialDataGrid";
import { useSnackbar } from "notistack";
import { getEmployees } from "./../../../../utils/services/pages/EmployeeService";
import InventoryFinder from "../../../../common/product-finder/InventoryFinder";
import {
  GetPurchaseOrderHeaderAndLine,
  GetPurchaseReqHeaderAndLine,
  PostPurchaseOrderLines,
  PostPurchaseReqLines,
} from "../../../../utils/services/pages/inventory/InventoryService";

export default function PurchaseOrderForm() {
  const hist = useHistory();
  const { id: IdFromUrl } = useParams();
  const [users, setUsers] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [reqLines, setReqLines] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [showInvFinder, setShowInvFinder] = useState(false);
  const [mockData, setMockData] = useState({
    requestedById: "",
  });

  const tableColumns = [
    {
      field: "name",
      headerName: "Inventory Name",
      width: 400,
    },
    {
      field: "lineQuantity",
      headerName: "Quantity",
      type: "number",
      width: 170,
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
        await _getPurchaseReq();
      }
    };

    calling();
  }, []);

  const _getPurchaseReq = async () => {
    //
    store.dispatch(toggleLoadingGlobal(true));

    GetPurchaseReqHeaderAndLine(IdFromUrl)
      .then((resp) => {
        const { requestedById } = resp.data.singleRecord.header;
        setMockData({
          requestedById,
        });

        const data = resp.data.singleRecord.lines.map((n) => {
          return {
            ...n,
            id: n._id,
            name: n.inventoryMaster.name,
            unit: n.inventoryMaster.inventoryUnit.name,
          };
        });
        setReqLines(data);
      })
      .catch(() => {
        enqueueSnackbar("GetPurchaseReqHeaderAndLine: error", {
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
      lineQuantity: mockData.quantity,
      unit: mockData.unit,
      unitId: mockData.unitId,
      name: selectedInv.name,
    };

    let newObbj = [...reqLines];
    newObbj.push(obj);
    setReqLines(newObbj);
    setShowInvFinder(false);
  };
  const _handleRemoveLine = (z, s) => {
    const newData = reqLines.filter((n) => n.id !== selectedRecord.id);
    setReqLines(newData);
  };
  const _handlePostRecords = async () => {
    const currentUser = store.getState().entities.user.user;
    const obj = {
      header: {
        ...mockData,
        createdById: currentUser.id,
      },
      lines: [...reqLines],
    };

    if (obj.lines.length === 0) {
      enqueueSnackbar("Please add lines in the form.", {
        variant: "warning",
      });
      return;
    }
    store.dispatch(toggleLoadingGlobal(true));

    const promises = [
      PostPurchaseReqLines(obj)
        .then(() => {
          enqueueSnackbar("Adjusting the records SUCCESS.", {
            variant: "success",
          });
          hist.push("/a/inventory-management/purchase-requisition");
        })
        .catch((error) => {
          enqueueSnackbar(`PostPurchaseReqLines Error`, {
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
        applyQntyValidation={true}
      />

      <FormHeader
        isVisibleBtn={false}
        header="Purchase Requisition"
        second="Inventory Management"
        third="Purchase Requisition"
      />
      <ValidatorForm
        onSubmit={() => _handlePostRecords()}
        onError={(errors) => console.log(errors)}
      >
        <Grid container alignItems="center">
          <Grid item md={6} xs={10}>
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
              tableData={reqLines}
              onSelectedRow={HandleSelectedRowChange}
              tableColumns={tableColumns}
            />
          </Grid>
        </Grid>
        <div style={{ marginTop: 15 }}>
          <Link
            to="/a/inventory-management/purchase-requisition"
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
