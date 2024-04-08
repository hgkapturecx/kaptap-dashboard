import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import {
  Card,
  Button,
  Table,
  Spinner,
  Modal,
  Form,
} from "@themesberg/react-bootstrap";
import fetchController from "../services/fetchControler";

const AgentTable = () => {
  const [agentData, setAgentData] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [configData, setConfigData] = useState({
    hidejoureny: []
  })

  const [isclientLoading, setIsclientLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [agentConfigPop, setAgentConfigPop] = useState(false);

  useEffect(() => {
    fetchagentData();
  }, []);


  useEffect(() => {
    if (Boolean(agentConfigPop)) {
      fetchclientData()
    }
  }, [agentConfigPop])

  const fetchclientData = async () => {
    setIsclientLoading(true);
    try {
      fetchController("/client-info", {})

        .then((res) => {
          setClientData(res?.data);
          setIsclientLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching clientData:", error);
          setIsclientLoading(false);
        });
    } catch (error) {
      alert(error);
      setIsclientLoading(false);
      console.error("Error fetching agentData:", error);
    }
  }


  const fetchagentData = async () => {
    setIsLoading(true);
    try {
      fetchController("/agent-info")
        .then((res) => {
          console.log("Agent Info Fetch Successfully");
          if (res.success) {
            console.log("/agent-info - fetchController :-", res);
            setAgentData(res?.data);
            setIsLoading(false);
          } else {
            alert("please try after sometime");
            setIsLoading(false);
          }
        })
        .catch((err) => {
          alert(err);
          setIsLoading(false);
          console.log("Agent Info error:", err);
        });
    } catch (error) {
      alert(error);
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
          <Button
            variant="outline-dark"
            size="sm"
            onClick={() => {
              setAgentConfigPop(agent);
            }}
            style={{ borderRadius: "0.25rem" }}
          >
            <FontAwesomeIcon icon={faPlus} />
          </Button>
        </td>
      </tr>
    );
  };

  const handleCloseModal = () => {
    setAgentConfigPop(false);
  };


  const handleAddConfig = (name) => {
    setConfigData(prevState => {
      const updatedHideJourney = [...prevState.hidejoureny];
      if (updatedHideJourney.includes(name)) {
          return {
              ...prevState,
              hidejoureny: updatedHideJourney.filter(item => item !== name)
          };
      } else {
          return {
              ...prevState,
              hidejoureny: [...updatedHideJourney, name]
          };
      }
  });
  };

  const handleSubmitConfig = () => {
    const config = JSON.stringify(configData)
    localStorage.setItem("KT_CONFIG", config)
    setAgentConfigPop(false);
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

      {Boolean(agentConfigPop) && (
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
                  {clientData?.events?.map((_event) => {
                    return (
                      <Form.Check
                        type="checkbox"
                        label={_event?.name}
                        checked={configData.hidejoureny.includes(_event?.name)}
                        onChange={() => handleAddConfig(_event?.name)} // Wrap handleAddConfig inside an arrow function
                      />

                    );
                  })}
                </Form.Group>
              </Form>
            )}
          </Modal.Body>
          <Modal.Footer>

            <Button variant="primary" onClick={handleSubmitConfig}>
              Save changes
            </Button>
          </Modal.Footer>
        </Modal>)}
    </div>
  );
};

export default AgentTable;
