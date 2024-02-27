import { useState, useEffect, useContext } from "react";
import { Container } from "../components/globals/Container";
import Layout from "../components/Layout";
import useAxios from "../utils/useAxios";
import { ChevronRightIcon, CheckBadgeIcon } from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

export default function FriendsPage() {
  const activeTab = "Friends";
  const { user } = useContext(AuthContext);
  const [friends, setFriends] = useState([]);
  const api = useAxios();

  // Get friends
  useEffect(() => {
    if (user.user_id) {
      api
        .get(`user/${user.user_id}/friends/accepted/`)
        .then((res) => {
          setFriends(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user.user_id]);

  const handleDelete = (username) => {
    api.delete(`user/${user.user_id}/friendship/${username}/`).catch((err) => {
      console.log(err);
    });
    window.location.reload(false);
  };
  return (
    <Layout activeTab={activeTab}>
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
                <Link to={`/user/${friend.username}`}>
                  <div className="flex min-w-0 gap-x-4">
                    <img
                      className="h-12 w-12 flex-none rounded-full bg-gray-50"
                      src={friend.profile_picture}
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
                  <Link to={`/user/${friend.username}`}>
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
    </Layout>
  );
}
