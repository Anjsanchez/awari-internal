import { useSnackbar } from "notistack";
import React, { useState, useEffect } from "react";
import { RiShoppingBag2Fill } from "react-icons/ri";
import FormHeader from "../../../../common/form/FormHeader";
import { store } from "../../../../utils/store/configureStore";
import MaterialDataGrid from "../../../../common/MaterialDataGrid";
import ProductFinder from "./../../../../common/product-finder/ProductFinder";
import InventoryFinder from "./../../../../common/product-finder/InventoryFinder";
import { toggleLoadingGlobal } from "../../../../utils/store/pages/globalSettings";
import {
  GetBomLines,
  DeleteBomLineRecord,
  UpsertBomLine,
} from "../../../../utils/services/pages/inventory/InventoryService";

export default function BillOfMaterial() {
  const { enqueueSnackbar } = useSnackbar();
  const [bomLines, setBomLines] = useState([]);
  const [selectedBomLine, setSelectedBomLine] = useState({});
  const [selectedBomHeader, setSelectedBomHeader] = useState({});
  const [showProductFinder, setShowProductFinder] = useState(false);
  const [showInventoryFinder, setShowInventoryFinder] = useState(false);

  const tableColumns = [
    { field: "lineName", headerName: "Inventory Name", width: 400 },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 170,
      sortable: true,
      type: "number",
    },
    {
      field: "unit",
      headerName: "Unit",
      width: 170,
      sortable: false,
    },
  ];
  const HandleSelectedRowChange = (data) => setSelectedBomLine(data);
  const HandleSearchOpenModal = () => setShowProductFinder(true);

  const HandleAddOpenModal = () => {
    if (Object.keys(selectedBomHeader).length === 0)
      return enqueueSnackbar("Kindly select a record first.", {
        variant: "warning",
      });

    setShowInventoryFinder(true);
  };

  const _handleSelectedRecord = async (data) => {
    setShowProductFinder(false);
    setSelectedBomHeader(data);
    store.dispatch(toggleLoadingGlobal(true));

    GetBomLines(data._id)
      .then((resp) => {
        const newData = resp.data.listRecords.map((obj) => ({
          ...obj,
          id: obj._id,
          lineName: obj.line.name,
          unit: obj.line.inventoryUnit.name,
        }));
        setBomLines(newData);
      })
      .catch((error) => {
        enqueueSnackbar(
          "GetBomLines: An error occured while calling the server.",
          {
            variant: "error",
          }
        );
      })
      .finally(() => {
        store.dispatch(toggleLoadingGlobal(false));
      });
  };

  const _handleDeleteSelectedRecord = async () => {
    if (Object.keys(selectedBomLine).length === 0) return;

    store.dispatch(toggleLoadingGlobal(true));
    DeleteBomLineRecord(selectedBomHeader._id, selectedBomLine.lineId)
      .then((resp) => {
        _handleSelectedRecord(selectedBomHeader);

        enqueueSnackbar("Deleting of record SUCCESS", {
          variant: "success",
        });
      })
      .catch((error) => {
        enqueueSnackbar(
          "DeleteBomLineRecord: An error occured while calling the server.",
          {
            variant: "error",
          }
        );
      })
      .finally(() => {
        store.dispatch(toggleLoadingGlobal(false));

        setSelectedBomLine({});
      });
  };
  const _handleSaveBomLines = async (inv, quantity) => {
    const data = {
      HeaderId: selectedBomHeader._id,
      LineId: inv._id,
      Quantity: quantity.quantity,
    };

    store.dispatch(toggleLoadingGlobal(true));
    const promises = [
      UpsertBomLine(data)
        .then(() => {
          _handleSelectedRecord(selectedBomHeader);
          enqueueSnackbar("Adjusting the records SUCCESS.", {
            variant: "success",
          });
        })
        .catch((error) => {
          enqueueSnackbar(
            `UpsertBomLine. Error while updating of records: ${error.data}`,
            {
              variant: "error",
            }
          );
        })
        .finally(() => {
          store.dispatch(toggleLoadingGlobal(false));
          setSelectedBomLine({});
          setShowInventoryFinder(false);
        }),
    ];
    await Promise.all(promises);
  };

  return (
    <div className="container__wrapper">
      <InventoryFinder
        onCloseModal={() => setShowInventoryFinder(false)}
        showModal={showInventoryFinder}
        onSaveRecord={_handleSaveBomLines}
      />

      <ProductFinder
        onCloseModal={() => setShowProductFinder(false)}
        showModal={showProductFinder}
        onSelectRecord={_handleSelectedRecord}
      />

      <FormHeader
        header="Bill of Material"
        second="Inventory Management"
        third="Bill of Material"
        navigate="/"
        SecondIcon={RiShoppingBag2Fill}
        isVisibleBtn={false}
      />

      <MaterialDataGrid
        ViewRecordTitle="Search a Product Header"
        GridHeight={350}
        HandleViewRecord={HandleSearchOpenModal}
        onSelectedRow={HandleSelectedRowChange}
        HandleDeleteRecord={_handleDeleteSelectedRecord}
        HandleAddRecord={HandleAddOpenModal}
        tableData={bomLines}
        tableColumns={tableColumns}
        toolTipText={selectedBomHeader.longName || ""}
      />
    </div>
  );
}
