import React from "react";
import ReactDOM from "react-dom/client";
import "./style.scss";
import { Provider } from "react-redux";
import store from "./store";
import Play from "./Play";
import App2 from "./App2";
import { ConfigProvider } from "antd";
ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <ConfigProvider
        direction="rtl"
        theme={{
          token: {
            colorPrimary: "#5247c7",
            // fontSize: 18,
          },
        }}
      >
        <App2 />
        {/* <Play
          editable={true}
          index={undefined}
          key1="treble"
          key2="treble"
          voice1="D/4E/4F/4G/4|A/4B/4C'/4D'/4|E'/4D'/4B/4C'/4|_B/4C'/4D'/4E'/4|F'/4F/4A/4_B/4|C'/4A/4_B/4C'/4|_B/4A/4G/4B/4|A/4D/4E/4F/4|G/4A/4B/4^C'/4|D'|]"
          voice2="D|F|E|G|F|A|G|F|E|D|]"
        /> */}
        {/* <App /> */}
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
