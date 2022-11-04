import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./App.css";
import { Provider } from 'react-redux'
import store from './store'
import Play from "./Play";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      {/* <Play /> */}
    </Provider>
  </React.StrictMode>
);
