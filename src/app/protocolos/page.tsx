import { ProtocolosPageView } from "./components/ProtocolosPageView";
import { getProtocols, getProtocolStatusOptions, getProtocolThemeOptions } from "./data";

export default function ProtocolosPage() {
  return (
    <ProtocolosPageView
      protocols={getProtocols()}
      themeOptions={getProtocolThemeOptions()}
      statusOptions={getProtocolStatusOptions()}
    />
  );
}
