import React, { useState, useEffect, useContext } from "react";
import useAxios from "../../utils/useAxios";
import AuthContext from "../../context/AuthContext";
import userPicture from "../../images/default/default_profile_picture.jpg";

export default function ClubAdminsTable({ clubId, newAdmins }) {
  const { user } = useContext(AuthContext);
  const [clubAdmins, setClubAdmins] = useState([]);
  const [adminsLength, setAdminsLength] = useState(0);
  const api = useAxios();

  // Get the admins of the club
  useEffect(() => {
    api
      .get(`club/${clubId}/admins/`)
      .then((res) => {
        setClubAdmins(res.data);
        setAdminsLength(res.data.length);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [clubId, adminsLength, newAdmins]);

  // Remove an admin from the club
  const removeAdmin = (username) => {
    api
      .delete(`/club/${clubId}/remove-admin/${username}/`)
      .then((res) => {
        setAdminsLength(adminsLength - 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="px-4 sm:px-0 lg:px-0">
      <div className="mt-8 flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                  >
                    User
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Course
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Verified
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                  >
                    Role
                  </th>
                  <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 bg-white">
                {clubAdmins.map((admin) => (
                  <tr key={admin.username}>
                    <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                      <div className="flex items-center">
                        <div className="h-11 w-11 flex-shrink-0">
                          <img
                            className="h-11 w-11 rounded-full"
                            src={admin.profile_picture || userPicture}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="font-medium text-gray-900">
                            {admin.first_name} {admin.last_name}
                          </div>
                          <div className="mt-1 text-gray-500">
                            {admin.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <div className="text-gray-900">
                        {admin.course}{" "}
                        <span className="mt-1 text-gray-500">{admin.year}</span>
                      </div>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                        {admin.verified ? "Yes" : "No"}
                      </span>
                    </td>
                    <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                      {admin.course}
                    </td>
                    <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                      {admin.username === user.username ? (
                        <span className="text-indigo-600">You</span>
                      ) : (
                        <button
                          onClick={() => removeAdmin(admin.username)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Remove
                          <span className="sr-only">, {admin.username}</span>
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
