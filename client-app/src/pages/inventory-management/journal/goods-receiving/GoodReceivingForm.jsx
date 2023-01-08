import { useSnackbar } from "notistack";
import { Button, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import FormHeader from "./../../../../common/form/FormHeader";
import { store } from "../../../../utils/store/configureStore";
import { Link, useParams, useHistory } from "react-router-dom";
import { ValidatorForm } from "react-material-ui-form-validator";
import MaterialDataGrid from "./../../../../common/MaterialDataGrid";
import { GetVendors } from "../../../../utils/services/pages/CustomerService";
import InventoryFinder from "../../../../common/product-finder/InventoryFinder";
import { getEmployees } from "./../../../../utils/services/pages/EmployeeService";
import { toggleLoadingGlobal } from "../../../../utils/store/pages/globalSettings";
import {
  GetPurchaseOrderHeaderAndLine,
  PatchPurchaseLineReceive,
  PatchPurchaseOrdersReceive,
} from "../../../../utils/services/pages/inventory/InventoryService";
import MaterialTextField from "../../../../common/MaterialTextField";

export default function GoodReceivingForm() {
  const hist = useHistory();
  const { id: IdFromUrl, fromPage } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const [poLines, setPoLines] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [showInvFinder, setShowInvFinder] = useState(false);
  const [poIsReceived, setPoIsReceived] = useState(false);
  const [mockData, setMockData] = useState({
    invoiceNumber: "",
  });

  const tableColumns = [
    {
      field: "name",
      headerName: "Inventory Name",
      width: 400,
    },

    {
      field: "unit",
      headerName: "Unit",
      width: 120,
      sortable: false,
    },
    {
      field: "lineQuantity",
      headerName: "Ordered Quantity",
      type: "number",
      width: 170,
      sortable: false,
    },
    {
      field: "receivedQuantity",
      headerName: "Received Quantity",
      type: "number",
      width: 170,
      sortable: false,
      editable: poIsReceived ? false : true,
    },
    {
      field: "lineStatus",
      headerName: "Received Status",
      width: 180,
    },
    {
      field: "receiver",
      headerName: "Received By",
      width: 200,
      sortable: false,
    },
    {
      field: "receivedDate",
      headerName: "Received Date",
      width: 250,
      sortable: true,
    },
    {
      field: "note",
      headerName: "Note",
      width: 300,
      sortable: false,
    },
  ];

  const HandleNavigateBack = () =>
    fromPage == "rcv"
      ? "/a/inventory-management/goods-receiving"
      : "/a/inventory-management/purchase-order";
  const setValue = (e) => {
    const { name, value } = e.target;
    setMockData({ ...mockData, [name]: value });
  };
  useEffect(() => {
    const calling = async () => {
      if (IdFromUrl !== "new") {
        await _getPurchaseOrder();
      }
    };

    calling();
  }, []);
  const _getPurchaseOrder = async () => {
    //
    store.dispatch(toggleLoadingGlobal(true));

    GetPurchaseOrderHeaderAndLine(IdFromUrl)
      .then((resp) => {
        const { invoiceNumber, rcvStatus } = resp.data.singleRecord.header;
        setMockData({
          invoiceNumber,
        });
        if (rcvStatus == "1") setPoIsReceived(true);

        const data = resp.data.singleRecord.lines.map((n) => {
          return {
            ...n,
            id: n._id,
            name: n.inventoryMaster.name,
            unit: n.inventoryMaster.inventoryUnit.name,
            receiver:
              n.receivedBy &&
              n.receivedBy.firstName + " " + n.receivedBy.lastName,
          };
        });
        setPoLines(data);
      })
      .catch(() => {
        enqueueSnackbar("GetPurchaseOrderHeaderAndLine: error", {
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

    let newObbj = [...poLines];
    newObbj.push(obj);
    setPoLines(newObbj);
    setShowInvFinder(false);
  };
  const _handleRemoveLine = (z, s) => {
    const newData = poLines.filter((n) => n.id !== selectedRecord.id);
    setPoLines(newData);
  };

  const _handlePostRecords = async () => {
    const currentUser = store.getState().entities.user.user;
    const obj = {
      invoiceNumber: mockData.invoiceNumber,
      _id: IdFromUrl,
      ReceivedById: currentUser.id,
    };

    store.dispatch(toggleLoadingGlobal(true));

    const promises = [
      PatchPurchaseOrdersReceive(obj)
        .then(() => {
          enqueueSnackbar("Adjusting the records SUCCESS.", {
            variant: "success",
          });
          hist.push("/a/inventory-management/goods-receiving");
        })
        .catch((error) => {
          enqueueSnackbar(`PostPurchaseOrderLines Error`, {
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

  const _handleReceivedQtyUpdate = async (data) => {
    store.dispatch(toggleLoadingGlobal(true));

    const currentUser = store.getState().entities.user.user;
    const obj = {
      _id: data.id,
      ReceivedQuantity: data.value,
      ReceivedById: currentUser.id,
    };

    const promises = [
      PatchPurchaseLineReceive(obj)
        .then(() => {
          _getPurchaseOrder();
          enqueueSnackbar("Received quantity SUCCESS.", {
            variant: "success",
          });
        })
        .catch((error) => {
          enqueueSnackbar(`Received quantity ERROR. PatchPurchaseLineReceive`, {
            variant: "error",
          });
        })
        .finally(() => {
          store.dispatch(toggleLoadingGlobal(false));
        }),
    ];
    await Promise.all(promises);
  };
  return (
    <div className="container__wrapper">
      <InventoryFinder
        onCloseModal={() => setShowInvFinder(false)}
        showModal={showInvFinder}
        onSaveRecord={_handleAddPOLines}
        showNote={true}
      />

      <FormHeader
        isVisibleBtn={false}
        header="Goods Receiving"
        second="Inventory Management"
        third="Goods Receiving"
      />
      <ValidatorForm
        onSubmit={() => _handlePostRecords()}
        onError={(errors) => console.log(errors)}
      >
        <Grid container alignItems="center">
          <Grid item md={6} xs={10}>
            <MaterialTextField
              id="invoiceNumber"
              label="InvoiceNumber"
              handleChange={setValue}
              values={mockData.invoiceNumber || ""}
              required={true}
              disabled={poIsReceived}
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
              tableData={poLines}
              onSelectedRow={HandleSelectedRowChange}
              tableColumns={tableColumns}
              processUpdate={
                poIsReceived ? undefined : _handleReceivedQtyUpdate
              }
            />
          </Grid>
        </Grid>
        <div style={{ marginTop: 15 }}>
          <Link to={() => HandleNavigateBack()} className="link">
            <Button
              type="button"
              variant="outlined"
              color="secondary"
              style={{ marginRight: 5 }}
            >
              Back
            </Button>
          </Link>
          {!poIsReceived && (
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
