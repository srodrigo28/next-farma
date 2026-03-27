import { LoginPageView } from "./components/LoginPageView";
import { getDefaultCredentials, getLoginLinks } from "./data";

export default function LoginPage() {
  return <LoginPageView credentials={getDefaultCredentials()} links={getLoginLinks()} />;
}
