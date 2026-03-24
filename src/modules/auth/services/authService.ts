import { getDefaultCredentials, getLoginLinks } from "../models/authModel";

export function getLoginData() {
  return {
    credentials: getDefaultCredentials(),
    links: getLoginLinks(),
  };
}
