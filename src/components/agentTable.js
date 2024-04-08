import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
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

    Pagination,
    Spinner,
    Form,


} from "@themesberg/react-bootstrap";
import fetchController from "../services/fetchControler";
import { Dropdown, Modal } from "bootstrap";

const AgentTable = () => {
    const [agentData, setAgentData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        fetchagentData();
    }, []);

    const fetchagentData = async () => {
        setIsLoading(true);
        try {
            fetchController('/agent-info').then(res => {
                console.log("Agent Info Fetch Successfully");
                if (res.success) {
                    console.log("/agent-info - fetchController :-", res)
                    setAgentData(res?.data);
                    setIsLoading(false);
                } else {
                    alert("please try after sometime")
                    setIsLoading(false);
                }
            })
                .catch((err) => {
                    alert(err);
                    setIsLoading(false);
                    console.log("Agent Info error:", err);
                });
        } catch (error) {
            alert(error)
            setIsLoading(false);
            console.error("Error fetching agentData:", error);
        }
    };

    const TableRow = ({ agent }) => {
        const { email, createdAt } = agent;

        const formattedCreatedAt = new Date(createdAt).toLocaleString();



        return (

            <tr>
                <td>
                    <span className="fw-normal">{email}</span>
                </td>
                <td>
                    <span className="fw-normal">************</span>
                </td>
                <td>
                    <span className="fw-normal">{formattedCreatedAt}</span>
                </td>
                {/* <td>
                    <Button className="">
                        <FontAwesomeIcon icon={faPlus} />
                    </Button>
                </td> */}
            </tr>

            
        );
    };

    console.log("agentData", agentData)

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
                                    <th className="border-bottom">Email</th>
                                    <th className="border-bottom">Password</th>
                                    <th className="border-bottom">Created At</th>
                                    {/* <th className="border-bottom">Config</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {agentData?.map((_agent) => (
                                    <TableRow key={`transaction-${_agent.id}`} agent={_agent} />
                                ))}
                            </tbody>
                        </Table>
    
                    </>
                )}

    {/* <Modal show={showAddConfig} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Show last</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic">
                  {selectedJourneyCount}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => handleJourneyCountChange(20)}>
                    20
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleJourneyCountChange(40)}>
                    40
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => handleJourneyCountChange(60)}>
                    60
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>{" "}
              user's journey's
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Event Filters</Form.Label>
              <Form.Check
                type="checkbox"
                label="Login Event"
                name="login"
                checked={eventFilters.login}
                onChange={handleEventFilterChange}
              />
              <Form.Check
                type="checkbox"
                label="Add to Cart"
                name="addToCart"
                checked={eventFilters.addToCart}
                onChange={handleEventFilterChange}
              />
              <Form.Check
                type="checkbox"
                label="Product Checked"
                name="productChecked"
                checked={eventFilters.productChecked}
                onChange={handleEventFilterChange}
              />
              <Form.Check
                type="checkbox"
                label="Checkout"
                name="checkout"
                checked={eventFilters.checkout}
                onChange={handleEventFilterChange}
              />
              <Form.Check
                type="checkbox"
                label="Payment Done"
                name="paymentDone"
                checked={eventFilters.paymentDone}
                onChange={handleEventFilterChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal> */}
            </Card.Body>
        </Card>
    );
};

export default AgentTable
