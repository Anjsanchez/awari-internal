import { useSnackbar } from "notistack";
import { Button, Grid } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import FormHeader from "./../../../../common/form/FormHeader";
import { store } from "../../../../utils/store/configureStore";
import { Link, useParams, useHistory } from "react-router-dom";
import { ValidatorForm } from "react-material-ui-form-validator";
import MaterialDataGrid from "./../../../../common/MaterialDataGrid";
import MaterialTableSelect from "../../../../common/MaterialTableSelect";
import { GetVendors } from "../../../../utils/services/pages/CustomerService";
import InventoryFinder from "../../../../common/product-finder/InventoryFinder";
import { getEmployees } from "./../../../../utils/services/pages/EmployeeService";
import { toggleLoadingGlobal } from "../../../../utils/store/pages/globalSettings";
import {
  PostPurchaseOrderLines,
  GetPurchaseOrderHeaderAndLine,
} from "../../../../utils/services/pages/inventory/InventoryService";

export default function PurchaseOrderForm() {
  const hist = useHistory();
  const { id: IdFromUrl, fromPage } = useParams();
  const [users, setUsers] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [vendors, setVendors] = useState([]);
  const [poLines, setPoLines] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState({});
  const [showInvFinder, setShowInvFinder] = useState(false);
  const [mockData, setMockData] = useState({
    vendorId: "",
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
      await _getVendors();
      await _getUsers();

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
        const { requestedById, vendorId } = resp.data.singleRecord.header;
        setMockData({
          requestedById,
          vendorId,
        });

        const data = resp.data.singleRecord.lines.map((n) => {
          return {
            ...n,
            id: n._id,
            name: n.inventoryMaster.name,
            unit: n.inventoryMaster.inventoryUnit.name,
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
  const _getVendors = async () => {
    //
    store.dispatch(toggleLoadingGlobal(true));

    GetVendors(true)
      .then((resp) => {
        const data = resp.data.listRecords.map((obj) => ({
          ...obj,
          id: obj._id,
        }));

        setVendors(data);
      })
      .catch(() => {
        enqueueSnackbar("GetVendors: error", {
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
      header: {
        ...mockData,
        createdById: currentUser.id,
      },
      lines: [...poLines],
    };

    if (obj.lines.length === 0) {
      enqueueSnackbar("Please create a lines first.", {
        variant: "warning",
      });
      return;
    }
    store.dispatch(toggleLoadingGlobal(true));

    const promises = [
      PostPurchaseOrderLines(obj)
        .then(() => {
          enqueueSnackbar("Adjusting the records SUCCESS.", {
            variant: "success",
          });
          hist.push("/a/inventory-management/purchase-order");
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
        header="Purchase Order"
        second="Inventory Management"
        third="Purchase Order"
      />
      <ValidatorForm
        onSubmit={() => _handlePostRecords()}
        onError={(errors) => console.log(errors)}
      >
        <Grid container alignItems="center">
          <Grid item md={6} xs={10}>
            <MaterialTableSelect
              style={{ marginBottom: 10 }}
              data={vendors}
              label="Vendor"
              name="vendorId"
              value={mockData.vendorId || ""}
              onChange={(e) => setValue(e)}
              displayKey="_id"
              displayAttribute="name"
            />
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
              tableData={poLines}
              onSelectedRow={HandleSelectedRowChange}
              tableColumns={tableColumns}
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
