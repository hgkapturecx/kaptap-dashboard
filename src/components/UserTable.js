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
} from "@themesberg/react-bootstrap";

export const UserTable = () => {
  const [clientData, setClientData] = useState([]);
  const [totalClientData, setTotalclientData] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchclientData();
  }, []);

  const fetchclientData = async () => {
    setIsLoading(true);
    try {
      const url = "https://kaptap-backend.vercel.app/api/v1/client-info";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          cookies:
            "KT_ID=kapTap-66128e9e1043f0e68e43c5e7; KT_TOKEN=NjYxMjhlOWUxMDQzZjBlNjhlNDNjNWU3OnZpdmVrdGl3YXJpOmthcFRhcA==",
        }),
      });

      if (!response) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setClientData(data?.data);
      setTotalclientData(data?.data?.users?.length);

      console.log(data, "data");
    } catch (error) {
      console.error("Error fetching clientData:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const TableRow = ({ name, createdAt, count }) => {
    const formattedCreatedAt = new Date(createdAt).toLocaleString();

    return (
      <tr>
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
                  <TableRow
                    key={`transaction-${user.id}`}
                    name={user.name}
                    createdAt={user.createdAt}
                    count={user.count}
                  />
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
