import React, { useState, useEffect, useContext } from "react";
import { SITE_URL } from "../components/Constants";
import { Link } from "react-router-dom";
import { Container } from "../components/globals/Container";
import useAxios from "../utils/useAxios";
import Layout from "../components/Layout";
import AuthContext from "../context/AuthContext";

export default function ClubsPage() {
  const activeTab = "Clubs";
  const { user } = useContext(AuthContext);
  const [clubs, setclubs] = useState([]);
  const [clubsFollowed, setClubsFollowed] = useState([]);
  const [changedFollows, setChangedFollows] = useState(false);
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
      .get(`/user/${user.user_id}/follows/`)
      .then((response) => {
        setClubsFollowed(response.data.map((item) => item.id));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [changedFollows]);

  const handleFollow = (clubId) => {
    api
      .post(`/api/follows/`, { user: user.user_id, club: clubId })
      .then((response) => {
        console.log(response);
        setChangedFollows(!changedFollows);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleUnfollow = (clubId) => {
    api
      .delete(`/user/${user.user_id}/follows/${clubId}/`)
      .then((response) => {
        console.log(response);
        setChangedFollows(!changedFollows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Layout activeTab={activeTab}>
      <Container>
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 px-4 sm:px-6 lg:px-8">
          {clubs.map((club) => (
            <li
              key={club.id}
              className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
            >
              <div className="flex flex-1 flex-col p-8">
                <Link to={`${SITE_URL}/club/${club.id}`}>
                  <img
                    className="mx-auto h-32 w-32 flex-shrink-0 rounded-full"
                    //   Replace with club logo
                    src={club.club_logo}
                    alt="Club Logo"
                  />
                  <h3 className="mt-6 text-sm font-medium text-gray-900">
                    {club.name}
                  </h3>
                </Link>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dt className="sr-only">Title</dt>
                  <dd className="text-sm text-gray-500">{club.description}</dd>
                  <dt className="sr-only">Role</dt>
                  <dd className="mt-3">
                    {clubsFollowed.includes(club.id) ? (
                      <button
                        onClick={() => handleUnfollow(club.id)}
                        className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600"
                      >
                        Following
                      </button>
                    ) : (
                      <button
                        onClick={() => handleFollow(club.id)}
                        className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600"
                      >
                        Follow
                      </button>
                    )}
                  </dd>
                </dl>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </Layout>
  );
}
