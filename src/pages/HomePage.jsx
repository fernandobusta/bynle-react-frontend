import React, { useState, useEffect } from "react";
import ClubCarousel from "../components/ClubCarousel";
import EventGallery from "../components/EventGallery";
import { Container } from "../components/globals/Container";
import Layout from "../components/Layout";
import useAxios from "../utils/useAxios";

function HomePage() {
  const activeTab = "Home";
  const [clubs, setclubs] = useState([]);
  const [events, setEvents] = useState([]);
  const api = useAxios();

  useEffect(() => {
    api
      .get(`/api/clubs/`)
      .then((response) => {
        setclubs(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
      <Container xpadding={" "}>
        <ClubCarousel clubs={clubs} />
        <EventGallery
          events={events}
          title={"Upcoming Events"}
          className={"px-4 sm:px-6 lg:px-8"}
        />
      </Container>
    </Layout>
  );
}

export default HomePage;
