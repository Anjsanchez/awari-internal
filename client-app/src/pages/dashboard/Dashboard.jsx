import { Card } from "antd";
import moment from "moment";
import "./css/Dashboard.css";
import DbChart from "./DbChart";
import DbByRoom from "./DbByRoom";
import DbByGuest from "./DbByGuest";
import DbByTrans from "./DbByTrans";
import { useSnackbar } from "notistack";
import { Grid } from "@material-ui/core";
import DbCheckOutTbl from "./DbCheckOutTbl";
import { useMountedState } from "react-use";
import SpinLoader from "./../../common/Spin";
import React, { useEffect, useState } from "react";
import { getTransHeaders } from "./../../utils/services/pages/trans/TransHeaderService";
import { getHeaders } from "./../../utils/services/pages/reservation/ReservationHeader";
import { GetRoomLines } from "./../../utils/services/pages/reservation/ReservationLines";
import { includesTransLines } from "./../../utils/services/pages/reservation/ReservationTrans";

const Dashboard = () => {
  const isMounted = useMountedState();
  const { enqueueSnackbar } = useSnackbar();
  const [tHeaders, setTHeaders] = useState([]);
  const [rHeaders, setRHeaders] = useState([]);
  const [rRmLines, setRRmLines] = useState([]);
  const [rTrans, setRTrans] = useState([]);
  const [initialLoadForm, setInitialLoadForm] = useState(false);

  useEffect(() => {
    //..
    async function fetchTransHeader() {
      try {
        const { data } = await getTransHeaders(true);
        const { listRecords } = data;

        if (!isMounted()) return;

        setTHeaders(listRecords);
      } catch (error) {
        enqueueSnackbar("0005: " + error, {
          variant: "error",
        });
        return () => {
          setTHeaders({});
        };
      }
    }
    async function fetchRByHeader() {
      try {
        const { data } = await getHeaders(true);
        const { listRecords } = data;

        if (!isMounted()) return;

        setRHeaders(listRecords);
      } catch (error) {
        enqueueSnackbar("0006: " + error, {
          variant: "error",
        });
        return () => {
          setRHeaders({});
        };
      }
    }
    async function fetchRoomLines() {
      try {
        const { data } = await GetRoomLines(true);
        const { listRecords } = data;

        if (!isMounted()) return;

        setRRmLines(listRecords);
      } catch (error) {
        enqueueSnackbar("0007: " + error, {
          variant: "error",
        });
        return () => {
          setRHeaders({});
        };
      }
    }

    async function fetchTrans() {
      try {
        const { data } = await includesTransLines();
        const { hLines, rLines } = data;

        if (!isMounted()) return;

        let dt = [];
        hLines.map((n) =>
          moment(n.createdDate).isSame(moment(), "day")
            ? dt.push({ ...n, z: false })
            : null
        );

        rLines.map((n) =>
          moment(n.createdDate).isSame(moment(), "day")
            ? dt.push({ ...n, z: true })
            : null
        );

        setRTrans(dt);
        setInitialLoadForm(true);
      } catch (error) {
        enqueueSnackbar("0007: " + error, {
          variant: "error",
        });
        return () => {
          setRHeaders({});
        };
      }
    }

    fetchRByHeader();
    fetchTransHeader();
    fetchRoomLines();
    fetchTrans();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!initialLoadForm) return <SpinLoader />;

  const formatNumber = (num) =>
    Intl.NumberFormat().format(Number(num).toFixed(2));

  const handleComputeTotalEarning = () =>
    formatNumber(tHeaders.reduce((a, b) => a + b.netAmount, 0));

  const handleComputeGuests = () =>
    formatNumber(rRmLines.reduce((a, b) => a + b.seniorPax + b.adultPax, 0));

  return (
    <div className="container__wrapper db">
      <Grid container spacing={2}>
        <Grid item xs={12} md={12} lg={8}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} md={6}>
              <Card className="db-card__wrapper" hoverable>
                <span className="db-title__span">
                  ₱ {handleComputeTotalEarning()}
                </span>
                <span className="db-title__subSpan">Today's Total Earning</span>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={6}>
              <Card className="db-card__wrapper nog" hoverable>
                <span className="db-title__span">{handleComputeGuests()}</span>
                <span className="db-title__subSpan nog">Number of Guests</span>
              </Card>
            </Grid>
            <Grid item xs={12} sm={12}>
              <DbCheckOutTbl headers={tHeaders} />
            </Grid>
            <Grid item xs={12} sm={12}>
              <DbChart rTrans={rTrans} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={12} lg={4}>
          <Grid item xs={12}>
            <DbByGuest rHeaders={rHeaders} />
          </Grid>
          <Grid item xs={12}>
            <DbByRoom rLines={rRmLines} />
          </Grid>
          <Grid item xs={12}>
            <DbByTrans rTrans={rTrans} />
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default Dashboard;
