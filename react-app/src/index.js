import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ModalProvider, Modal } from './context/Modal';

import "./index.css";
import App from "./App";
import configureStore from "./store";
import { BrowserRouter } from "react-router-dom";

const store = configureStore();

ReactDOM.render(
  <ModalProvider>
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
  </ModalProvider>,
  document.getElementById("root")
);
