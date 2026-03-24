import { getSplashContent } from "../services/splashService";
import { SplashView } from "../views/SplashView";

export function SplashController() {
  const content = getSplashContent();

  return <SplashView content={content} />;
}
