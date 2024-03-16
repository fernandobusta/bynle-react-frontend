import { useState } from "react";
import { UserCircleIcon, PhotoIcon } from "@heroicons/react/20/solid";

import { useParams } from "react-router-dom";

import useAxios from "../../../hooks/useAxios";
const swal = require("sweetalert2");

function EditMedia() {
  const { clubId } = useParams();
  const api = useAxios();

  const [clubData, setClubData] = useState({
    club_logo: "",
    club_cover: "",
  });

  const handleChange = (e) => {
    setClubData({ ...clubData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .patch(`/update-club/${clubId}/`, clubData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res);
        swal.fire({
          title: "Club updated successfully",
          text: res.data.message,
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
        if (err.response && err.response.data.message) {
          swal.fire({
            title: "Could not update club",
            text: err.response.data.message,
            icon: "error",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
        <div>
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Club media files
          </h2>
          <p className="mt-1 text-sm leading-6 text-gray-600">
            Club information will be displayed publicly. Only the fields you
            fill will be modified.
          </p>
        </div>
        <div className="col-span-2">
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
              onChange={handleChange}
              value={clubData.club_logo}
              className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              accept="image/png, image/jpeg, image/jpg"
            />
          </div>
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
                  onChange={handleChange}
                  value={clubData.club_cover}
                  accept="image/png, image/jpeg, image/jpg"
                />
              </label>
            </div>
            <p className="text-xs leading-5 text-gray-600">
              PNG, JPG, GIF up to 2MB
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="submit"
          className="rounded-md bg-bynlegreen-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-bynlegreen-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bynlegreen-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default EditMedia;
