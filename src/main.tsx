import React from "react";
import ReactDOM from "react-dom/client";
import "./style.scss";
import { Provider } from "react-redux";
import store from "./store";
import Play from "./Play";
import App2 from "./App2";
import { ConfigProvider } from "antd";
import { Editor } from "./lib/aiharmony/Editor";
// import { Editor } from "./lib/aiharmony/editor";
// import editor from './lib/aiharmony/editor.html?raw'
// import { Editor } from "./lib/abc/abc";
// var perf =require('../public/editor.html');
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
        {/* <App2 /> */}
        <Editor />
        {/* <div dangerouslySetInnerHTML={{__html:editor}}></div> */}
      </ConfigProvider>
    </Provider>
  </React.StrictMode>
);
