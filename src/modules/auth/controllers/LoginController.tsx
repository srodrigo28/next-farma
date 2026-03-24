import { getLoginData } from "../services/authService";
import { LoginView } from "../views/LoginView";

export function LoginController() {
  const { credentials, links } = getLoginData();

  return <LoginView credentials={credentials} links={links} />;
}
