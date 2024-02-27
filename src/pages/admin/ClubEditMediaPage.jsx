import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";
import { UserCircleIcon, PhotoIcon } from "@heroicons/react/20/solid";
import { useParams } from "react-router-dom";
import ClubSettingsLayout from "../../components/clubSettings/ClubSettingsLayout";
import NotFound from "../NotFound";
const swal = require("sweetalert2");

function ClubEditMediaPage() {
  const { clubId } = useParams();
  const api = useAxios();
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
  const showOnPermission = () => {
    if (isClubAdmin === null) {
      return null;
    } else if (isClubAdmin === false) {
      return <NotFound />;
    } else {
      return (
        <ClubSettingsLayout clubId={clubId} activeTab="Edit Media">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
              <div>
                <h2 className="text-base font-semibold leading-7 text-gray-900">
                  Club media files
                </h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Club information will be displayed publicly. Only the fields
                  you fill will be modified.
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
                      className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
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
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Save
              </button>
            </div>
          </form>
        </ClubSettingsLayout>
      );
    }
  };
  return showOnPermission();
}

export default ClubEditMediaPage;
