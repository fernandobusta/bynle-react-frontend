import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import {
  PlusIcon,
  CheckCircleIcon,
  PlusCircleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/20/solid";
import EventGallery from "../components/EventGallery";
import Layout from "../components/Layout";
import clubLogo from "../images/default/default_club_logo.jpg";
import clubCover from "../images/default/default_club_cover.jpg";

export default function ClubProfilePage() {
  const { user } = useContext(AuthContext);
  const { clubId } = useParams();
  const navigate = useNavigate();
  const api = useAxios();

  const [activeTab, setActiveTab] = useState("");
  const [isClubAdmin, setIsClubAdmin] = useState(false);
  const [club, setClub] = useState([]);
  const [events, setEvents] = useState([]);
  const [userFollowsClub, setUserFollowsClub] = useState(false);

  useEffect(() => {
    if (user) {
      // Check if user manages this club
      api
        .get(`user/${user.user_id}/admins/${clubId}`)
        .then((res) => setIsClubAdmin(res.data))
        .catch((error) => console.log(error));

      // Get club data
      api
        .get(`/api/clubs/${clubId}/`)
        .then((res) => setClub(res.data))
        .catch((err) => console.log(err));

      // Get events for this club
      api
        .get(`/club/${clubId}/events/`)
        .then((res) => {
          setEvents(res.data);
          setActiveTab(clubId);
        })
        .catch((err) => console.log(err));

      // Check if user follows this club
      api
        .get(`/user/${user.user_id}/follows/${clubId}/`)
        .then((response) => setUserFollowsClub(response.data));
    }
  }, [user, clubId]);

  const handleClickFollow = () => {
    const action = userFollowsClub ? api.delete : api.post;
    const url = userFollowsClub
      ? `/user/${user.user_id}/follows/${clubId}/`
      : `/api/follows/`;
    const data = userFollowsClub
      ? undefined
      : { user: user.user_id, club: clubId };

    action(url, data)
      .then(() => setUserFollowsClub(!userFollowsClub))
      .catch((err) => console.log(err));
  };

  const handleClickCreateEvent = () => {
    navigate(`/club/${clubId}/create-event`);
  };

  return (
    <Layout activeTab={activeTab}>
      <div>
        <div>
          <img
            className="h-32 w-full object-cover lg:h-48"
            src={club.club_cover || clubCover}
            alt=""
          />
        </div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="-mt-12 sm:-mt-16 sm:flex sm:items-end sm:space-x-5">
            <div className="flex">
              <img
                className="h-24 w-24 rounded-full ring-4 ring-white sm:h-32 sm:w-32"
                src={club.club_logo || clubLogo}
                alt=""
              />
            </div>
            <div className="mt-6 sm:flex sm:min-w-0 sm:flex-1 sm:items-center sm:justify-end sm:space-x-6 sm:pb-1">
              <div className="mt-6 min-w-0 flex-1 sm:hidden md:block grid grid-cols-2">
                <h1 className="truncate text-2xl font-bold text-gray-900">
                  {club.name}
                </h1>
              </div>
              <div className="mt-6 flex flex-col justify-stretch space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0">
                {userFollowsClub ? (
                  <button
                    onClick={handleClickFollow}
                    type="button"
                    className="inline-flex justify-center ring-green-600 px-3 py-2 rounded-full ring-1 ring-inset bg-green-50 text-sm font-semibold shadow-sm hover:bg-green-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-700"
                  >
                    <CheckCircleIcon
                      className="-ml-0.5 mr-1.5 h-5 w-5 text-green-600"
                      aria-hidden="true"
                    />
                    <span className="text-green-700">Following</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleClickFollow}
                    className="inline-flex ring-blue-600 justify-center px-3 py-2 rounded-full ring-1 ring-inset bg-blue-50 text-sm font-semibold shadow-sm hover:bg-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
                  >
                    <PlusCircleIcon
                      className="-ml-0.5 mr-1.5 h-5 w-5 text-blue-600"
                      aria-hidden="true"
                    />
                    <span className="text-blue-700">Follow</span>
                  </button>
                )}

                {/* This should only be displayed if the current user is the admin of the page */}
                {isClubAdmin && (
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      onClick={handleClickCreateEvent}
                      type="button"
                      className="inline-flex justify-center px-3 py-2 rounded-full bg-yellow-900 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-700"
                    >
                      <PlusIcon
                        className="-ml-0.5 mr-1.5 h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                      <span>Create Event</span>
                    </button>
                    <Link
                      to={`/club-settings/edit-club/${clubId}`}
                      className=""
                    >
                      <button
                        type="button"
                        className="inline-flex justify-center px-3 py-2 rounded-full bg-yellow-900 text-sm font-semibold text-white shadow-sm hover:bg-yellow-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-700"
                      >
                        <Cog6ToothIcon
                          className="-ml-0.5 mr-1.5 h-5 w-5 shrink-0 text-white"
                          aria-hidden="true"
                        />
                        <span>Admin Panel</span>
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-6 hidden min-w-0 flex-1 sm:block md:hidden">
            <h1 className="truncate text-2xl font-bold text-gray-900">
              {club.name}
            </h1>
          </div>
        </div>
        <div className="mt-6 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="mt-6 prose prose-indigo prose-lg text-gray-500 mx-auto">
            <p>{club.content}</p>
          </div>
        </div>
        <EventGallery
          events={events}
          title={"Upcoming Events"}
          className={"px-4 sm:px-6 lg:px-8"}
        />
      </div>
    </Layout>
  );
}
