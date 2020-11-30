import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";
import SuspenseLoading from "./components/SuspenseLoading";

import "./i18next";

ReactDOM.render(
  <Provider store={store}>
    <Suspense fallback={<SuspenseLoading type="index" />}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </Suspense>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
