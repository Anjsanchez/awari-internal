import { useSnackbar } from "notistack";
import { Button } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
import FormHeader from "../../../../common/form/FormHeader";
import { store } from "../../../../utils/store/configureStore";
import MaterialDataGrid from "../../../../common/MaterialDataGrid";
import Enums from "../../../../utils/services/pages/inventory/Enums";
import MaterialTableSelect from "../../../../common/MaterialTableSelect";
import { toggleLoadingGlobal } from "../../../../utils/store/pages/globalSettings";
import {
  GetPurchaseOrders,
  PatchPurchaseOrdersApproval,
} from "../../../../utils/services/pages/inventory/InventoryService";

export default function PurchaseOrder() {
  const { enqueueSnackbar } = useSnackbar();

  const [purchOrders, setPurchOrders] = useState([]);
  const [filteredPurchOrders, setFilteredPurchOrders] = useState([]);

  const [selectedRecord, setSelectedRecord] = useState({});
  const [mockData, setMockData] = useState({
    filter: Enums.ApprovalStatus.Pending,
    action: Enums.ApprovalStatus.Approved,
  });

  const tableColumns = [
    {
      field: "purchaseOrderNumber",
      headerName: "Purchase Order #",
      width: 200,
      type: "number",
    },
    {
      field: "vendorName",
      headerName: "Vendor",
      width: 230,
      sortable: false,
    },
    {
      field: "approvalStatus",
      headerName: "Approval Status",
      width: 190,
      sortable: true,
    },
    {
      field: "rcvStatus",
      headerName: "Receive Status",
      width: 190,
      sortable: true,
    },
    {
      field: "requester",
      headerName: "Requested By",
      width: 200,
      sortable: false,
    },
    {
      field: "requestDate",
      headerName: "Request Date",
      width: 250,
      sortable: true,
    },
    {
      field: "approver",
      headerName: "Approved/Rejected By",
      width: 200,
      sortable: false,
    },
    {
      field: "approvedDate",
      headerName: "Approved/Rejected Date",
      width: 250,
      sortable: true,
    },
    {
      field: "totalQuantity",
      headerName: "Total Quantity",
      width: 150,
      type: "number",
      sortable: false,
    },
  ];

  useEffect(() => {
    _handleGetPurchOrder();
  }, []);

  useEffect(() => {
    let filteredData =
      mockData.filter === Enums.ApprovalStatus.All
        ? [...purchOrders]
        : purchOrders.filter((n) => n.approvalStatus === mockData.filter);

    setFilteredPurchOrders(filteredData);
  }, [mockData.filter]);

  useEffect(() => {
    if (selectedRecord.approvalStatus === "Pending") {
      setMockData({ ...mockData, action: Enums.ApprovalStatus.Approved });
    } else {
      setMockData({ ...mockData, action: selectedRecord.approvalStatus });
    }
  }, [selectedRecord]);

  const _postApprovePurchOrder = () => {
    //
    store.dispatch(toggleLoadingGlobal(true));
    const currentUser = store.getState().entities.user.user;
    const obj = {
      ...selectedRecord,
      approvalStatus: mockData.action,
      approvedById: currentUser.id,
    };
    PatchPurchaseOrdersApproval(obj)
      .then((resp) => {
        _handleGetPurchOrder();
      })
      .catch(() => {
        enqueueSnackbar(
          "PatchPurchaseOrdersApproval: An error occured while calling the server.",
          {
            variant: "error",
          }
        );
      })
      .finally(() => {
        store.dispatch(toggleLoadingGlobal(false));
      });
  };
  const _handleGetPurchOrder = () => {
    //
    store.dispatch(toggleLoadingGlobal(true));

    GetPurchaseOrders()
      .then((resp) => {
        const data = resp.data.listRecords.map((obj) => ({
          ...obj,
          id: obj._id,
          requester: obj.requestedBy.firstName + " " + obj.requestedBy.lastName,
          approver:
            obj.approvedBy &&
            obj.approvedBy.firstName + " " + obj.approvedBy.lastName,
          vendorName: obj.vendor.name,
        }));

        setPurchOrders(data);
        setMockData({ ...mockData, filter: Enums.ApprovalStatus.Pending });
        let filteredData = data.filter((n) => n.approvalStatus === "Pending");
        setFilteredPurchOrders(filteredData);
      })
      .catch(() => {
        enqueueSnackbar(
          "GetPurchaseOrders: An error occured while calling the server.",
          {
            variant: "error",
          }
        );
      })
      .finally(() => {
        store.dispatch(toggleLoadingGlobal(false));
      });
  };

  const GenericFunc = () => {};
  const HandleSelectedRowChange = (data) => setSelectedRecord(data);
  const setValue = (e) => {
    const { name, value } = e.target;

    setMockData({
      ...mockData,
      [name]: value,
    });
  };

  const HandleValidateReadOnly = () => {
    //true will disable the textbox.
    const currentUser = store.getState().entities.user.user;
    if (currentUser.role.rolename !== "Administrator") return true;
    return selectedRecord.approvalStatus !== "Pending" ? true : false;
  };

  return (
    <div className="container__wrapper">
      <FormHeader
        header="Purchase Order"
        second="Inventory Management"
        third="Purchase Order"
        navigate="/"
        SecondIcon={RiShoppingBag2Fill}
        isVisibleBtn={false}
      />
      <div className="po-header__wrapper">
        <div className="po-statusFilter__wrapper">
          <MaterialTableSelect
            data={[
              { name: "Approved", _id: Enums.ApprovalStatus.Approved },
              { name: "Rejected", _id: Enums.ApprovalStatus.Rejected },
              { name: "Cancelled", _id: Enums.ApprovalStatus.Cancelled },
              { name: "Pending", _id: Enums.ApprovalStatus.Pending },
              { name: "All", _id: Enums.ApprovalStatus.All },
            ]}
            label="PO Status Filter"
            value={mockData.filter || Enums.ApprovalStatus.Pending}
            name="filter"
            onChange={(e) => setValue(e)}
            displayKey="_id"
            displayAttribute="name"
          />
        </div>
        <div className="po-approvalFilter__wrapper">
          <MaterialTableSelect
            data={[
              { name: "Approve Request", _id: Enums.ApprovalStatus.Approved },
              { name: "Reject Request", _id: Enums.ApprovalStatus.Rejected },
              { name: "Cancel Request", _id: Enums.ApprovalStatus.Cancelled },
            ]}
            label="Approval Action"
            value={mockData.action || Enums.ApprovalStatus.Action}
            name="action"
            onChange={(e) => setValue(e)}
            readOnly={HandleValidateReadOnly()}
            displayKey="_id"
            displayAttribute="name"
          />
          <Button
            type="submit"
            variant="outlined"
            color="primary"
            disabled={HandleValidateReadOnly()}
            style={{ marginLeft: 5 }}
            onClick={() => _postApprovePurchOrder()}
          >
            Save
          </Button>
        </div>
      </div>

      <MaterialDataGrid
        addLink="/a/inventory-management/purchase-order/new&fromPage=po"
        modifyLink={`/a/inventory-management/purchase-order/${selectedRecord._id}&fromPage=po`}
        ViewRecordTitle="View Purchase Order"
        onSelectedRow={HandleSelectedRowChange}
        HandleViewRecord={
          Object.keys(selectedRecord).length > 0 ? GenericFunc : undefined
        }
        HandlePrintRecord={GenericFunc}
        HandleAddRecord={GenericFunc}
        HandleRefreshRecord={_handleGetPurchOrder}
        tableData={filteredPurchOrders}
        tableColumns={tableColumns}
        sortModel={[{ field: "requestDate", sort: "desc" }]}
      />
    </div>
  );
}
