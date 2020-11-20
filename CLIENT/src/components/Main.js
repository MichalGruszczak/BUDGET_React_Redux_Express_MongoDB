import React, { Suspense } from "react";
import "./Main.scss";
import Monthly from "./Monthly";
import { Switch, Route } from "react-router-dom";
import SuspenseLoading from "./SuspenseLoading";

const Main = () => {
  const Savings = React.lazy(() => import("./Savings"));
  const Simulator = React.lazy(() => import("./Simulator"));
  const Settings = React.lazy(() => import("./Settings"));
  return (
    <div className="main">
      <Switch>
        <Route path="/" exact component={Monthly} />
        <Suspense fallback={<SuspenseLoading />}>
          <Route path="/savings" component={Savings} />
          <Route path="/simulator" component={Simulator} />
          <Route path="/settings" component={Settings} />
        </Suspense>
      </Switch>
    </div>
  );
};

export default Main;
