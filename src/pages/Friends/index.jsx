import { useState, useEffect } from "react";

import { ChevronRightIcon, CheckBadgeIcon } from "@heroicons/react/20/solid";

import { Link } from "react-router-dom";

import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

import Container from "../../components/Container";

import userPicture from "../../images/default/default_profile_picture.jpg";
const swal = require("sweetalert2");

export default function Friends() {
  const api = useAxios();
  const { user } = useAuth();
  const [friends, setFriends] = useState([]);

  // Get friends
  useEffect(() => {
    if (user.user_id) {
      api
        .get(`user/${user.user_id}/friends/accepted/`)
        .then((res) => {
          setFriends(res.data);
        })
        .catch((err) => {
          console.log(err);
          // Show an error message to the user
          swal.fire({
            title: "Error",
            text: "Could not load friends",
            icon: "error",
          });
        });
    }
  }, [user.user_id]);

  const handleDelete = (username) => {
    api
      .delete(`user/${user.user_id}/friendship/${username}/`)
      .then((response) => {
        // Update the state directly instead of reloading the page
        setFriends((prevFriends) =>
          prevFriends.filter((friend) => friend.username !== username)
        );
      })
      .catch((err) => {
        console.log(err);
        // Show an error message to the user
        swal.fire({
          title: "Error",
          text: "Could not delete friend",
          icon: "error",
        });
      });
  };
  return (
    <Container>
      <div className="my-fancy-title">
        <span className="fancy-top-key"></span>
        <span className="fancy-text">Your Friends</span>
        <span className="fancy-bottom-key-1"></span>
        <span className="fancy-bottom-key-2"></span>
      </div>
      <div>
        <ul
          role="list"
          className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl mt-4"
        >
          {friends.map((friend) => (
            <li
              key={friend.username}
              className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
            >
              <Link to={`/users/${friend.username}`}>
                <div className="flex min-w-0 gap-x-4">
                  <img
                    className="h-12 w-12 flex-none rounded-full bg-gray-50 object-cover"
                    src={friend.profile_picture || userPicture}
                    alt=""
                  />
                  <div className="min-w-0 flex-auto">
                    <div className="text-sm font-semibold leading-6 text-gray-900 flex">
                      {friend.first_name} {friend.last_name}
                      {friend.verified && (
                        <CheckBadgeIcon className="h-6 w-6 shrink-0 text-blue-600 justify-center lg:ml-4 ml-4" />
                      )}
                    </div>
                    <p className="mt-1 flex text-xs leading-5 text-gray-500 relative truncate">
                      {friend.username}
                    </p>
                  </div>
                </div>
              </Link>
              <div className="flex shrink-0 items-center gap-x-4">
                <button
                  onClick={() => handleDelete(friend.username)}
                  className="hidden sm:flex sm:flex-col sm:items-end pl-3 items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600 hover:bg-red-400 hover:text-red-900"
                >
                  Remove
                </button>
                <Link to={`/users/${friend.username}`}>
                  <ChevronRightIcon
                    className="h-5 w-5 flex-none text-gray-400"
                    aria-hidden="true"
                  />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Container>
  );
}
