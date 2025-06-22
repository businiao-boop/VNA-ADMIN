const TOKEN_KEY = "vna-token";
import Cookies from "js-cookie";
export function setToken(token: string) {
  Cookies.set(TOKEN_KEY, token, { expires: 7 });
}

export function getToken() {
  return Cookies.get(TOKEN_KEY);
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY);
}
