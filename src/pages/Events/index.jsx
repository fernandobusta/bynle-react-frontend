import React, { useState, useEffect, useCallback } from "react";
import EventGallery from "../../components/EventGallery";
import Container from "../../components/Container";
import useAxios from "../../hooks/useAxios";

export default function Events() {
  const api = useAxios();
  const [events, setEvents] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState("/api/events/paginated/");
  const [loading, setLoading] = useState(false);

  const fetchEvents = useCallback(async () => {
    if (nextPageUrl === null || loading) return;

    setLoading(true);
    try {
      const response = await api.get(nextPageUrl);
      setEvents((prevEvents) => [...prevEvents, ...response.data.results]);
      setNextPageUrl(response.data.next);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [api, nextPageUrl, loading]);

  useEffect(() => {
    fetchEvents(); // fetch the first page when the component mounts
  }, []);

  return (
    <Container>
      <EventGallery events={events} title={"Browse through all the Events"} />
      {nextPageUrl && (
        <div className="flex justify-center items-center mt-6">
          <button onClick={fetchEvents} disabled={loading}>
            <div className="my-fancy-title">
              <span className="fancy-top-key"></span>
              <span className="fancy-text">Load More</span>
              <span className="fancy-bottom-key-1"></span>
              <span className="fancy-bottom-key-2"></span>
            </div>
          </button>
        </div>
      )}
    </Container>
  );
}
