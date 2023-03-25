import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import store from "./store";
import App2 from "./App2";
import { ConfigProvider } from "antd";

import { init } from "./lib/extend/js/init.js";
import Play from "./Play";
import "./style.scss";
import "./bootstrap/bootstrap.scss";
import { AuthContextProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider
                direction="rtl"
                theme={{
                    token: {
                        colorPrimary: "#49A3DC",
                        // fontSize: 18,
                    },
                }}
            >
                <AuthContextProvider>
                    <App2 />
                </AuthContextProvider>
                {/* <Play /> */}
                {/* <div dangerouslySetInnerHTML={{__html:editor}}></div> */}
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
);
