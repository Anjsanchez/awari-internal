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
  GetInventoryAdjustments,
  GetWorkOrders,
  PatchInvAdjApproval,
  PatchWorkOrderApproval,
} from "../../../../utils/services/pages/inventory/InventoryService";

export default function WorkOrder() {
  const { enqueueSnackbar } = useSnackbar();

  const [workOrders, setWorkOrders] = useState([]);
  const [filteredWorkOrders, setFilteredWorkOrders] = useState([]);

  const [selectedRecord, setSelectedRecord] = useState({});
  const [mockData, setMockData] = useState({
    filter: Enums.ApprovalStatus.Pending,
    action: Enums.ApprovalStatus.Approved,
  });

  const tableColumns = [
    {
      field: "workOrderNumber",
      headerName: "Work Order #",
      width: 170,
      type: "number",
    },
    {
      field: "approvalStatus",
      headerName: "Approval Status",
      width: 180,
      sortable: true,
    },
    {
      field: "typeOfWork",
      headerName: "Work Type",
      width: 160,
      sortable: false,
    },
    {
      field: "location",
      headerName: "Location",
      width: 160,
      sortable: true,
    },
    {
      field: "typeOfWork",
      headerName: "Work Type",
      width: 160,
      sortable: false,
    },
    {
      field: "targetWorkDate",
      headerName: "Target Start Date",
      width: 250,
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
      field: "createdBy",
      headerName: "Created By",
      width: 200,
      sortable: false,
    },
  ];

  useEffect(() => {
    _handleGetRecords();
  }, []);

  useEffect(() => {
    let filteredData =
      mockData.filter === Enums.ApprovalStatus.All
        ? [...workOrders]
        : workOrders.filter((n) => n.approvalStatus === mockData.filter);

    setFilteredWorkOrders(filteredData);
  }, [mockData.filter]);

  useEffect(() => {
    if (selectedRecord.approvalStatus === "Pending") {
      setMockData({ ...mockData, action: Enums.ApprovalStatus.Approved });
    } else {
      setMockData({ ...mockData, action: selectedRecord.approvalStatus });
    }
  }, [selectedRecord]);

  const _postApproveInvAdj = () => {
    //
    store.dispatch(toggleLoadingGlobal(true));
    const currentUser = store.getState().entities.user.user;
    const obj = {
      ...selectedRecord,
      approvalStatus: mockData.action,
      approvedById: currentUser.id,
    };
    PatchWorkOrderApproval(obj)
      .then((resp) => {
        _handleGetRecords();
      })
      .catch(() => {
        enqueueSnackbar("PatchWorkOrderApproval: ERROR", {
          variant: "error",
        });
      })
      .finally(() => {
        store.dispatch(toggleLoadingGlobal(false));
      });
  };
  const _handleGetRecords = () => {
    //
    store.dispatch(toggleLoadingGlobal(true));

    GetWorkOrders()
      .then((resp) => {
        const data = resp.data.listRecords.map((obj) => ({
          ...obj,
          id: obj._id,
          requester: obj.requestedBy.firstName + " " + obj.requestedBy.lastName,
          createdBy: obj.createdBy.firstName + " " + obj.createdBy.lastName,
          approver:
            obj.approvedBy &&
            obj.approvedBy.firstName + " " + obj.approvedBy.lastName,
        }));

        setWorkOrders(data);
        setMockData({ ...mockData, filter: Enums.ApprovalStatus.Pending });
        let filteredData = data.filter((n) => n.approvalStatus === "Pending");
        setFilteredWorkOrders(filteredData);
      })
      .catch(() => {
        enqueueSnackbar("GetInventoryAdjustments: ERROR", {
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
        header="Work Order"
        second="Inventory Management"
        third="Work Order"
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
            label="Order filter"
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
            onClick={() => _postApproveInvAdj()}
          >
            Save
          </Button>
        </div>
      </div>

      <MaterialDataGrid
        addLink="/a/inventory-management/work-order/new"
        modifyLink={`/a/inventory-management/work-order/${selectedRecord._id}`}
        onSelectedRow={HandleSelectedRowChange}
        HandleViewRecord={
          Object.keys(selectedRecord).length > 0 ? GenericFunc : undefined
        }
        printLink={
          Object.keys(selectedRecord).length > 0
            ? `/a/reports/WO/${selectedRecord._id}`
            : ""
        }
        HandleAddRecord={GenericFunc}
        HandleRefreshRecord={_handleGetRecords}
        tableData={filteredWorkOrders}
        tableColumns={tableColumns}
        sortModel={[{ field: "requestDate", sort: "desc" }]}
      />
    </div>
  );
}
