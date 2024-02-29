import React, { useState, useEffect, useContext } from "react";
import { Container } from "../../components/globals/Container";
import FollowTable from "../../components/authUser/FollowTable";
import UserCard from "../../components/authUser/UserCard";
import TicketFeed from "../../components/authUser/TicketFeed";
import Layout from "../../components/Layout";
import useAxios from "../../utils/useAxios";
import AuthContext from "../../context/AuthContext";

function ProfilePage() {
  const activeTab = "";
  const { user } = useContext(AuthContext);
  const [profile, setProfile] = useState({});
  const [clubs, setClubs] = useState([]);
  const [tickets, setTickets] = useState([]);
  const api = useAxios();

  useEffect(() => {
    if (user) {
      api
        .get(`api/profiles/${user.user_id}`)
        .then((res) => {
          setProfile({
            username: user.username,
            email: user.email,
            student_id: user.student_id,
            first_name: user.first_name,
            last_name: user.last_name,
            profile_pic: res.data.profile_picture,
            birthday: res.data.birthday,
            course: res.data.course,
            year: res.data.year,
            bio: res.data.description,
            verified: res.data.verified,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  useEffect(() => {
    if (user.user_id) {
      api
        .get(`/user/${user.user_id}/follows/`)
        .then((res) => {
          setClubs(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user.user_id]);

  useEffect(() => {
    if (user.user_id) {
      api
        .get(`/user/${user.user_id}/tickets/`)
        .then((res) => {
          setTickets(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [user.user_id]);

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
