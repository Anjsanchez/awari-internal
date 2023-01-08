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
import { GetPurchaseOrders } from "../../../../utils/services/pages/inventory/InventoryService";
import { Link } from "react-router-dom";

export default function GoodsReceiving() {
  const { enqueueSnackbar } = useSnackbar();

  const [purchOrders, setPurchOrders] = useState([]);
  const [filteredPurchOrders, setFilteredPurchOrders] = useState([]);

  const [selectedRecord, setSelectedRecord] = useState({});
  const [mockData, setMockData] = useState({
    filter: Enums.ReceivedStatus.Unreceived,
    action: Enums.ApprovalStatus.Approved,
  });

  const tableColumns = [
    {
      field: "purchaseOrderNumber",
      headerName: "Purchase Order #",
      width: 190,
      type: "number",
    },
    {
      field: "invoiceNumber",
      headerName: "Invoice Number",
      width: 190,
      sortable: false,
    },
    {
      field: "vendorName",
      headerName: "Vendor",
      width: 230,
      sortable: false,
    },
    {
      field: "rcvStatus",
      headerName: "Receive Status",
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
      field: "receiver",
      headerName: "Received By",
      width: 200,
      sortable: false,
    },
    {
      field: "receivedByDate",
      headerName: "Received Date",
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
      mockData.filter === Enums.ReceivedStatus.All
        ? [...purchOrders]
        : purchOrders.filter((n) => n.rcvStatus === mockData.filter);

    setFilteredPurchOrders(filteredData);
  }, [mockData.filter]);

  const _handleGetPurchOrder = () => {
    //
    store.dispatch(toggleLoadingGlobal(true));

    GetPurchaseOrders()
      .then((resp) => {
        let data = resp.data.listRecords.map((obj) => ({
          ...obj,
          id: obj._id,
          requester: obj.requestedBy.firstName + " " + obj.requestedBy.lastName,
          approver:
            obj.approvedBy &&
            obj.approvedBy.firstName + " " + obj.approvedBy.lastName,
          vendorName: obj.vendor.name,
          receiver:
            obj.receivedBy &&
            obj.receivedBy.firstName + " " + obj.receivedBy.lastName,
        }));
        data = data.filter((n) => n.approvalStatus === "Approved");
        let filteredData = data.filter((n) => n.rcvStatus !== "Received");
        setPurchOrders(data);
        setMockData({ ...mockData, filter: Enums.ReceivedStatus.Unreceived });
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
    return selectedRecord.rcvStatus === "Received" ? true : false;
  };

  return (
    <div className="container__wrapper">
      <FormHeader
        header="Goods Receiving"
        second="Inventory Management"
        third="Goods Receiving"
        navigate="/"
        SecondIcon={RiShoppingBag2Fill}
        isVisibleBtn={false}
      />
      <div className="po-header__wrapper">
        <div className="po-statusFilter__wrapper">
          <MaterialTableSelect
            data={[
              { name: "Received", _id: Enums.ReceivedStatus.Received },
              { name: "Unreceived", _id: Enums.ReceivedStatus.Unreceived },
              { name: "All", _id: Enums.ReceivedStatus.All },
            ]}
            label="Received Status Filter"
            value={mockData.filter || Enums.ReceivedStatus.Unreceived}
            name="filter"
            onChange={(e) => setValue(e)}
            displayKey="_id"
            displayAttribute="name"
          />
        </div>
        <div className="po-approvalFilter__wrapper rcv">
          {Object.keys(selectedRecord).length > 0 && (
            <Link
              to={`/a/inventory-management/goods-receiving/${selectedRecord._id}&fromPage=rcv`}
              className="link"
            >
              <Button
                type="button"
                variant="outlined"
                color="primary"
                style={{ marginLeft: 5 }}
              >
                {selectedRecord.rcvStatus === "Received" ? "View" : "Receive"}
              </Button>
            </Link>
          )}
        </div>
      </div>

      <MaterialDataGrid
        modifyLink={`/a/inventory-management/purchase-order/${selectedRecord._id}&fromPage=rcv`}
        ViewRecordTitle="View Purchase Order"
        onSelectedRow={HandleSelectedRowChange}
        HandleViewRecord={
          Object.keys(selectedRecord).length > 0 ? GenericFunc : undefined
        }
        HandlePrintRecord={GenericFunc}
        HandleRefreshRecord={_handleGetPurchOrder}
        tableData={filteredPurchOrders}
        tableColumns={tableColumns}
        sortModel={[{ field: "requestDate", sort: "desc" }]}
      />
    </div>
  );
}
