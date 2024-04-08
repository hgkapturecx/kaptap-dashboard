import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faArrowDown,
  faArrowUp,
  faEdit,
  faEllipsisH,
  faExternalLinkAlt,
  faEye,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Nav,
  Card,
  Image,
  Button,
  Table,
  Dropdown,
  ProgressBar,
  Pagination,
  ButtonGroup,
  Spinner,
  OverlayTrigger,
  Popover,
} from "@themesberg/react-bootstrap";
// import fetchController from "../services/fetchControler";
import CustomTimeline from "./CustomTimeLine";
import fetchController from "../services/fetchControler";

export const UserTable = () => {
  const [clientData, setClientData] = useState([]);
  const [totalClientData, setTotalclientData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchclientData();
  }, []);

  const fetchclientData = async () => {
    setIsLoading(true);
    fetchController("/client-info", {})
      .then((res) => {
        setClientData(res?.data);
        setTotalclientData(res?.data?.users?.length);
      })
      .catch((error) => {
        console.error("Error fetching clientData:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const TableRow = ({ user }) => {
    const { name, createdAt, count } = user;

    const formattedCreatedAt = new Date(createdAt).toLocaleString();

    const renderPopover = () => {
      return (
        // <Popover id={`user-popover-${name}`}>
        //   <Popover.Content>
        <CustomTimeline user={user} />
        //   </Popover.Content>
        // </Popover>
      );
    };

    return (
      <OverlayTrigger
        trigger="click"
        placement="bottom"
        overlay={renderPopover()}
      >
        <tr style={{ cursor: "pointer" }}>
          <td>
            <span className="fw-normal">{name}</span>
          </td>
          <td>
            <span className="fw-normal">{formattedCreatedAt}</span>
          </td>
          <td>
            <span className="fw-normal">{count}</span>
          </td>
        </tr>
      </OverlayTrigger>
    );
  };

  return (
    <Card border="light" className="table-wrapper table-responsive shadow-sm">
      <Card.Body className="pt-0">
        {isLoading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ minHeight: "200px" }}
          >
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          </div>
        ) : (
          <>
            <Table hover className="user-table align-items-center">
              <thead>
                <tr>
                  <th className="border-bottom">User Name</th>
                  <th className="border-bottom">Created At</th>
                  <th className="border-bottom">Total Events</th>
                </tr>
              </thead>
              <tbody>
                {clientData?.users?.map((user) => (
                  <TableRow key={`transaction-${user.id}`} user={user} />
                ))}
              </tbody>
            </Table>
            <Card.Footer className="px-3 border-0 d-lg-flex align-items-center justify-content-between">
              <Nav>
                <Pagination className="mb-2 mb-lg-0">
                  <Pagination.Prev>Previous</Pagination.Prev>
                  <Pagination.Item active>1</Pagination.Item>
                  <Pagination.Item>2</Pagination.Item>
                  <Pagination.Next>Next</Pagination.Next>
                </Pagination>
              </Nav>
              <small className="fw-bold">
                Showing <b>{totalClientData}</b> out of <b>{totalClientData}</b>{" "}
                entries
              </small>
            </Card.Footer>
          </>
        )}
      </Card.Body>
    </Card>
  );
};
