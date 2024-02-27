import React, { useState, useEffect } from "react";
import EventGallery from "../components/EventGallery";
import { Container } from "../components/globals/Container";
import Layout from "../components/Layout";
import useAxios from "../utils/useAxios";

export default function EventsPage() {
  const activeTab = "Events";
  const [events, setEvents] = useState([]);
  const api = useAxios();

  useEffect(() => {
    api
      .get(`/api/events/`)
      .then((response) => {
        setEvents(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <Layout activeTab={activeTab}>
      <Container>
        <EventGallery events={events} title={"Browse through all the Events"} />
      </Container>
    </Layout>
  );
}
