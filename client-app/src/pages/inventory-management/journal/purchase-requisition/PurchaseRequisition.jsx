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
  GetPurchaseRequisition,
  PatchPurchaseOrdersApproval,
  PatchPurchaseReqApproval,
} from "../../../../utils/services/pages/inventory/InventoryService";

export default function PurchaseOrder() {
  const { enqueueSnackbar } = useSnackbar();

  const [purchReqs, setPurchReqs] = useState([]);
  const [filteredPurchReqs, setFilteredPurchReqs] = useState([]);

  const [selectedRecord, setSelectedRecord] = useState({});
  const [mockData, setMockData] = useState({
    filter: Enums.ApprovalStatus.Pending,
    action: Enums.ApprovalStatus.Approved,
  });

  const tableColumns = [
    {
      field: "purchaseRequisitionNumber",
      headerName: "Purchase Requisition #",
      width: 230,
      type: "number",
    },
    {
      field: "approvalStatus",
      headerName: "Approval Status",
      width: 190,
      sortable: true,
    },
    {
      field: "requester",
      headerName: "Requester",
      width: 200,
      sortable: false,
    },
    {
      field: "requestDate",
      headerName: "Request Date",
      width: 200,
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
    _handleGetPurchReq();
  }, []);

  useEffect(() => {
    let filteredData =
      mockData.filter === Enums.ApprovalStatus.All
        ? [...purchReqs]
        : purchReqs.filter((n) => n.approvalStatus === mockData.filter);

    setFilteredPurchReqs(filteredData);
  }, [mockData.filter]);

  useEffect(() => {
    if (selectedRecord.approvalStatus === "Pending") {
      setMockData({ ...mockData, action: Enums.ApprovalStatus.Approved });
    } else {
      setMockData({ ...mockData, action: selectedRecord.approvalStatus });
    }
  }, [selectedRecord]);

  const _postApprovePurchReq = () => {
    //
    store.dispatch(toggleLoadingGlobal(true));
    const currentUser = store.getState().entities.user.user;
    const obj = {
      ...selectedRecord,
      approvalStatus: mockData.action,
      approvedById: currentUser.id,
    };
    PatchPurchaseReqApproval(obj)
      .then((resp) => {
        _handleGetPurchReq();
      })
      .catch(() => {
        enqueueSnackbar("PatchPurchaseReqApproval: error", {
          variant: "error",
        });
      })
      .finally(() => {
        store.dispatch(toggleLoadingGlobal(false));
      });
  };
  const _handleGetPurchReq = () => {
    //
    store.dispatch(toggleLoadingGlobal(true));

    GetPurchaseRequisition()
      .then((resp) => {
        const data = resp.data.listRecords.map((obj) => ({
          ...obj,
          id: obj._id,
          requester: obj.requestedBy.firstName + " " + obj.requestedBy.lastName,
          approver:
            obj.approvedBy &&
            obj.approvedBy.firstName + " " + obj.approvedBy.lastName,
        }));
        setPurchReqs(data);
        setMockData({ ...mockData, filter: Enums.ApprovalStatus.Pending });
        let filteredData = data.filter((n) => n.approvalStatus === "Pending");
        setFilteredPurchReqs(filteredData);
      })
      .catch(() => {
        enqueueSnackbar("GetPurchaseRequisition: Error", {
          variant: "error",
        });
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
        header="Purchase Requisition"
        second="Inventory Management"
        third="Purchase Requisition"
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
              { name: "Pending", _id: Enums.ApprovalStatus.Pending },
              { name: "All", _id: Enums.ApprovalStatus.All },
            ]}
            label="PR Status filter"
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
            onClick={() => _postApprovePurchReq()}
          >
            Save
          </Button>
        </div>
      </div>

      <MaterialDataGrid
        addLink="/a/inventory-management/purchase-requisition/new"
        modifyLink={`/a/inventory-management/purchase-requisition/${selectedRecord._id}`}
        ViewRecordTitle="View Purchase Order"
        onSelectedRow={HandleSelectedRowChange}
        HandleViewRecord={
          Object.keys(selectedRecord).length > 0 ? GenericFunc : undefined
        }
        HandlePrintRecord={GenericFunc}
        HandleAddRecord={GenericFunc}
        HandleRefreshRecord={_handleGetPurchReq}
        tableData={filteredPurchReqs}
        tableColumns={tableColumns}
        sortModel={[{ field: "requestDate", sort: "desc" }]}
      />
    </div>
  );
}
