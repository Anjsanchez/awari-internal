import React from "react";
import { Card } from "antd";
import BhByRoomTbl from "./BhByRoomTbl";
import { Grid } from "@material-ui/core";
import BhByRoomChart from "./BhByRoomChart";
import BhByRoomBarChart from "./BhByRoomBarChart";

const BhByRoomsbody = ({ filteredTrans }) => {
  const formatNumber = (num) =>
    Intl.NumberFormat().format(Number(num).toFixed(2));

  const handleComputeTotalEarning = () =>
    formatNumber(filteredTrans.reduce((a, b) => a + b.totalAmount, 0));

  const handleComputeTotalTrans = () => formatNumber(filteredTrans.length);

  return (
    <div className="container__wrapper db">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <Card className="db-card__wrapper hlf" hoverable>
                <span className="db-title__span hlf">
                  ₱ {handleComputeTotalEarning()}
                </span>
                <span className="db-title__subSpan hlf">Total Earnings</span>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Card className="db-card__wrapper hlf trans" hoverable>
                <span className="db-title__span hlf trans">
                  {handleComputeTotalTrans()}
                </span>
                <span className="db-title__subSpan hlf trans">
                  Number of Room Transactions
                </span>
              </Card>
            </Grid>

            <Grid item xs={12} sm={12} md={12}>
              <BhByRoomBarChart filteredTrans={filteredTrans} />
            </Grid>
          </Grid>
        </Grid>

        {/* //.. */}
        <Grid item xs={12} sm={12} md={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <BhByRoomChart filteredTrans={filteredTrans} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* //.. */}
        <Grid item xs={12} sm={12} md={12}>
          <Grid item xs={12} sm={12} md={12}>
            <Grid container spacing={1}>
              <Grid item xs={12}>
                <BhByRoomTbl trans={filteredTrans} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {/* //.. */}
      </Grid>
    </div>
  );
};

export default BhByRoomsbody;
