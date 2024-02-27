import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventOverview from "../components/EventOverview";
import { Container } from "../components/globals/Container";
import Layout from "../components/Layout";
import useAxios from "../utils/useAxios";

export default function EventSinglePage() {
  const activeTab = "";
  const { eventId } = useParams();
  const [event, setEvent] = useState([]);
  const [free, setFree] = useState(false);
  const api = useAxios();

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
    <Layout activeTab={activeTab}>
      <Container ypadding={" "}>
        <EventOverview event={event} eventId={eventId} free={free} />
      </Container>
    </Layout>
  );
}
