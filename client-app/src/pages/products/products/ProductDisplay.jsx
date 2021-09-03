import React from "react";
import moment from "moment";
import { makeStyles } from "@material-ui/core/styles";
import MaterialButton from "../../../common/MaterialButton";
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

const ProductDisplay = (props) => {
  const {
    longName,
    numberOfServing,
    sellingPrice,
    user,
    createdDate,
    productCategory,
    isActivityType,
    imageSrc,
  } = props.data;

  const classes = useStyles();

  const RenderChips = () => {
    if (!isActivityType) return null;

    return (
      <Grid container spacing={2} style={{ marginTop: "10px" }}>
        {isActivityType && (
          <Grid item xs={6}>
            <Chip
              avatar={<Avatar>A</Avatar>}
              label="Activity"
              clickable
              color="primary"
              variant="outlined"
            />
          </Grid>
        )}
      </Grid>
    );
  };
  return (
    <Card className={`${classes.root} pdf-card__wrapper`}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Product Image"
          height="350"
          image={imageSrc}
          title="Product Image"
        />
        <CardContent>
          <div>
            <span className={classes.displayCard_span_title}>{longName}</span>
          </div>
          <div>
            <span className={classes.displayCard_span_subTitle}>
              {productCategory.name}
            </span>
          </div>

          <Grid container spacing={2} style={{ marginTop: "15px" }}>
            <Grid item xs={12}>
              <span className={classes.display_span_description}>
                This product was created by {user.firstName} {user.lastName} on{" "}
                {moment(createdDate).format("MMMM Do, YYYY")}.
              </span>
            </Grid>
          </Grid>

          <Grid container spacing={2} style={{ marginTop: "15px" }}>
            <Grid item xs={6}>
              <div>
                <span className={classes.displayCard_span_subTitle}>
                  Selling Price
                </span>
                <span className={classes.display_span_child}>
                  PHP{" "}
                  {Intl.NumberFormat().format(Number(sellingPrice).toFixed(2))}
                </span>
              </div>
            </Grid>
            <Grid item xs={6}>
              <div>
                <span className={classes.displayCard_span_subTitle}>
                  Serving
                </span>
                <span className={classes.display_span_child}>
                  {numberOfServing}
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

export default ProductDisplay;
