import React, { useState, useEffect, useCallback } from "react";

import { Link } from "react-router-dom";

import useAxios from "../../hooks/useAxios";

import EventGallery from "../../components/EventGallery";
import ClubCarousel from "../../components/ClubCarousel";
import Container from "../../components/Container";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const tabs = [
  { name: "Upcoming Events", href: "#", current: true },
  { name: "My Clubs", href: "#", current: false },
  // { name: "My Friends", href: "#", current: false },
];

function Home() {
  const api = useAxios();

  const [clubs, setclubs] = useState([]);
  const [events, setEvents] = useState([]);

  const [followedClubEvents, setFollowedClubEvents] = useState([]);
  const [nextPageUrl, setNextPageUrl] = useState("/api/events/paginated/"); // All events
  const [nextFollowedClubEventsUrl, setNextFollowedClubEventsUrl] = useState(
    "/api/events/followed_clubs/"
  ); // Events from clubs the user follows
  const [loading, setLoading] = useState(false);

  const [currentTab, setCurrentTab] = useState(tabs[0].name);

  const fetchAllEvents = useCallback(async () => {
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

  const fetchFollowedClubEvents = useCallback(async () => {
    if (nextFollowedClubEventsUrl === null || loading) return;

    setLoading(true);
    try {
      const response = await api.get(nextFollowedClubEventsUrl);
      setFollowedClubEvents((prevEvents) => [
        ...prevEvents,
        ...response.data.results,
      ]);
      setNextFollowedClubEventsUrl(response.data.next);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }, [api, nextFollowedClubEventsUrl, loading]);

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
    fetchAllEvents();
    fetchFollowedClubEvents();
  }, []);

  const handleTabChange = (tabName) => {
    setCurrentTab(tabName);
  };

  return (
    <div>
      <Container xpadding={" "}>
        <ClubCarousel clubs={clubs} />
        <div className="m-2 px-8">
          <div className="sm:hidden">
            <label htmlFor="tabs" className="sr-only">
              Select a tab
            </label>
            <select
              id="tabs"
              name="tabs"
              className="block w-full rounded-md border-gray-300 focus:border-bynlegreen-500 focus:ring-bynlegreen-500"
              value={currentTab}
              onChange={(e) => handleTabChange(e.target.value)}
            >
              {tabs.map((tab) => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
          <div className="hidden sm:block">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex" aria-label="Tabs">
                {tabs.map((tab) => (
                  <button
                    key={tab.name}
                    className={classNames(
                      tab.name === currentTab
                        ? "border-bynlegreen-500 text-bynlegreen-600"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                      "w-1/2 border-b-2 py-4 px-1 text-center text-sm font-medium"
                    )}
                    aria-current={tab.name === currentTab ? "page" : undefined}
                    onClick={() => handleTabChange(tab.name)}
                  >
                    {tab.name}
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {(() => {
          switch (currentTab) {
            case "Upcoming Events":
              return (
                <>
                  <EventGallery
                    events={events}
                    title={"Upcoming Events"}
                    className={"px-4 sm:px-6 lg:px-8"}
                  />
                  {nextPageUrl && (
                    <div className="flex justify-center items-center mt-6">
                      <button onClick={fetchAllEvents} disabled={loading}>
                        <div className="my-fancy-title">
                          <span className="fancy-top-key"></span>
                          <span className="fancy-text">Load More</span>
                          <span className="fancy-bottom-key-1"></span>
                          <span className="fancy-bottom-key-2"></span>
                        </div>
                      </button>
                    </div>
                  )}
                </>
              );
            case "My Clubs":
              return (
                <>
                  {followedClubEvents.length === 0 && (
                    <div className="grid grid-rows-2 justify-items-center mt-6">
                      <p>You are not following any clubs yet.</p>
                      <div className="">
                        <Link to="/clubs">
                          <div className="my-fancy-title">
                            <span className="fancy-top-key"></span>
                            <span className="fancy-text">Follow Clubs</span>
                            <span className="fancy-bottom-key-1"></span>
                            <span className="fancy-bottom-key-2"></span>
                          </div>
                        </Link>
                      </div>
                    </div>
                  )}
                  <EventGallery
                    events={followedClubEvents}
                    title={"My Events"}
                    className={"px-4 sm:px-6 lg:px-8"}
                  />
                  {nextFollowedClubEventsUrl && (
                    <div className="flex justify-center items-center mt-6">
                      <button
                        onClick={fetchFollowedClubEvents}
                        disabled={loading}
                      >
                        <div className="my-fancy-title">
                          <span className="fancy-top-key"></span>
                          <span className="fancy-text">Load More</span>
                          <span className="fancy-bottom-key-1"></span>
                          <span className="fancy-bottom-key-2"></span>
                        </div>
                      </button>
                    </div>
                  )}
                </>
              );
            case "My Friends":
              return <div>My Friends content</div>; // Replace with Friends Feed
            default:
              return null;
          }
        })()}
      </Container>
    </div>
  );
}

export default Home;
