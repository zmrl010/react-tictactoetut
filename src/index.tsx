import { createRoot } from "react-dom/client";
import Game from "./Game";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(<Game firstMove="X" />);
