import React, { useEffect, useMemo, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCashRegister,
  faChartLine,
  faCheck,
  faCog,
  faHome,
  faSearch,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import {
  Col,
  Row,
  Form,
  Button,
  ButtonGroup,
  Breadcrumb,
  InputGroup,
  Dropdown,
  Card,
  OverlayTrigger,
  Spinner,
  Table,
} from "@themesberg/react-bootstrap";

import { BarChartWidget, CircleChartWidget, CounterWidget, SalesValueWidget, SalesValueWidgetPhone } from "../components/Widgets";
import CustomTimeline from "../components/CustomTimeLine";
import fetchController from "../services/fetchControler";

export default () => {
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
        <CustomTimeline user={user} />
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

  const totalEventTrigger = useMemo(() => {
    return clientData?.users?.reduce((total, user) => {
      return total + (user?.count || 0);
    }, 0);
  }, [clientData]);


  const eventCartData = useMemo(() => {
    const labels = clientData?.events?.map(event => event?.name) || [];
    const series = clientData?.events?.map(event => event?.count) || [];
    return {
      labels,
      series: [series]
    };
  }, [clientData.events]);

  const totalOrders = [
    { id: 1, label: "July", value: [1, 2, 2, 4, 4, 5, 56], color: "primary" },
  ];


  const websiteusagepercentagedata = useMemo(()=>{
    const totalevent = clientData?.users?.reduce((total, user) => {
      return total + (user?.count || 0);
    }, 0)
    const labels = clientData?.events?.map(event => event?.name) || [];
    const series = clientData?.events?.map(event => (event?.count / totalevent) * 100) || [];    
    return {
      labels,
      series: [series]
    };
  },[clientData])

  return (
    <div>

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
          <Row className="justify-content-md-center">
            <Col xs={12} className="mb-4 d-none d-sm-block">
              <SalesValueWidget
                title="Total Events"
                description="total event tiggered by the clients"
                value={totalEventTrigger}
                cartData={eventCartData}
              />
            </Col>
            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="Customers"
                title={totalClientData}
                period="Feb 1 - Apr 1"
                // percentage={18.2}
                icon={faChartLine}
                iconColor="shape-secondary"
              />
            </Col>
            <Col xs={12} sm={6} xl={4} className="mb-4">
              <CounterWidget
                category="Revenue"
                title="$43,594"
                period="Feb 1 - Apr 1"
                percentage={28.4}
                icon={faCashRegister}
                iconColor="shape-tertiary"
              />
            </Col>

            <Col xs={12} sm={6} xl={4} className="mb-4">
              {/* <CircleChartWidget
            title="Traffic Share"
            data={trafficShares} /> */}
            </Col>
          </Row>
          <div className="mb-4">
            <div >
              <div className="d-block mb-4 mb-md-0">
                <h4>All Users</h4>
                <p className="mb-0">Click on user to see it's journey.</p>
              </div>
            </div>
            <Card border="light" className="table-wrapper table-responsive shadow-sm">
              <Card.Body className="pt-0">

                <>
                  <Table hover className="user-table align-items-center">
                    <thead>
                      <tr>
                        <th className="border-bottom">User</th>
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
                    {/* <Nav>
                <Pagination className="mb-2 mb-lg-0">
                  <Pagination.Prev>Previous</Pagination.Prev>
                  <Pagination.Item active>1</Pagination.Item>
                  <Pagination.Item>2</Pagination.Item>
                  <Pagination.Next>Next</Pagination.Next>
                </Pagination>
              </Nav> */}
                    <small className="fw-bold">
                      Showing <b>{totalClientData}</b> out of <b>{totalClientData}</b>{" "}
                      entries
                    </small>
                  </Card.Footer>
                </>
              </Card.Body>
            </Card>
          </div>
          <div className="mb-4 h-25">
            <div>
              <div className="d-block mb-4 mb-md-0">
                <h4>website usage percentage</h4>
                <p className="mb-0">Page wise website usage percentage.</p>
              </div>
            </div>
            <Row className="justify-content-md-center">
              <Col xs={12} className="mb-4 d-none  d-sm-block">
                <BarChartWidget
                  data={websiteusagepercentagedata} />
              </Col>

            </Row>
          </div>
        </>
      )}
    </div>
  );
};
