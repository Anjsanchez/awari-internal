import "./app.css";
import React from "react";
import "antd/dist/antd.css";
import Cart from "./pages/cart/Cart";
import E404 from "./pages/notfound/E404";
import { useSelector } from "react-redux";
import Login from "./components/login/Login";
import Rooms from "./pages/room/rooms/Rooms";
import SOA from "./components/Prints/SOA/SOA";
import Logout from "./components/login/Logout";
import NavBar from "./components/navbar/NavBar";
import NotFound from "./pages/notfound/NotFound";
import Commerce from "./pages/commerce/Commerce";
import Customers from "./pages/customers/Customers";
import Employees from "./pages/employees/Employees";
import Dashboard from "./pages/dashboard/Dashboard";
import ProtectedRoute from "./common/protectedRoute";
import { makeStyles } from "@material-ui/core/styles";
import EmployeeRole from "./pages/employees/EmployeeRole";
import CustomerForm from "./pages/customers/CustomerForm";
import EmployeeForm from "./pages/employees/EmployeeForm";
import Products from "./pages/products/products/Products";
import SpeedDials from "./components/speeddial/SpeedDials";
import RoomPricing from "./pages/room/pricing/RoomPricing";
import RoomVariants from "./pages/room/variants/RoomVariants";
import ApprovalRequest from "./pages/approval/ApprovalRequest";
import Payments from "./pages/functionality/payments/Payments";
import GlobalLoading from "./components/loading/GlobalLoading";
import Discounts from "./pages/functionality/discounts/Discounts";
import ActiveBooking from "./pages/Reservation/active/ActiveBooking";
import ProductCategory from "./pages/products/category/ProductCategory";
import ReservationModal from "./components/reservation/ReservationModal";
import ReservationDetails from "./pages/Reservation/details/ReservationDetails";
import ABookingHistoryByRoom from "./pages/report/bookinghistory/room/ABookingHistoryByRoom";
import BookingHistoryByHeader from "./pages/report/bookinghistory/header/BookingHistoryByHeader";
import ABookingHistoryByTrans from "./pages/report/bookinghistory/transaction/ABookingHistoryByTrans";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: "24px",
    paddingRight: "24px",
    paddingTop: "100px",
    paddingBottom: "25px",
  },
  containerPaddingTop: {
    paddingTop: "160px",
  },
  container_child: {
    [theme.breakpoints.up("lg")]: {
      marginLeft: "280px",
      width: "-webkit-fill-available",
    },
  },
}));

function App() {
  //..
  const classes = useStyles();
  const userIsLoggedIn = useSelector((state) => state.entities.user.isLoggedIn);

  return (
    <>
      <Router>
        <div className={classes.container}>
          <div className={userIsLoggedIn ? classes.container_child : ""}>
            <GlobalLoading />
            <NavBar />
            <SpeedDials />
            <ReservationModal />
            <Switch>
              <Route path="/a/login" component={Login} />
              <Route path="/a/logout" component={Logout} />
              <ProtectedRoute
                path="/a/dashboard"
                component={Dashboard}
                keyId="1"
              />
              <ProtectedRoute
                path="/a/user-management/employees/roles/:id"
                component={EmployeeRole}
                keyId="5"
              />
              <ProtectedRoute
                path="/a/user-management/employees/:id"
                component={EmployeeForm}
                keyId="5"
              />
              <ProtectedRoute
                path="/a/user-management/employees"
                component={Employees}
                keyId="5"
              />
              <ProtectedRoute
                path="/a/user-management/customers/:id"
                component={CustomerForm}
                keyId="6"
              />

              <ProtectedRoute
                path="/a/user-management/customers"
                component={Customers}
                keyId="6"
              />
              <ProtectedRoute
                path="/a/room-management/rooms"
                component={Rooms}
                keyId="8"
              />
              <ProtectedRoute
                path="/a/room-management/room-variants"
                component={RoomVariants}
                keyId="7"
              />
              <ProtectedRoute
                path="/a/room-management/room-pricings"
                component={RoomPricing}
                keyId="9"
              />
              <ProtectedRoute
                path="/a/product-management/category"
                component={ProductCategory}
                keyId="10"
              />
              <ProtectedRoute
                path="/a/product-management/products"
                component={Products}
                keyId="11"
              />
              <ProtectedRoute
                path="/a/reservation-management/reservations/:id&isTrans=:isTrans"
                component={ReservationDetails}
                keyId="2"
              />
              <ProtectedRoute
                path="/a/reservation-management/reservations/:id"
                component={ReservationDetails}
                keyId="2"
              />

              <ProtectedRoute
                path="/a/reservation-management/reservations"
                component={ActiveBooking}
                keyId="2"
              />
              <ProtectedRoute
                path="/a/commerce-management/shop/:id"
                component={Commerce}
                keyId="3"
              />
              <ProtectedRoute
                path="/a/commerce-management/shop"
                component={Commerce}
                keyId="3"
              />
              <ProtectedRoute
                path="/a/general/approval-request"
                component={ApprovalRequest}
                keyId="17"
              />
              <ProtectedRoute
                path="/a/commerce-management/cart/:id"
                component={Cart}
                keyId="4"
              />
              <ProtectedRoute
                path="/a/commerce-management/cart"
                component={Cart}
                keyId="4"
              />
              <ProtectedRoute
                path="/a/system-functionality/payments"
                component={Payments}
                keyId="12"
              />
              <ProtectedRoute
                path="/a/system-functionality/discounts"
                component={Discounts}
                keyId="13"
              />
              <ProtectedRoute
                path="/a/reservation-management/report/booking-history/transaction"
                component={ABookingHistoryByTrans}
                keyId="15"
              />
              <ProtectedRoute
                path="/a/reservation-management/report/booking-history/header"
                component={BookingHistoryByHeader}
                keyId="14"
              />
              <ProtectedRoute
                path="/a/reservation-management/report/booking-history/room"
                component={ABookingHistoryByRoom}
                keyId="16"
              />
              <ProtectedRoute
                path="/a/reports/SOA/:id&isTrans=:isTrans"
                component={SOA}
                keyId="2"
              />
              <ProtectedRoute
                path="/a/reports/SOA/:id"
                component={SOA}
                keyId="2"
              />
              <Route path="/no-access" component={E404} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="/a/dashboard" />
              <Redirect to="/not-found" />
              <ProtectedRoute path="/" component={Dashboard} keyId="1" />
            </Switch>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
