import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
import InventoryUnitsModal from "./InventoryUnitsModal";
import FormHeader from "../../../../common/form/FormHeader";
import { store } from "../../../../utils/store/configureStore";
import MaterialDataGrid from "../../../../common/MaterialDataGrid";
import { toggleLoadingGlobal } from "../../../../utils/store/pages/globalSettings";
import {
  GetInventoryUnits,
  UpsertInventoryUnits,
} from "../../../../utils/services/pages/inventory/InventoryService";

export default function InventoryUnits() {
  const { enqueueSnackbar } = useSnackbar();
  const [invUnits, setinvUnits] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isActionAdd, setIsActionAdd] = useState(false);
  const [selectedInvUnit, setSelectedInvUnit] = useState({});

  const tableColumns = [
    { field: "name", headerName: "Unit Name", width: 350 },
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
      sortable: false,
      type: "boolean",
    },
  ];

  useEffect(() => {
    _handleGetInvUnit();
  }, []);

  const _handleGetInvUnit = () => {
    store.dispatch(toggleLoadingGlobal(true));
    GetInventoryUnits()
      .then((resp) => {
        const newData = resp.data.listRecords.map((obj) => ({
          ...obj,
          id: obj._id,
          createdBy: `${obj.user.firstName} ${obj.user.lastName}`,
        }));
        setinvUnits(newData);
      })
      .catch((error) => {
        enqueueSnackbar(
          "GetInventoryUnits: An error occured while calling the server.",
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
  const HandleSelectedRowChange = (data) => setSelectedInvUnit(data);

  const HandleAddOpenModal = () => {
    setIsActionAdd(true);
    setShowModal(true);
  };
  const HandleEditOpenModal = () => {
    if (Object.keys(selectedInvUnit).length === 0) return;

    setIsActionAdd(false);
    setShowModal(true);
  };

  const _handleSaveRecord = async (data) => {
    store.dispatch(toggleLoadingGlobal(true));
    const promises = [
      UpsertInventoryUnits(data)
        .then(() => {
          _handleGetInvUnit();
          enqueueSnackbar("Adjusting the records SUCCESS.", {
            variant: "success",
          });
          setShowModal(false);
        })
        .catch((error) => {
          enqueueSnackbar(
            `UpsertInventoryUnits. Error while updating of records: ${error.data}`,
            {
              variant: "error",
            }
          );
        })
        .finally(() => {
          store.dispatch(toggleLoadingGlobal(false));
          setSelectedInvUnit({});
        }),
    ];
    await Promise.all(promises);
  };

  return (
    <div className="container__wrapper">
      <InventoryUnitsModal
        onCloseModal={HandleShowModal}
        showModal={showModal}
        isActionAdd={isActionAdd}
        selectedData={selectedInvUnit}
        onSaveRecord={_handleSaveRecord}
      />

      <FormHeader
        header="Units"
        second="Inventory Management"
        third="Units"
        navigate="/"
        SecondIcon={RiShoppingBag2Fill}
        isVisibleBtn={false}
      />

      <MaterialDataGrid
        onSelectedRow={HandleSelectedRowChange}
        HandleAddRecord={HandleAddOpenModal}
        HandleEditRecord={HandleEditOpenModal}
        HandleRefreshRecord={_handleGetInvUnit}
        tableData={invUnits}
        tableColumns={tableColumns}
      />
    </div>
  );
}
