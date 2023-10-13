import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import "./style.scss";
import "./bootstrap/bootstrap.scss";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <AuthContextProvider>
                <App />
            </AuthContextProvider>
        </Provider>
    </React.StrictMode>
);
