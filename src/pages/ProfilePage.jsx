import React, { useState, useEffect } from "react";
import { Container } from "../components/globals/Container";
import FollowTable from "../components/FollowTable";
import UserCard from "../components/UserCard";
import TicketFeed from "../components/TicketFeed";
import Layout from "../components/Layout";
import useAxios from "../utils/useAxios";
import { jwtDecode } from "jwt-decode";

function ProfilePage() {
  const activeTab = "";
  const [profile, setProfile] = useState({});
  const [user_id, setUserId] = useState("");
  const [clubs, setClubs] = useState([]);
  const [tickets, setTickets] = useState([]);
  const api = useAxios();

  // This is for the test endpoint from the tutorial
  const token = localStorage.getItem("authTokens");

  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.user_id);
      setProfile({
        username: decoded.username,
        email: decoded.email,
        student_id: decoded.student_id,
        first_name: decoded.first_name,
        last_name: decoded.last_name,
        profile_pic: decoded.profile_pic,
        birthday: decoded.birthday,
        course: decoded.course,
        year: decoded.year,
        bio: decoded.description,
        verified: decoded.verified,
      });
    }
  }, [token]);
  useEffect(() => {
    if (user_id) {
      api
        .get(`/user/${user_id}/follows/`)
        .then((res) => {
          setClubs(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user_id]);

  useEffect(() => {
    if (user_id) {
      api
        .get(`/user/${user_id}/tickets/`)
        .then((res) => {
          setTickets(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user_id]);

  return (
    <Layout activeTab={activeTab}>
      <Container>
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl pb-10 pl-2">
          Welcome back, {profile.first_name}!
        </h2>
        <div className="mx-auto grid max-w-2xl grid-cols-1 grid-rows-1 items-start gap-x-8 gap-y-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <UserCard profile={profile} />
          <FollowTable
            className="lg:col-span-2 lg:row-span-2 lg:row-end-2 "
            clubs={clubs}
          />
          <div>
            <h2 className="text-md font-bold tracking-tight text-gray-900 sm:text-md pb-4">
              Your Tickets
            </h2>
            <TicketFeed className="lg:col-start-3" tickets={tickets} />
          </div>
        </div>
      </Container>
    </Layout>
  );
}

export default ProfilePage;
