import React from "react";
import { Provider } from "react-redux";
import Router from "./Router";
import "./assets/css/tailwind.css";
import store from "./redux/store";
const App: React.FC = () => {
  
  return (
    <Provider store={store}>
      <Router />
    </Provider>
  );
};
export default App;
