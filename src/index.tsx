import { createRoot } from "react-dom/client";
import Game from "./Game";

import "./index.css";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<Game firstMove="X" />);
}
