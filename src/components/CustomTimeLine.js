import React, { useState, useEffect, useCallback } from "react";
import { Modal, Spinner } from "@themesberg/react-bootstrap";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";
import fetchController from "../services/fetchControler";
import "./CustomTimeline.css";

const CustomTimeline = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(true);

  const fetchEvents = useCallback(async () => {
    setIsLoading(true);
    fetchController(`/getLogEvents?user=${encodeURIComponent(user?.name)}`, {})
      .then((res) => {
        const sortedEvents = res?.data?.events.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
        setEvents(sortedEvents);
      })
      .catch((error) => {
        console.error("Error fetching events:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [user.name]);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Modal
        as={Modal.Dialog}
        centered
        show={showModal}
        onHide={handleCloseModal}
        size="xl"
        style={{ zIndex: "1000000" }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Timeline for {user?.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ overflowY: "auto" }}>
          {isLoading ? (
            <div className="text-center my-5">
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : (
            <Timeline position="alternate">
              {events?.map((event, index) => (
                <TimelineItem key={index}>
                  <TimelineSeparator>
                    <TimelineDot />
                    {index !== events.length - 1 && <TimelineConnector />}
                  </TimelineSeparator>
                  <TimelineContent className="timelineContent">
                    <div>
                      <h6>
                        {new Date(event?.createdAt).toLocaleString()} -{" "}
                        {event?.name}
                      </h6>
                    </div>
                    <div className="payloadInfo">{event?.payload}</div>
                  </TimelineContent>
                </TimelineItem>
              ))}
            </Timeline>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomTimeline;
