import http from "./httpServices";
import { useSelector } from "react-redux";
import { store } from "../store/configureStore";
import { userRemove } from "../store/pages/users";
import { GetApiUrl } from "../../config/ConfigBuilder";

const apiEndpoint = GetApiUrl + "/users";

export function logout() {
  store.dispatch(userRemove());
}

export function IsLoggedIn() {
  //..
  const userIsLoggedIn = useSelector((state) => state.entities.user.isLoggedIn);
  return userIsLoggedIn ? true : false;
}

export async function login(username, password) {
  console.log(apiEndpoint);
  let endPoint = `${apiEndpoint}/login`;

  const { data } = await http.post(endPoint, {
    username,
    password,
  });

  return data;
}

const auth = {
  login,
  logout,
  IsLoggedIn,
};
export default auth;
