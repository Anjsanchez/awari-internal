import { toggleLoadingForceStop } from "../pages/globalSettings";

const GlobalSettings = (parm) => (store) => (next) => (action) => {
  const payload = action.payload;

  if (!payload) return next(action);

  // if (
  //   action.type === "globalSettings/toggleLoadingGlobal" ||
  //   action.type === "user/writeToken"
  // )
  //   return next(action);
  if (action.type !== "persist/REHYDRATE") return next(action);

  store.dispatch(toggleLoadingForceStop());

  next(action);
};

export default GlobalSettings;
