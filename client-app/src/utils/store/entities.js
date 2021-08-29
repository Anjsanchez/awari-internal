import { combineReducers } from "redux";
import userReducer from "./pages/users";
import roomVariantReducer from "./pages/roomVariant";
import RoomReservationReducer from "./pages/createReservation";
import reservationDetailsReducer from "./pages/reservationDetails";

export default combineReducers({
  user: userReducer,
  roomVariant: roomVariantReducer,
  createReservation: RoomReservationReducer,
  reservationDetails: reservationDetailsReducer,
});
