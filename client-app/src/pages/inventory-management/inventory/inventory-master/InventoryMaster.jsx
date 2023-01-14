import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
import InventoryMasterModal from "./InventoryMasterModal";
import FormHeader from "../../../../common/form/FormHeader";
import MaterialDataGrid from "../../../../common/MaterialDataGrid";
import { store } from "../../../../utils/store/configureStore";
import { toggleLoadingGlobal } from "../../../../utils/store/pages/globalSettings";
import {
  GetInventoryMaster,
  UpsertInventoryMaster,
} from "../../../../utils/services/pages/inventory/InventoryService";

export default function InventoryTypes() {
  const { enqueueSnackbar } = useSnackbar();
  const [invTypes, setInvTypes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isActionAdd, setIsActionAdd] = useState(false);
  const [selectedInvType, setSelectedInvType] = useState({});

  const tableColumns = [
    { field: "name", headerName: "Inventory Name", width: 250 },
    {
      field: "unit",
      headerName: "Unit",
      width: 120,
      sortable: false,
    },
    {
      field: "type",
      headerName: "Type",
      width: 140,
      sortable: false,
    },
    {
      field: "category",
      headerName: "Category",
      width: 150,
      sortable: false,
    },
    {
      field: "qtyMainInventory",
      headerName: "QTY Main Inv",
      width: 170,
      type: "number",
    },
    {
      field: "qtyProductionInventory",
      headerName: "QTY Prod Inv",
      width: 160,
      type: "number",
    },
    {
      field: "isActive",
      headerName: "Record Active?",
      width: 180,
      sortable: true,
      type: "boolean",
    },
    {
      field: "note",
      headerName: "Note",
      width: 450,
      sortable: false,
    },
  ];

  useEffect(() => {
    _handleGetInvType();
  }, []);

  const _handleGetInvType = () => {
    store.dispatch(toggleLoadingGlobal(true));
    GetInventoryMaster()
      .then((resp) => {
        const newData = resp.data.listRecords.map((obj) => ({
          ...obj,
          id: obj._id,
          type: `${obj.inventoryType.name}`,
          category: `${obj.productCategory.name}`,
          unit: `${obj.inventoryUnit.name}`,
        }));
        setInvTypes(newData);
      })
      .catch((error) => {
        enqueueSnackbar(
          "GetInventoryMaster: An error occured while calling the server.",
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
      UpsertInventoryMaster(data)
        .then(() => {
          _handleGetInvType();
          enqueueSnackbar("Adjusting the records SUCCESS.", {
            variant: "success",
          });
          setShowModal(false);
        })
        .catch((error) => {
          enqueueSnackbar(
            `UpsertInventoryMaster. Error while updating of records: ${error.data}`,
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
      <InventoryMasterModal
        onCloseModal={HandleShowModal}
        showModal={showModal}
        isActionAdd={isActionAdd}
        selectedData={selectedInvType}
        onSaveRecord={_handleSaveRecord}
      />
      <FormHeader
        header="Inventory Master"
        second="Inventory Management"
        third="Master"
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
