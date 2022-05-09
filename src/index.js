import React from "react";
import { createRoot } from "react-dom";
import Game from "./Game";
import "./index.css";

const root = createRoot(document.getElementById("root"));
root.render(<Game firstMove="X" />);
