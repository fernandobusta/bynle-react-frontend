import React, { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import useAxios from "../../../hooks/useAxios";

import FollowYearStats from "../../../components/stats/FollowYearStats";
import FollowCourseStats from "../../../components/stats/FollowCourseStats";

function Stats() {
  const { clubId } = useParams();
  const api = useAxios();
  const [followerStats, setFollowerStats] = useState(null);

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

  return (
    <div>
      <h1 className="text-3xl text-center font-semibold mb-8">Club Stats</h1>
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
    </div>
  );
}

export default Stats;
