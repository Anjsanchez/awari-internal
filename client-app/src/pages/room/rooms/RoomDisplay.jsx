import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import resort from "../../../assets/room/cluster-full.jpg";
import {
  ButtonGroup,
  CardMedia,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
  Grid,
  Chip,
  Avatar,
} from "@material-ui/core";
import MaterialButton from "../../../common/MaterialButton";

const useStyles = makeStyles({
  root: {},
  half: {
    boxSizing: "border-box",
    display: "inline-block",
    textAlign: "center",
    width: "100%",
  },
  btn: {
    width: "50%",
  },
  displayCard_span_title: {
    margin: "0px",
    fontSize: "1.25rem",
    fontFamily: `"Poppins", sans-serif`,
    color: "rgb(33, 33, 33)",
    fontWeight: 600,
    lineHeight: 1.167,
  },
  displayCard_span_subTitle: {
    margin: "0px",
    fontSize: "0.85rem",
    color: "rgb(158, 158, 158)",
    fontWeight: 400,
    fontFamily: `"Poppins", sans-serif`,
    lineHeight: 1.66,
  },
  display_span_wrapper: {
    padding: "10px",
    display: "flex",
    justifyContent: "space-between",
  },
  display_span_child: {
    display: "block",
    fontFamily: `"Poppins", sans-serif`,

    margin: "0px",
    fontSize: "0.85rem",
    color: "rgb(33,33,33)",
    fontWeight: 500,
    lineHeight: 1.6,
  },
  display_span_description: {
    margin: "0px",
    fontSize: "0.85rem",
    color: "rgb(97,97,97)",
    fontWeight: 400,
    lineHeight: 1.6,
  },
  div_container_header: {
    display: "flex",
    alignItems: "center",
    height: "100%",
  },
  grid_container_header: {
    marginTop: "20px",
  },
});

const RoomDisplay = (props) => {
  const {
    createdDate,
    isAllowExtraPax,
    isPerPaxRoomType,
    numberOfRooms,
    roomLongName,
    roomVariant,
    user,
  } = props.data;

  const classes = useStyles();

  const RenderChips = () => {
    if (!isPerPaxRoomType && !isAllowExtraPax) return null;

    return (
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        {isAllowExtraPax && (
          <Grid item xs={6}>
            <Chip
              avatar={<Avatar>E</Avatar>}
              label="Extra Pax Allowed"
              clickable
              color="primary"
              variant="outlined"
            />
          </Grid>
        )}
        {isPerPaxRoomType && (
          <Grid item xs={6}>
            <Chip
              avatar={<Avatar>P</Avatar>}
              label="Per pax pricing"
              clickable
              variant="outlined"
              color="primary"
            />
          </Grid>
        )}
      </Grid>
    );
  };
  return (
    <Card className={classes.root} elevation={3}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Resort Video"
          height="240"
          image={resort}
          title="Resort Video"
        />
        <CardContent>
          <div>
            <span className={classes.displayCard_span_title}>
              {roomLongName}
            </span>
          </div>
          <div>
            <span className={classes.displayCard_span_subTitle}>
              {roomVariant.name}
            </span>
          </div>

          <Grid container spacing={2} style={{ marginTop: "15px" }}>
            <Grid item xs={12}>
              <span className={classes.display_span_description}>
                This room was created by {user.firstName} {user.lastName} on{" "}
                {moment(createdDate).format("MMMM Do, YYYY")}.
              </span>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginTop: "15px" }}>
            <Grid item xs={6}>
              <div>
                <span className={classes.displayCard_span_subTitle}>
                  Prices Available
                </span>
                <span className={classes.display_span_child}>
                  PHP {Intl.NumberFormat().format(Number(1).toFixed(2))}
                </span>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <span className={classes.displayCard_span_subTitle}>Rooms</span>
                <span className={classes.display_span_child}>
                  {numberOfRooms}
                </span>
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={2} style={{ marginTop: "5px" }}>
            <RenderChips />
          </Grid>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <ButtonGroup
          variant="text"
          color="primary"
          aria-label="text primary button group"
          className={classes.half}
        >
          <MaterialButton
            text="Cancel"
            color="secondary"
            className={classes.btn}
            onClick={props.onCancel}
          />
          <MaterialButton
            text="Edit"
            color="primary"
            className={classes.btn}
            onClick={props.onEdit}
          />
        </ButtonGroup>
      </CardActions>
    </Card>
  );
};

export default RoomDisplay;
