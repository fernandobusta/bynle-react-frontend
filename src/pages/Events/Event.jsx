import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import useAxios from "../../hooks/useAxios";

import EventOverview from "../../components/EventOverview";
import Container from "../../components/Container";

function Event() {
  const api = useAxios();
  const { eventId } = useParams();

  const [event, setEvent] = useState([]);
  const [free, setFree] = useState(false);

  // If event is free -> no payment, forward to ticket created page

  useEffect(() => {
    api
      .get(`/api/events/${eventId}`)
      .then((response) => {
        setEvent(response.data);
        if (response.data.price === 0) {
          setFree(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [eventId]);
  return (
    <Container ypadding={" "}>
      <EventOverview event={event} eventId={eventId} free={free} />
    </Container>
  );
}

export default Event;
