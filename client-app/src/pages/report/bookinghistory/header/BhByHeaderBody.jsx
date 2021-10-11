import React from "react";
import { Card } from "antd";
import DbByHeaderTbl from "./DbByHeaderTbl";
import { Grid, Hidden } from "@material-ui/core";
import ByHeaderBarChart from "./ByHeaderBarChart";
import ByHeaderChartTrans from "./ByHeaderChartTrans";

const BhByHeaderBody = ({ filteredTransHeader }) => {
  const formatNumber = (num) =>
    Intl.NumberFormat().format(Number(num).toFixed(2));

  const handleComputeTotalEarning = () =>
    formatNumber(filteredTransHeader.reduce((a, b) => a + b.netAmount, 0));

  const handleComputeTotalRooms = () => {
    return formatNumber(
      filteredTransHeader.reduce((a, b) => a + b.totalNumberOfRooms, 0)
    );
  };
  const handleComputeTotalTrans = () =>
    formatNumber(
      filteredTransHeader.reduce((a, b) => a + b.totalNumberOfTrans, 0)
    );

  const handleComputeGuests = () =>
    formatNumber(
      filteredTransHeader.reduce((a, b) => a + b.totalNumberOfGuest, 0)
    );

  return (
    <div className="container__wrapper db">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="db-card__wrapper" hoverable>
            <span className="db-title__span">
              ₱ {handleComputeTotalEarning()}
            </span>
            <span className="db-title__subSpan">Total Earnings</span>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card className="db-card__wrapper nog" hoverable>
            <span className="db-title__span">{handleComputeGuests()}</span>
            <span className="db-title__subSpan nog">Number of Guests</span>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Card className="db-card__wrapper hlf" hoverable>
                <span className="db-title__span hlf">
                  {handleComputeTotalTrans()}
                </span>
                <span className="db-title__subSpan hlf">
                  Number of Transactions
                </span>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Hidden smDown>
                <Card className="db-card__wrapper hlf trans" hoverable>
                  <span className="db-title__span hlf trans">
                    {handleComputeTotalRooms()}
                  </span>
                  <span className="db-title__subSpan hlf trans">
                    Number of Rooms
                  </span>
                </Card>
              </Hidden>
            </Grid>
          </Grid>
        </Grid>
        <Hidden mdUp>
          <Grid item xs={12} sm={6} md={4}>
            <Card className="db-card__wrapper hlf trans" hoverable>
              <span className="db-title__span hlf trans">
                {handleComputeTotalRooms()}
              </span>
              <span className="db-title__subSpan hlf trans">
                Number of Rooms
              </span>
            </Card>
          </Grid>
        </Hidden>
        <Grid item xs={12} sm={12} md={7}>
          <ByHeaderBarChart filteredTransHeader={filteredTransHeader} />
        </Grid>
        <Grid item xs={12} sm={12} md={5}>
          <ByHeaderChartTrans filteredTransHeader={filteredTransHeader} />
        </Grid>
        <Grid item xs={12}>
          <DbByHeaderTbl headers={filteredTransHeader} />
        </Grid>
      </Grid>
    </div>
  );
};

export default BhByHeaderBody;
