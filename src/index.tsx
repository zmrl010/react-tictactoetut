import { createRoot } from "react-dom/client";
import Game from "./Game";

import "./global.scss";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Game firstMove="X" />);
}
