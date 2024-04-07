import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Routes as CustomRoute } from "../routes";

// pages
import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";
import ForgotPassword from "./examples/ForgotPassword";
import ResetPassword from "./examples/ResetPassword";
import Lock from "./examples/Lock";
import NotFoundPage from "./examples/NotFound";
import ServerError from "./examples/ServerError";

// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";

const RouteWithLoader = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          {" "}
          <Preloader show={loaded ? false : true} /> <Component {...props} />{" "}
        </>
      )}
    />
  );
};

const RouteWithSidebar = ({ component: Component, ...rest }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const localStorageIsSettingsVisible = () => {
    return localStorage.getItem("settingsVisible") === "false" ? false : true;
  };

  const [showSettings, setShowSettings] = useState(
    localStorageIsSettingsVisible
  );

  const toggleSettings = () => {
    setShowSettings(!showSettings);
    localStorage.setItem("settingsVisible", !showSettings);
  };

  return (
    <Route
      {...rest}
      render={(props) => (
        <>
          <Preloader show={loaded ? false : true} />
          <Sidebar />

          <main className="content">
            <Navbar />
            <Component {...props} />
            <Footer
              toggleSettings={toggleSettings}
              showSettings={showSettings}
            />
          </main>
        </>
      )}
    />
  );
};

export default () => (
  <Switch>
    <RouteWithLoader exact path={CustomRoute.Signin.path} component={Signin} />
    <RouteWithSidebar
      exact
      path={CustomRoute.Presentation.path}
      component={DashboardOverview}
    />

    <RouteWithLoader exact path={CustomRoute.Signup.path} component={Signup} />
    <RouteWithLoader
      exact
      path={CustomRoute.ForgotPassword.path}
      component={ForgotPassword}
    />
    <RouteWithLoader
      exact
      path={CustomRoute.ResetPassword.path}
      component={ResetPassword}
    />
    <RouteWithLoader exact path={CustomRoute.Lock.path} component={Lock} />
    <RouteWithLoader
      exact
      path={CustomRoute.NotFound.path}
      component={NotFoundPage}
    />
    <RouteWithLoader
      exact
      path={CustomRoute.ServerError.path}
      component={ServerError}
    />

    {/* pages */}
    <RouteWithSidebar
      exact
      path={CustomRoute.DashboardOverview.path}
      component={DashboardOverview}
    />
    <RouteWithSidebar
      exact
      path={CustomRoute.Transactions.path}
      component={Transactions}
    />

    <Redirect to={CustomRoute.NotFound.path} />
  </Switch>
);
