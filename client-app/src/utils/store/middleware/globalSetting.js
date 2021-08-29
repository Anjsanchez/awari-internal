import { toggleLoadingGlobal } from "../pages/globalSettings";

const GlobalSettings = (parm) => (store) => (next) => (action) => {
  const payload = action.payload;

  if (!payload) return next(action);

  store.dispatch(toggleLoadingGlobal(false));

  next(action);
};

export default GlobalSettings;
