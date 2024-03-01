import { useState, useEffect, useContext } from "react";
import useAxios from "../../utils/useAxios";
import AuthContext from "../../context/AuthContext";
import { Link, useParams } from "react-router-dom";
import ClubSettingsLayout from "../../components/clubSettings/ClubSettingsLayout";
import NotFound from "../NotFound";
const swal = require("sweetalert2");

function ClubEditPage() {
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
    name: "",
    description: "",
    email: "",
    website: "",
    content: "",
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
        <ClubSettingsLayout clubId={clubId} activeTab="Edit Club">
          <form onSubmit={handleSubmit}>
            <div className="space-y-12">
              <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-gray-900">
                    Club Information
                  </h2>
                  <p className="mt-1 text-sm leading-6 text-gray-600">
                    Club information will be displayed publicly for contact
                    purposes. Only the fields you fill will be modified.
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
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
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="sm:col-span-3">
                    <label
                      htmlFor="website"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Website (Optional)
                    </label>
                    <div className="mt-2">
                      <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
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
                      rows={6}
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      value={clubData.content}
                      onChange={handleChange}
                    />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-gray-600">
                    Write about the Club/Society, what it does and who it's for.
                  </p>
                </div>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-end gap-x-6">
              <Link to={`/club/${clubId}`}>
                <button
                  type="button"
                  className="text-sm font-semibold leading-6 text-gray-900"
                >
                  Cancel
                </button>
              </Link>
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

export default ClubEditPage;
