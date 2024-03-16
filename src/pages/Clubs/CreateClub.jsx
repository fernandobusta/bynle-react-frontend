import React, { useState } from "react";
import { PhotoIcon, UserCircleIcon } from "@heroicons/react/24/solid";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

import Container from "../../components/Container";
const swal = require("sweetalert2");

export default function CreateClub() {
  const api = useAxios();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [clubLogo, SetClubLogo] = useState(null);
  const [clubCover, SetClubCover] = useState(null);

  const [clubData, setClubData] = useState({
    name: "",
    description: "",
    email: "",
    website: "",
    content: "",
    club_logo: "",
    club_cover: "",
    club_admins: user.user_id,
  });

  const handleChange = (e) => {
    setClubData({
      ...clubData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogoChange = (e) => {
    SetClubLogo(e.target.files[0]);
  };
  const handleCoverChange = (e) => {
    SetClubCover(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedClubData = {
      ...clubData,
      club_logo: clubLogo,
      club_cover: clubCover,
    };
    if (clubData.website.trim() !== "") {
      updatedClubData.website = clubData.website.startsWith("http://")
        ? clubData.website
        : `http://${clubData.website}`;
    }
    api
      .post(`/create-club/`, updatedClubData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate("/");
        swal.fire({
          title: "Created Successful",
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
          title: "Could not create club",
          text: err.response.data.detail,
          icon: "error",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="space-y-12">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Club Information
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                Club information will be displayed publicly for contact
                purposes.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-3">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Name
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={clubData.name}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bynlegreen-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="description"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Club's Slogan (Short Description)
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    name="description"
                    id="description"
                    value={clubData.description}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bynlegreen-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Public email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={clubData.email}
                    onChange={handleChange}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bynlegreen-600 sm:text-sm sm:leading-6"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
            <div>
              <h2 className="text-base font-semibold leading-7 text-gray-900">
                Club Profile
              </h2>
              <p className="mt-1 text-sm leading-6 text-gray-600">
                This information will be displayed publicly so be careful what
                you share.
              </p>
            </div>

            <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
              <div className="sm:col-span-4">
                <label
                  htmlFor="website"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Website (Optional)
                </label>
                <div className="mt-2">
                  <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-bynlegreen-600 sm:max-w-md">
                    <span className="flex select-none items-center pl-3 text-gray-500 sm:text-sm">
                      http://
                    </span>
                    <input
                      type="text"
                      name="website"
                      id="website"
                      value={clubData.website}
                      onChange={handleChange}
                      className="block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                      placeholder="www.example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="content"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  About
                </label>
                <div className="mt-2">
                  <textarea
                    id="content"
                    name="content"
                    rows={4}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bynlegreen-600 sm:text-sm sm:leading-6"
                    value={clubData.content}
                    onChange={handleChange}
                    required
                  />
                </div>
                <p className="mt-3 text-sm leading-6 text-gray-600">
                  Write about the Club/Society, what it does and who it's for.
                </p>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="logo-upload"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Club Logo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  <UserCircleIcon
                    className="h-12 w-12 text-gray-300"
                    aria-hidden="true"
                  />
                  <input
                    id="logo-upload"
                    name="logo-upload"
                    type="file"
                    onChange={handleLogoChange}
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    accept="image/png, image/jpeg, image/jpg"
                  />
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="cover-photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Cover photo
                </label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    <PhotoIcon
                      className="mx-auto h-12 w-12 text-gray-300"
                      aria-hidden="true"
                    />
                    <div className="mt-4 flex text-sm leading-6 text-gray-600 ">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-semibold text-bynlegreen-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-bynlegreen-600 focus-within:ring-offset-2 hover:text-bynlegreen-500"
                      >
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="pl-4"
                          onChange={handleCoverChange}
                          accept="image/png, image/jpeg, image/jpg"
                        />
                      </label>
                    </div>
                    <p className="text-xs leading-5 text-gray-600">
                      PNG, JPG, GIF up to 10MB
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <a href="/">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
          </a>
          <button
            type="submit"
            className="rounded-md bg-bynlegreen-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-bynlegreen-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bynlegreen-600"
          >
            Save
          </button>
        </div>
      </form>
    </Container>
  );
}
