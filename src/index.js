import React from "react";
import ReactDOM from "react-dom";
import {   BrowserRouter as Router,} from "react-router-dom";

// core styles
import "./scss/volt.scss";

// vendor styles
import "react-datetime/css/react-datetime.css";

import ScrollToTop from "./components/ScrollToTop";
import HomePage from "./pages/HomePage";

ReactDOM.render(
  <Router>
    <ScrollToTop />
    <HomePage/>
  </Router>,
    document.getElementById("root")
);
