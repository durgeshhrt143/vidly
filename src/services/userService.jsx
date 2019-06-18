import http from "./httpService";
import { apiregistration } from "../config.json";
export function registration(user) {
  return http.post(`${apiregistration}/api/register`, user);
}
