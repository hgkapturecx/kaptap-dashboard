import React, { useState, useEffect } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { Routes } from "../routes";
// pages
// import DashboardOverview from "./dashboard/DashboardOverview";
import Transactions from "./Transactions";
import Signin from "./examples/Signin";
import Signup from "./examples/Signup";


// components
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Preloader from "../components/Preloader";
import NewConfigurationButton from "./dashboard/DashboardOverview";
import UsersInfo from "./UsersInfo";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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

export default () => {
  const history = useHistory();

  useEffect(() => {
    const auth =
      localStorage.getItem("KT_ID") &&
      localStorage.getItem("KT_TOKEN") &&
      localStorage.getItem("KT_UT");
    if (auth) {
      history.push("/");
    } else {
      history.push(Routes.Signup.path);
    }
  }, [history]);

  return (
    <Switch>
      <RouteWithLoader exact path={Routes.Signin.path} component={Signin} />
      <RouteWithLoader exact path={Routes.Signup.path} component={Signup} />

      <RouteWithSidebar exact path={"/"} component={UsersInfo} />
      {/* timeline */}

      <RouteWithSidebar
        exact
        path={Routes.Transactions.path}
        component={Transactions}
      />

      <RouteWithSidebar
        exact
        path={"/Configuration"}
        component={NewConfigurationButton}
      />
      <Redirect to={Routes.NotFound.path} />
    </Switch>
  );
};
