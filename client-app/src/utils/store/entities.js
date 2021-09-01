import { combineReducers } from "redux";
import userReducer from "./pages/users";
import roomVariantReducer from "./pages/roomVariant";
import createTransactionReducer from "./pages/createTransaction";
import globalSettingsReducer from "./pages/globalSettings";
import RoomReservationReducer from "./pages/createReservation";
import reservationDetailsReducer from "./pages/reservationDetails";

export default combineReducers({
  user: userReducer,
  roomVariant: roomVariantReducer,
  createReservation: RoomReservationReducer,
  reservationDetails: reservationDetailsReducer,
  globalSettings: globalSettingsReducer,
  createTransaction: createTransactionReducer,
});
