import React, { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";

import { useParams } from "react-router-dom";

import useAxios from "../../../hooks/useAxios";

import ClubAdminsTable from "../../../components/ClubAdminsTable";
const swal = require("sweetalert2");

function ManageAdmins() {
  const { clubId } = useParams();
  const api = useAxios();
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [newAdmins, setNewAdmins] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");

  // Search for users based on username letters
  useEffect(() => {
    if (searchUser !== "") {
      api
        .get(`/usernames?username=${searchUser}`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [searchUser]);

  // When a user is selected, add them to the newAdmins array
  useEffect(() => {
    if (selectedPerson) {
      // Check if the user is already in the newAdmins array
      const found = newAdmins.some(
        (admin) => admin.username === selectedPerson.username
      );
      if (!found) {
        setNewAdmins((prev) => {
          return [...prev, selectedPerson];
        });
      }
    }
  }, [selectedPerson]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (newAdmins.length === 0) {
      swal.fire({
        title: "No admins added",
        text: "Please add at least one admin",
        icon: "error",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else {
      // Only send the username of the new admins
      const newUsernames = {
        usernames: newAdmins.map((admin) => admin.username),
      };
      api
        .post(`/club/${clubId}/add-admin/`, newUsernames)
        .then((res) => {
          setNewAdmins([]);
          swal.fire({
            title: "Admins added successfully",
            text: res.data.detail,
            icon: "success",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        })
        .catch((err) => {
          console.log(err);
          swal.fire({
            title: "Could not add users",
            text: err.response.data.detail,
            icon: "error",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        });
    }
  };

  const handleDelete = (event) => {
    return () => {
      setNewAdmins((prev) => {
        return prev.filter((admin) => admin.username !== event);
      });
    };
  };

  const newAdminsList = () => {
    return (
      <ul role="list" className="divide-y divide-gray-100">
        {newAdmins.map((admin) => (
          <li
            key={admin.username}
            className="flex items-center justify-between gap-x-6 py-5"
          >
            <div className="min-w-0">
              <div className="flex items-start gap-x-3">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {admin.username}
                </p>
              </div>
              <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                <p className="whitespace-nowrap">
                  {admin.first_name} {admin.last_name}
                </p>
              </div>
            </div>
            <div className="flex flex-none items-center gap-x-4">
              <button
                onClick={handleDelete(admin.username)}
                className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <Combobox as="div" className={"px-4 sm:px-0 lg:px-0"}>
        <label htmlFor="club-admins" className="block text-sm font-semibold">
          Add new admins to the club. (Search by username)
        </label>
        <div className="relative flex flex-1 mt-6">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            aria-hidden="true"
          />
          <Combobox.Input
            type="search"
            className="block h-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search friends...."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </div>
        <div className="absolute z-10 bg-white rounded-xl shadow-lg">
          <Combobox.Options className="absolute z-10 mt-1 max-h-60overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {users.map((user) => (
              <Combobox.Option
                key={user.username}
                value={user}
                className={({ active }) =>
                  `${
                    active ? "text-white bg-blue-400" : "text-gray-900 bg-white"
                  }
              cursor-pointer select-none relative py-2 pl-3 pr-9`
                }
                onClick={() => setSelectedPerson(user)}
              >
                {user.username}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
      <div className="px-4 sm:px-0 lg:px-0 mt-2 mb-4">
        <form onSubmit={handleSubmit}>
          {newAdminsList()}
          <button
            type="submit"
            className="mt-4 rounded-md bg-bynlegreen-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-bynlegreen-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bynlegreen-600"
          >
            Save
          </button>{" "}
        </form>
      </div>
      <ClubAdminsTable clubId={clubId} newAdmins={newAdmins} />
    </div>
  );
}

export default ManageAdmins;
