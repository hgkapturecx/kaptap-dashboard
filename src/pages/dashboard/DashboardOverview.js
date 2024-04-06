import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  Card,
  Modal,
  Button,
  Form,
  Dropdown,
} from "@themesberg/react-bootstrap";

const NewConfigurationButton = () => {
  const [showAddConfig, setShowAddConfig] = useState(false);
  const [showDefaultConfig, setShowDefaultConfig] = useState(false);
  const [selectedJourneyCount, setSelectedJourneyCount] = useState(20);
  const [eventFilters, setEventFilters] = useState({
    login: true,
    addToCart: true,
    productChecked: true,
    checkout: true,
    paymentDone: true,
  });

  const handleAddConfig = () => {
    setShowAddConfig(true);
  };

  const handleDefaultConfig = () => {
    setShowDefaultConfig(true);
  };
  const handleCloseModal = () => {
    setShowAddConfig(false);
    setShowDefaultConfig(false);
  };

  const handleJourneyCountChange = (count) => {
    setSelectedJourneyCount(count);
  };

  const handleEventFilterChange = (event) => {
    const { name, checked } = event.target;
    setEventFilters({
      ...eventFilters,
      [name]: checked,
    });
  };

  return (
    <>
      <div className="d-flex justify-content-left flex-wrap flex-md-nowrap align-items-center py-4">
        <Card
          onClick={handleDefaultConfig}
          className="config-card"
          style={{
            width: "200px",
            height: "150px",
            margin: "10px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            backgroundColor: showAddConfig ? "inherit" : "#007bff",
            color: showDefaultConfig ? "#fff" : "inherit",
          }}
        >
          <Card.Body>
            <Card.Title>Default Configuration</Card.Title>
          </Card.Body>
        </Card>

        <Card
          onClick={handleAddConfig}
          className="config-card"
          style={{
            width: "200px",
            height: "150px",
            margin: "10px",
            cursor: "pointer",
            transition: "background-color 0.3s",
            backgroundColor: showAddConfig ? "#007bff" : "inherit",
            color: showAddConfig ? "#fff" : "inherit",
          }}
        >
          <Card.Body>
            <Card.Title>
              <FontAwesomeIcon icon={faPlus} className="me-2" />
              New Configuration
            </Card.Title>
          </Card.Body>
        </Card>
      </div>

      <Modal show={showDefaultConfig} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Default Configuration</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Show last</Form.Label>
              <Dropdown>
                <Dropdown.Toggle variant="primary" id="dropdown-basic" disabled>
                  {selectedJourneyCount}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => handleJourneyCountChange(20)}
                    disabled
                  >
                    20
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleJourneyCountChange(40)}
                    disabled
                  >
                    40
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={() => handleJourneyCountChange(60)}
                    disabled
                  >
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
                disabled
              />
              <Form.Check
                type="checkbox"
                label="Add to Cart"
                name="addToCart"
                checked={eventFilters.addToCart}
                onChange={handleEventFilterChange}
                disabled
              />
              <Form.Check
                type="checkbox"
                label="Product Checked"
                name="productChecked"
                checked={eventFilters.productChecked}
                onChange={handleEventFilterChange}
                disabled
              />
              <Form.Check
                type="checkbox"
                label="Checkout"
                name="checkout"
                checked={eventFilters.checkout}
                onChange={handleEventFilterChange}
                disabled
              />
              <Form.Check
                type="checkbox"
                label="Payment Done"
                name="paymentDone"
                checked={eventFilters.paymentDone}
                onChange={handleEventFilterChange}
                disabled
              />
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={showAddConfig} onHide={handleCloseModal}>
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
      </Modal>
    </>
  );
};

export default NewConfigurationButton;
