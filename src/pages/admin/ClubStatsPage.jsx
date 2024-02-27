import React, { useState, useEffect, useContext } from "react";
import useAxios from "../../utils/useAxios";
import AuthContext from "../../context/AuthContext";
import { useParams } from "react-router-dom";
import ClubSettingsLayout from "../../components/clubSettings/ClubSettingsLayout";
import NotFound from "../NotFound";
import FollowYearStats from "../../components/stats/FollowYearStats";
import FollowCourseStats from "../../components/stats/FollowCourseStats";

function ClubStatsPage() {
  const { clubId } = useParams();
  const api = useAxios();
  const [followerStats, setFollowerStats] = useState(null);

  // Club Admin Check ========================================
  const [isClubAdmin, setIsClubAdmin] = useState(null);
  const { user } = useContext(AuthContext);
  useEffect(() => {
    if (user) {
      api
        .get(`user/${user.user_id}/admins/${clubId}`)
        .then((res) => {
          setIsClubAdmin(res.data);
        })
        .catch((error) => {
          setIsClubAdmin(false);
          console.log(error);
        });
    }
  }, [user, clubId]);
  // ==========================================================

  // Get the follower stats
  useEffect(() => {
    api
      .get(`stats/club/${clubId}/followers/`)
      .then((res) => {
        setFollowerStats(res.data);
      })
      .catch((error) => {
        console.error("Error fetching follower stats: ", error);
      });
  }, [clubId]);

  const showOnPermission = () => {
    if (isClubAdmin === true) {
      return (
        <ClubSettingsLayout clubId={clubId} activeTab="Club Stats">
          <h1 className="text-3xl text-center font-semibold mb-8">
            Club Stats
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 place-items-center gap-2 gap-y-10">
            {followerStats && (
              <div className="bg-gray-100 rounded-2xl shadow-lg">
                <h2 className="text-center text-lg p-4">
                  DCU Courses of {followerStats.club_name} followers
                </h2>
                <FollowCourseStats data={followerStats.course_data} />
              </div>
            )}
            {followerStats && (
              <div className="bg-gray-100 rounded-2xl shadow-lg">
                <h2 className="text-center text-lg p-4">
                  Year of study of {followerStats.club_name} followers
                </h2>
                <FollowYearStats data={followerStats.year_data} />
              </div>
            )}
          </div>
        </ClubSettingsLayout>
      );
    } else if (isClubAdmin === false) {
      return <NotFound />;
    }
  };
  return showOnPermission();
}

export default ClubStatsPage;
