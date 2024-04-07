import React, { useState } from "react";
import { Modal, Spinner } from "@themesberg/react-bootstrap";
import {
  Timeline,
  TimelineItem,
  TimelineSeparator,
  TimelineConnector,
  TimelineContent,
  TimelineDot,
} from "@mui/lab";

const CustomTimeline = ({ user }) => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showTimelineButton, setShowTimelineButton] = useState(true);

  const apiUrl = "https://kaptap-backend.vercel.app/api/v1/getLogEvents";
  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${apiUrl}?user=${encodeURIComponent(user?.name)}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            cookies:
              "KT_ID=kapTap-66128e9e1043f0e68e43c5e7; KT_TOKEN=NjYxMjhlOWUxMDQzZjBlNjhlNDNjNWU3OnZpdmVrdGl3YXJpOmthcFRhcA==",
          }),
        }
      );
      if (!response) {
        throw new Error("Failed to fetch events");
      }
      const data = await response.json();
      console.log("Fetched events data:", data);
      // Sort events by createdAt timestamp
      const sortedEvents = data?.data?.events.sort((a, b) => {
        return new Date(a.createdAt) - new Date(b.createdAt);
      });
      setEvents(sortedEvents);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowModal = () => {
    setShowModal(true);
    setShowTimelineButton(false);
    fetchEvents();
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  return (
    <>
      {showTimelineButton && (
        <div onClick={handleShowModal} style={{ cursor: "pointer" }}>
          Show Timeline
        </div>
      )}
      <Modal
        as={Modal.Dialog}
        centered
        show={showModal}
        onHide={handleCloseModal}
        size="xl"
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
                  <TimelineContent>
                    <h6>
                      {new Date(event?.createdAt).toLocaleString()} -{" "}
                      {event?.name}
                    </h6>
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
