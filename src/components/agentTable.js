import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {
  Card,
  Button,
  Table,
  Spinner,
  Modal,
  Form

} from "@themesberg/react-bootstrap";
import fetchController from "../services/fetchControler";

const AgentTable = () => {
  const [agentData, setAgentData] = useState([]);
  const [clientData, setClientData] = useState([]);

  const [isLoading, setIsLoading] = useState(false);
  const [isclientLoading, setIsclientLoading] = useState(false);

  const [agentConfigPop, setAgentConfigPop] = useState(false)

  useEffect(() => {
    fetchagentData();
    fetchclientData()
  }, []);

  const fetchclientData = async () => {
    setIsLoading(true);
    fetchController("/client-info", {})
      .then((res) => {
        setClientData(res?.data);
        setIsclientLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching clientData:", error);
        setIsclientLoading(false)

      })
  };

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
        <td>
          <Button onClick={() => {
            setAgentConfigPop(agent)
          }}>
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </td>
      </tr>
    );
  };

  const handleCloseModal = () => {
    setAgentConfigPop(false);
  };

  const AgentModel = () => {


    return (
      <Modal show={Boolean(agentConfigPop)} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {isclientLoading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ minHeight: "200px" }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Form>
              <Form.Group className="mb-3">
                <Form.Label>Event Filters</Form.Label>

                {clientData?.events?.map(_event => {
                  return (
                    <Form.Check
                      type="checkbox"
                      label={_event?.name}
                      // name="login"
                      checked={true}
                      disabled
                    />
                  )
                })}
                {/* <Form.Check
                type="checkbox"
                label="Login Event"
                name="login"
                checked={eventFilters.login}
                onChange={handleEventFilterChange}
              /> */}

              </Form.Group>
            </Form>
          )}


        </Modal.Body>
        {/* <Modal.Footer>
         <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseModal}>
            Save changes
          </Button> 
        </Modal.Footer> */}
      </Modal>
    )
  }


  return (
    <div>
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
                    <th className="border-bottom">Config</th>
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
        </Card.Body>
      </Card>
      <AgentModel />
    </div>
  );
};

export default AgentTable
