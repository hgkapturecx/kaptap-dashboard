import React from "react";
import moment from "moment-timezone";
import {
  Row,
  Col,
  Card,
  OverlayTrigger,
  Tooltip,
  Image,
  Button,
} from "@themesberg/react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from "@fortawesome/free-solid-svg-icons";
import BS5Logo from "../assets/img/technologies/bootstrap-5-logo.svg";
import ReactLogo from "../assets/img/technologies/react-logo.svg";
import LaravelLogo from "../assets/img/technologies/laravel-logo.svg";

export default (props) => {
  const currentYear = moment().get("year");
  const showSettings = props.showSettings;

  const toggleSettings = (toggle) => {
    props.toggleSettings(toggle);
  };

  return (
    <div>
      {showSettings ? (
        <Card className="theme-settings">
          <Card.Body className="pt-4">
            <Button
              className="theme-settings-close"
              variant="close"
              size="sm"
              aria-label="Close"
              onClick={() => {
                toggleSettings(false);
              }}
            />
            <Button
              href="https://themesberg.com/product/dashboard/volt-react"
              target="_blank"
              variant="primary"
              className="mb-3 w-100"
            >
              <FontAwesomeIcon icon={faDownload} className="me-1" /> Download
            </Button>
            <p className="fs-7 text-gray-700 text-center">
              Available in the following technologies:
            </p>
            <div className="d-flex justify-content-center">
              <Card.Link
                href="https://themesberg.com/product/admin-dashboard/volt-bootstrap-5-dashboard"
                target="_blank"
              >
                <OverlayTrigger
                  placement="top"
                  trigger={["hover", "focus"]}
                  overlay={
                    <Tooltip>
                      Bootstrap 5 · The most popular HTML, CSS, and JS library
                      in the world.
                    </Tooltip>
                  }
                >
                  <Image src={BS5Logo} className="image image-xs" />
                </OverlayTrigger>
              </Card.Link>

              <Card.Link
                href="https://themesberg.com/product/dashboard/volt-react"
                target="_blank"
              >
                <OverlayTrigger
                  placement="top"
                  trigger={["hover", "focus"]}
                  overlay={
                    <Tooltip>
                      React · A JavaScript library for building user interfaces.
                    </Tooltip>
                  }
                >
                  <Image src={ReactLogo} className="image image-xs" />
                </OverlayTrigger>
              </Card.Link>

              <Card.Link
                href="https://themesberg.com/product/laravel/volt-admin-dashboard-template"
                target="_blank"
              >
                <OverlayTrigger
                  placement="top"
                  trigger={["hover", "focus"]}
                  overlay={
                    <Tooltip>
                      Laravel · Most popular PHP framework in the world.
                    </Tooltip>
                  }
                >
                  <Image src={LaravelLogo} className="image image-xs" />
                </OverlayTrigger>
              </Card.Link>
            </div>
          </Card.Body>
        </Card>
      ) : (
        ""
      )}
      <footer
        className="footer section py-2"
        style={{
          position: "fixed", // Change to fixed position'
          bottom: "0", // Set to bottom of viewport
          left: "59%", // Center horizontally
          transform: "translateX(-50%)", // Adjust horizontally to center
          width: "76%", // Set the width as required
          zIndex: "1000", // Set a higher z-index to ensure it's on top
        }}
      >
        <Row>
          <Col xs={12} lg={6} className="mb-4 mb-lg-0">
            <p className="mb-0 text-center text-xl-left">
              Copyright © 2019-{`${currentYear} `}
              <Card.Link
                href="https://www.kapture.cx/"
                target="_blank"
                className="text-blue text-decoration-none fw-normal"
              >
                kaptap
              </Card.Link>
            </p>
          </Col>
          <Col xs={12} lg={6}>
            <ul className="list-inline list-group-flush list-group-borderless text-center text-xl-right mb-0">
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link
                  href="https://www.kapture.cx/about-us/"
                  target="_blank"
                >
                  About
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link
                  href="https://www.kapture.cx/support/"
                  target="_blank"
                >
                  Support
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link href="https://www.kapture.cx/blog/" target="_blank">
                  Blog
                </Card.Link>
              </li>
              <li className="list-inline-item px-0 px-sm-2">
                <Card.Link
                  href="https://www.kapture.cx/contact/"
                  target="_blank"
                >
                  Contact
                </Card.Link>
              </li>
            </ul>
          </Col>
        </Row>
      </footer>
    </div>
  );
};
