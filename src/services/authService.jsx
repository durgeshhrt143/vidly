import http from "./httpService";
import { apiregistration } from "../config.json";
const tokenkey = "token";
export async function login(email, password) {
  const { data: jwt } = await http.post(`${apiregistration}/api/login`, {
    email,
    password
  });
  localStorage.setItem(tokenkey, jwt.token);
}
export function logout() {
  localStorage.removeItem(tokenkey);
}
export function getCurrentUser() {
  try {
    let jwt = localStorage.getItem(tokenkey);
    return jwt;
  } catch (ex) {
    return null;
  }
}
export default {
  logout,
  login,
  getCurrentUser
};
