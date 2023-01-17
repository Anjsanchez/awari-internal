import clsx from "clsx";
import React from "react";
import ToolTipWithIcon from "./ToolTipWithIcon";
import { DataGrid, GridRow } from "@material-ui/data-grid";
import AddIcon from "@material-ui/icons/NoteAdd";
import PrintIcon from "@material-ui/icons/Print";
import DeleteIcon from "@material-ui/icons/Delete";
import FileCopy from "@material-ui/icons/FileCopy";
import ViewIcon from "@material-ui/icons/FindInPage";
import RestoreIcon from "@material-ui/icons/RestorePage";
import "./css/MaterialUi.css";
import { Link } from "react-router-dom";

export default function MaterialDataGrid({
  showToolbar = true,
  tableData,
  tableColumns,
  HandleViewRecord,
  HandleAddRecord,
  HandleEditRecord,
  HandleDeleteRecord,
  HandleRefreshRecord,
  HandlePrintRecord,
  printLink = "",
  onSelectedRow,
  GridHeight = 650,
  ViewRecordTitle = "View Selected Record",
  toolTipText = "",
  sortModel = undefined,
  addLink = "",
  modifyLink = "",
  processUpdate = undefined,
}) {
  const AlternateRowColor = ({ className, index, ...other }) => (
    <GridRow
      index={index}
      className={clsx(className, index % 2 === 0 ? "odd" : "even")}
      {...other}
    />
  );

  const RenderToolBar = () => {
    const RenderAddToolTip = () => {
      if (addLink === "")
        return (
          <ToolTipWithIcon
            title="Add a New Record"
            onClick={HandleAddRecord}
            Icon={AddIcon}
          />
        );

      return (
        <Link to={addLink} className="link">
          <ToolTipWithIcon title="Add a New Record" Icon={AddIcon} />
        </Link>
      );
    };

    const RenderUpdateToolTip = () => {
      if (modifyLink === "")
        return (
          <ToolTipWithIcon
            style={{ marginLeft: "10px" }}
            title={ViewRecordTitle}
            onClick={HandleViewRecord}
            Icon={ViewIcon}
          />
        );

      return (
        <Link to={modifyLink} className="link">
          <ToolTipWithIcon
            style={{ marginLeft: "10px" }}
            title={ViewRecordTitle}
            Icon={ViewIcon}
          />
        </Link>
      );
    };
    return (
      <div className="landTbl-toopTip__header__wrapper">
        <div className="landingTbl-toolTip__wrapper">
          <span>Actions: </span>
          <div className="landingTbl-toolTip__container">
            {HandleViewRecord !== undefined && RenderUpdateToolTip()}
            {HandleAddRecord !== undefined && RenderAddToolTip()}
            {HandleEditRecord !== undefined && (
              <ToolTipWithIcon
                style
                title="Edit the Selected Record"
                onClick={HandleEditRecord}
                Icon={FileCopy}
              />
            )}
            {HandleRefreshRecord !== undefined && (
              <ToolTipWithIcon
                style
                title="Refresh Records"
                onClick={HandleRefreshRecord}
                Icon={RestoreIcon}
              />
            )}
            {HandleDeleteRecord !== undefined && (
              <ToolTipWithIcon
                style
                title="Delete the Selected Record"
                onClick={HandleDeleteRecord}
                Icon={DeleteIcon}
              />
            )}
            {printLink !== "" && (
              <>
                <Link to={printLink} className="link">
                  <ToolTipWithIcon
                    style
                    title="Print the selected Record"
                    Icon={PrintIcon}
                  />
                </Link>
              </>
            )}
          </div>
        </div>
        <div className="landingTbl-tooltip-rightText">{toolTipText}</div>
      </div>
    );
  };

  return (
    <>
      {showToolbar && RenderToolBar()}
      <div style={{ height: GridHeight, width: "100%" }}>
        <DataGrid
          onRowClick={(d) => onSelectedRow(d.row)}
          rowsPerPageOptions={[15, 30, 45]}
          pageSize={15}
          rows={tableData}
          columns={tableColumns}
          rowHeight={35}
          components={{ Row: AlternateRowColor }}
          sortModel={sortModel}
          experimentalFeatures={{ newEditingApi: true }}
          onCellValueChange={processUpdate}
        />
      </div>
    </>
  );
}
