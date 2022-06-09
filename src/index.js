import React from "react";
// import ReactDOM from "react-dom";
import { Provider } from "react-redux";
// import { createRoot } from "react-dom";
import { createRoot } from "react-dom/client";
import { configureStore } from "./store";
import "./index.css";
import App from "./components/App";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const store = configureStore();

root.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>
);

// const container = document.getElementById("app");
// const root = createRoot(container); // createRoot(container!) if you use TypeScript
// root.render(
//   <Provider store={store}>
//     <App />
//   </Provider>
// );
