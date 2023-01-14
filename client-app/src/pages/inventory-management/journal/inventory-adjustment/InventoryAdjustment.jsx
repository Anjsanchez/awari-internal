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
  PatchInvAdjApproval,
} from "../../../../utils/services/pages/inventory/InventoryService";

export default function InventoryAdjustment() {
  const { enqueueSnackbar } = useSnackbar();

  const [invAdjustments, setInvAdjustments] = useState([]);
  const [filteredInvAdjustments, setFilteredInvAdjustments] = useState([]);

  const [selectedRecord, setSelectedRecord] = useState({});
  const [mockData, setMockData] = useState({
    filter: Enums.ApprovalStatus.Pending,
    action: Enums.ApprovalStatus.Approved,
  });

  const tableColumns = [
    {
      field: "journalNumber",
      headerName: "Inventory Journal #",
      width: 200,
      type: "number",
    },
    {
      field: "approvalStatus",
      headerName: "Approval Status",
      width: 190,
      sortable: true,
    },
    {
      field: "approvalStatus",
      headerName: "Approval Status",
      width: 190,
      sortable: true,
    },
    {
      field: "adjustmentType",
      headerName: "Adjustment Type",
      width: 250,
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
      field: "reason",
      headerName: "Reason",
      width: 500,
      sortable: false,
    },
  ];

  useEffect(() => {
    _handleGetAdjustments();
  }, []);

  useEffect(() => {
    let filteredData =
      mockData.filter === Enums.ApprovalStatus.All
        ? [...invAdjustments]
        : invAdjustments.filter((n) => n.approvalStatus === mockData.filter);

    setFilteredInvAdjustments(filteredData);
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
    PatchInvAdjApproval(obj)
      .then((resp) => {
        _handleGetAdjustments();
      })
      .catch(() => {
        enqueueSnackbar("PatchInvAdjApproval: ERROR", {
          variant: "error",
        });
      })
      .finally(() => {
        store.dispatch(toggleLoadingGlobal(false));
      });
  };
  const _handleGetAdjustments = () => {
    //
    store.dispatch(toggleLoadingGlobal(true));

    GetInventoryAdjustments()
      .then((resp) => {
        const data = resp.data.listRecords.map((obj) => ({
          ...obj,
          id: obj._id,
          requester: obj.requestedBy.firstName + " " + obj.requestedBy.lastName,
          approver:
            obj.approvedBy &&
            obj.approvedBy.firstName + " " + obj.approvedBy.lastName,
        }));

        setInvAdjustments(data);
        setMockData({ ...mockData, filter: Enums.ApprovalStatus.Pending });
        let filteredData = data.filter((n) => n.approvalStatus === "Pending");
        setFilteredInvAdjustments(filteredData);
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
        header="Inventory Adjustment"
        second="Inventory Management"
        third="Inventory Adjustment"
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
            label="Adjustment Status filter"
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
        addLink="/a/inventory-management/inventory-adjustment/new"
        modifyLink={`/a/inventory-management/inventory-adjustment/${selectedRecord._id}`}
        onSelectedRow={HandleSelectedRowChange}
        HandleViewRecord={
          Object.keys(selectedRecord).length > 0 ? GenericFunc : undefined
        }
        HandleAddRecord={GenericFunc}
        HandleRefreshRecord={_handleGetAdjustments}
        tableData={filteredInvAdjustments}
        tableColumns={tableColumns}
        sortModel={[{ field: "requestDate", sort: "desc" }]}
      />
    </div>
  );
}
