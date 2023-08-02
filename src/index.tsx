import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import store from "./redux/store";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <>
    <App />
  </>
);
