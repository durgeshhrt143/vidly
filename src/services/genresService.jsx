import http from "../services/httpService";
import { apiEndpoint } from "../config.json";
export function getGenres() {
  return http.get(`${apiEndpoint}/genres`);
}
