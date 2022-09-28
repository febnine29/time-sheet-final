import React, { Fragment } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, theme } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "./app/store";
import { BrowserRouter } from "react-router-dom";
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Fragment>
        <Provider store={store}>
          <ChakraProvider theme={theme}>
            <App />
          </ChakraProvider>
        </Provider>
      </Fragment>
    </BrowserRouter>
  </React.StrictMode>,

  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
