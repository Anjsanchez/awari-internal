import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
import FormHeader from "../../../common/form/FormHeader";
import MaterialDataGrid from "./../../../common/MaterialDataGrid";
import { toggleLoadingGlobal } from "../../../utils/store/pages/globalSettings";
import { store } from "../../../utils/store/configureStore";
import {
  GetVendors,
  UpsertVendors,
} from "../../../utils/services/pages/CustomerService";
import VendorModal from "./VendorModal";
export default function Vendors() {
  const { enqueueSnackbar } = useSnackbar();
  const [vendors, setVendors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isActionAdd, setIsActionAdd] = useState(false);
  const [selectedVendor, setSelectedVendors] = useState({});

  const tableColumns = [
    { field: "name", headerName: "Vendor Name", width: 300 },
    {
      field: "mobile",
      headerName: "Mobile",
      width: 180,
      sortable: false,
    },
    {
      field: "address",
      headerName: "Address",
      width: 300,
      sortable: false,
    },
    {
      field: "emailAddress",
      headerName: "Email Address",
      width: 200,
      sortable: false,
    },
    {
      field: "isActive",
      headerName: "Record Active?",
      width: 180,
      sortable: false,
      type: "boolean",
    },
  ];

  useEffect(() => {
    _handleGetInvUnit();
  }, []);

  const _handleGetInvUnit = () => {
    store.dispatch(toggleLoadingGlobal(true));
    GetVendors()
      .then((resp) => {
        const newData = resp.data.listRecords.map((obj) => ({
          ...obj,
          id: obj._id,
        }));
        setVendors(newData);
      })
      .catch((error) => {
        enqueueSnackbar(
          "GetVendors: An error occured while calling the server.",
          {
            variant: "error",
          }
        );
      })
      .finally(() => {
        store.dispatch(toggleLoadingGlobal(false));
      });
  };

  const HandleShowModal = (show) => setShowModal(show);
  const HandleSelectedRowChange = (data) => setSelectedVendors(data);

  const HandleAddOpenModal = () => {
    setIsActionAdd(true);
    setShowModal(true);
  };
  const HandleEditOpenModal = () => {
    if (Object.keys(selectedVendor).length === 0) return;

    setIsActionAdd(false);
    setShowModal(true);
  };

  const _handleSaveRecord = async (data) => {
    store.dispatch(toggleLoadingGlobal(true));
    const promises = [
      UpsertVendors(data)
        .then(() => {
          _handleGetInvUnit();
          enqueueSnackbar("Adjusting the records SUCCESS.", {
            variant: "success",
          });
          setShowModal(false);
        })
        .catch((error) => {
          enqueueSnackbar(
            `UpsertVendors. Error while updating of records: ${error.data}`,
            {
              variant: "error",
            }
          );
        })
        .finally(() => {
          store.dispatch(toggleLoadingGlobal(false));
          setSelectedVendors({});
        }),
    ];
    await Promise.all(promises);
  };

  return (
    <div className="container__wrapper">
      <VendorModal
        onCloseModal={HandleShowModal}
        showModal={showModal}
        isActionAdd={isActionAdd}
        selectedData={selectedVendor}
        onSaveRecord={_handleSaveRecord}
      />

      <FormHeader
        header="Vendors"
        second="User Management"
        third="Vendors"
        navigate="/"
        SecondIcon={RiShoppingBag2Fill}
        isVisibleBtn={false}
      />

      <MaterialDataGrid
        onSelectedRow={HandleSelectedRowChange}
        HandleAddRecord={HandleAddOpenModal}
        HandleEditRecord={HandleEditOpenModal}
        HandleRefreshRecord={_handleGetInvUnit}
        tableData={vendors}
        tableColumns={tableColumns}
      />
    </div>
  );
}
