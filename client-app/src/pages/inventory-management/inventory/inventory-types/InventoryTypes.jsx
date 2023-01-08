import React, { useState, useEffect } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
import FormHeader from "../../../../common/form/FormHeader";
import MaterialDataGrid from "../../../../common/MaterialDataGrid";
import { store } from "../../../../utils/store/configureStore";
import { toggleLoadingGlobal } from "../../../../utils/store/pages/globalSettings";
import { useSnackbar } from "notistack";
import InventoryTypesModal from "./InventoryTypesModal";
import {
  GetInventoryTypes,
  UpsertInventoryTypes,
} from "../../../../utils/services/pages/inventory/InventoryService";

export default function InventoryTypes() {
  const { enqueueSnackbar } = useSnackbar();
  const [invTypes, setInvTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isActionAdd, setIsActionAdd] = useState(false);
  const [selectedInvType, setSelectedInvType] = useState({});

  const tableColumns = [
    { field: "name", headerName: "Type Name", width: 350 },
    {
      field: "createdBy",
      headerName: "Created By",
      width: 300,
      sortable: false,
    },
    {
      field: "isActive",
      headerName: "Record Active?",
      width: 180,
      sortable: true,
      type: "boolean",
    },
  ];

  useEffect(() => {
    _handleGetInvType();
  }, []);

  const _handleGetInvType = () => {
    store.dispatch(toggleLoadingGlobal(true));
    GetInventoryTypes()
      .then((resp) => {
        const newData = resp.data.listRecords.map((obj) => ({
          ...obj,
          id: obj._id,
          createdBy: `${obj.user.firstName} ${obj.user.lastName}`,
        }));
        setInvTypes(newData);
      })
      .catch((error) => {
        enqueueSnackbar(
          "GetInventoryTypes: An error occured while calling the server.",
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
  const HandleSelectedRowChange = (data) => setSelectedInvType(data);

  const HandleAddOpenModal = () => {
    setIsActionAdd(true);
    setShowModal(true);
  };
  const HandleEditOpenModal = () => {
    if (Object.keys(selectedInvType).length === 0) return;

    setIsActionAdd(false);
    setShowModal(true);
  };

  const _handleSaveRecord = async (data) => {
    store.dispatch(toggleLoadingGlobal(true));
    const promises = [
      UpsertInventoryTypes(data)
        .then(() => {
          _handleGetInvType();
          enqueueSnackbar("Adjusting the records SUCCESS.", {
            variant: "success",
          });
          setShowModal(false);
        })
        .catch((error) => {
          enqueueSnackbar(
            `UpsertInventoryTypes. Error while updating of records: ${error.data}`,
            {
              variant: "error",
            }
          );
        })
        .finally(() => {
          store.dispatch(toggleLoadingGlobal(false));
          setSelectedInvType({});
        }),
    ];
    await Promise.all(promises);
  };

  return (
    <div className="container__wrapper">
      <InventoryTypesModal
        onCloseModal={HandleShowModal}
        showModal={showModal}
        isActionAdd={isActionAdd}
        selectedData={selectedInvType}
        onSaveRecord={_handleSaveRecord}
      />

      <FormHeader
        header="Types"
        second="Inventory Management"
        third="Types"
        navigate="/"
        SecondIcon={RiShoppingBag2Fill}
        isVisibleBtn={false}
      />
      <MaterialDataGrid
        onSelectedRow={HandleSelectedRowChange}
        HandleAddRecord={HandleAddOpenModal}
        HandleEditRecord={HandleEditOpenModal}
        HandleRefreshRecord={_handleGetInvType}
        tableData={invTypes}
        tableColumns={tableColumns}
      />
    </div>
  );
}
