import React, { useState, useEffect, useContext } from "react";
import { Container } from "../components/globals/Container";
import Layout from "../components/Layout";
import useAxios from "../utils/useAxios";
import { useParams, Link } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";
import EventsList from "../components/profileComponents/EventsList";
import AuthContext from "../context/AuthContext";

function PublicUserProfilePage() {
  const activeTab = "Friends";

  const { user } = useContext(AuthContext);
  const { username } = useParams();
  const [publicProfile, setPublicProfile] = useState({}); // This is for the public profile
  const api = useAxios();

  const [friendship, setFriendship] = useState(null);
  const [friendshipSender, setFriendshipSender] = useState("");
  const [friendshipChanged, setFriendshipChanged] = useState(false);

  const [friendsInCommon, setFriendsInCommon] = useState([]); // This is for the friends in common
  const [eventsActive, setEventsActive] = useState([]); // This is for the events the user is attending
  const [eventsUsed, setEventsUsed] = useState([]); // This is for the events the user is attending
  const [clubsInCommon, setClubsInCommon] = useState([]); // This is for the clubs in common

  // Get public profile
  useEffect(() => {
    api
      .get(`/user/${username}/public-profile/`)
      .then((res) => {
        setPublicProfile(res.data);
      })
      .catch((err) => console.log(err));
  }, [username]);

  // Check if the user is friends with the public profile
  useEffect(() => {
    if (username !== user.username) {
      api
        .get(`user/${user.user_id}/friendship/${username}/`)
        .then((res) => {
          if (res.data.status === "True") {
            setFriendship(true);
          } else if (res.data.status === "False") {
            setFriendship(false);
            if (res.data.sender === "current") {
              // The current user sent a request
              setFriendshipSender("current");
            } else if (res.data.sender === "other") {
              // The other user sent a request
              setFriendshipSender("other");
            }
          } else if (res.data.status === "None") {
            setFriendship(false);
          }
        })
        .catch((err) => console.log(err));
      // Refresh the button to show the correct status
      showOnFriendship();
    } else {
      // The user's profile
      setFriendship(null);
    }
  }, [friendshipChanged, user.user_id, username]);

  // Get the events the user is attending
  useEffect(() => {
    api
      .get(`user/${username}/events/`)
      .then((res) => {
        setEventsActive(res.data.active);
        setEventsUsed(res.data.used);
      })
      .catch((err) => console.log(err));
  }, [username]);

  // Get the friends in common
  useEffect(() => {
    if (user.user_id) {
      api
        .get(`common-friends/${user.user_id}/${username}/`)
        .then((res) => {
          setFriendsInCommon(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user.user_id, username]);

  // Get the common clubs followed
  useEffect(() => {
    if (user.user_id) {
      api
        .get(`common-followed-clubs/${user.user_id}/${username}/`)
        .then((res) => {
          setClubsInCommon(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user.user_id, username]);

  const handleDelete = (e) => {
    e.preventDefault();
    setFriendshipChanged(!friendshipChanged);
    api.delete(`user/${user.user_id}/friendship/${username}/`).catch((err) => {
      console.log(err);
    });
    window.location.reload(false);
  };
  const handleApprove = (e) => {
    e.preventDefault();
    setFriendshipChanged(!friendshipChanged);
    api.post(`user/${user.user_id}/friendship/${username}/`).catch((err) => {
      console.log(err);
    });
    window.location.reload(false);
  };
  const handleAdd = (e) => {
    e.preventDefault();
    setFriendshipChanged(!friendshipChanged);
    api
      .post("create-friend-request/", {
        sender: user.user_id,
        receiver: username,
      })
      .catch((err) => {
        console.log(err);
      });
    window.location.reload(false);
  };

  const showOnFriendship = () => {
    if (friendship === null) {
      return <div></div>;
    } else if (friendship === true) {
      return (
        <button
          onClick={handleDelete}
          className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-md font-medium text-green-700 ring-1 ring-inset ring-green-600 hover:bg-green-400 hover:text-green-900"
        >
          Friends
        </button>
      );
    } else if (friendship === false) {
      if (friendshipSender === "current") {
        return (
          <button
            onClick={handleDelete}
            className="inline-flex items-center rounded-full bg-gray-50 px-2 py-1 text-md font-medium text-gray-700 ring-1 ring-inset ring-gray-600 hover:bg-gray-400 hover:text-gray-900"
          >
            Pending
          </button>
        );
      } else if (friendshipSender === "other") {
        return (
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleDelete}
              className="pl-3 inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-md font-medium text-red-700 ring-1 ring-inset ring-red-600 hover:bg-red-400 hover:text-red-900"
            >
              Decline
            </button>
            <button
              onClick={handleApprove}
              className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-md font-medium text-blue-700 ring-1 ring-inset ring-blue-600 hover:bg-blue-400 hover:text-blue-900"
            >
              Approve
            </button>
          </div>
        );
      } else {
        return (
          <button
            onClick={handleAdd}
            className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-md font-medium text-blue-700 ring-1 ring-inset ring-blue-600"
          >
            Request
          </button>
        );
      }
    }
  };

  return (
    <Layout activeTab={activeTab}>
      <Container>
        <div className="overflow-hidden rounded-2xl bg-white shadow mb-8">
          <h2 className="sr-only" id="profile-overview-title">
            Profile Overview
          </h2>
          <div className="bg-white p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div className="sm:flex sm:space-x-5">
                <div className="flex-shrink-0">
                  <img
                    className="mx-auto h-20 w-20 rounded-full"
                    src={publicProfile.profile_picture}
                    alt=""
                  />
                </div>
                <div className="mt-4 text-center sm:mt-0 sm:pt-1 sm:text-left">
                  <div className="lg:grid lg:grid-cols-2 lg:gap-4 flex justify-center">
                    <p className="text-xl font-bold text-gray-900 sm:text-2xl">
                      {publicProfile.first_name} {publicProfile.last_name}
                    </p>
                    {publicProfile.verified && (
                      <CheckBadgeIcon className="h-6 w-6 shrink-0 text-blue-600 mt-1 justify-center lg:ml-0 ml-4" />
                    )}
                  </div>
                  <p className="text-sm font-medium text-gray-600">
                    {publicProfile.course} {publicProfile.year}
                  </p>
                </div>
              </div>
              <div className="mt-5 flex justify-center sm:mt-0">
                {showOnFriendship()}
              </div>
            </div>
            <div className="mt-4 ml-2 justify-center sm:justify-normal flex">
              {publicProfile.description}
            </div>
          </div>
          <div className="grid grid-cols-1 divide-y divide-gray-200 border-t border-gray-200 bg-gray-50 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            <div className="flex -space-x-4 rtl:space-x-reverse justify-self-center px-6 py-3 ">
              {friendsInCommon.slice(0, 4).map((friend, friendIdx) => (
                <img
                  key={friendIdx}
                  className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                  src={friend.profile_picture}
                  alt=""
                />
              ))}

              {friendsInCommon.length > 4 && (
                <Link
                  className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                  to={""}
                >
                  +{friendsInCommon.length - 4}
                </Link>
              )}
              {friendsInCommon.length === 0 && (
                <p className="text-center text-sm font-medium pt-2">
                  No friends in common
                </p>
              )}
            </div>
            <div className="px-6 text-center text-sm font-medium">
              <div className="flex -space-x-4 rtl:space-x-reverse justify-self-center px-6 py-3 ">
                {clubsInCommon.slice(0, 4).map((club) => (
                  <img
                    key={club.id}
                    className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800"
                    src={club.club_logo}
                    alt=""
                  />
                ))}
                {clubsInCommon.length > 4 && (
                  <Link
                    className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800"
                    to={""}
                  >
                    +{clubsInCommon.length - 4}
                  </Link>
                )}
                {clubsInCommon.length === 0 && (
                  <p className="text-center text-sm font-medium pt-2 pl-6">
                    No Clubs in common
                  </p>
                )}
              </div>
            </div>
            <div className="px-6 py-5 text-center text-sm font-medium">
              <span className="text-gray-900">Events attented</span>{" "}
              <span className="text-gray-600">{eventsUsed.length}</span>
            </div>
          </div>
        </div>
        <EventsList events={eventsActive} />
      </Container>
    </Layout>
  );
}

export default PublicUserProfilePage;
