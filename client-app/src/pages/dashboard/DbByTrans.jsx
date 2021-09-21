import React from "react";
import { Card } from "antd";
import { List } from "@material-ui/core";
import AListItem from "./../../common/antd/AListItem";
import ActiveButton from "./../../common/form/ActiveButton";

const DbByTrans = ({ rTrans }) => {
  const formatNumber = (num) =>
    Intl.NumberFormat().format(Number(num).toFixed(2));

  const renderEndDate = (d) => {
    //
    let val = formatNumber(d.quantity * d.product.sellingPrice - d.netDiscount);

    if (!d.z) return val;

    return <ActiveButton value={true} textTrue={val} />;
  };

  return (
    <Card className="db-card-list__wrapper rm" hoverable>
      <div className="db-cl-span__wrapper">
        <span className="db-cl__span">Transaction Today</span>
        <span className="db-cl__span">
          <ActiveButton textTrue={rTrans.length} value={true} />
        </span>
      </div>
      <div className="db-cl-body__container">
        <List component="nav" aria-label="mailbox folders">
          {rTrans.map((d) => (
            <AListItem
              key={d._id}
              txtLbl={d.product.longName}
              txtValue={renderEndDate(d)}
            />
          ))}
        </List>
      </div>
    </Card>
  );
};

export default DbByTrans;
