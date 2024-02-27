import { Fragment, useState, useContext, useEffect } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import Sidebar from "./globals/Sidebar";
import DesktopSidebar from "./globals/DesktopSidebar";
import { jwtDecode } from "jwt-decode";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import useAxios from "../utils/useAxios";
import NotificationFlyout from "./globals/NotificationFlyout";
import SearchUser from "./globals/SearchUser";

export default function Layout(props) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");
  const [requests, setRequests] = useState([]);
  const [transferRequests, setTransferRequests] = useState(0);
  const [clubsAdmined, setClubsAdmined] = useState([]);
  const [userId, setUserId] = useState("");
  const api = useAxios();
  const [friendshipChanged, setFriendshipChanged] = useState(false);

  // If there is a token in localStorage
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      var user_id = decoded.user_id;
      setUserId(user_id);
      api
        .get(`/user/${user_id}/admins/`)
        .then((response) => {
          setClubsAdmined(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [token]);

  // Get the pending requests
  useEffect(() => {
    if (token) {
      const decoded = jwtDecode(token);
      var user_id = decoded.user_id;
      api
        .get(`/user/${user_id}/friends/pending`)
        .then((response) => {
          setRequests(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [friendshipChanged]);

  // Get pending transfer requests
  useEffect(() => {
    if (user) {
      api
        .get(`user/${user.user_id}/received-transfer-request/`)
        .then((response) => {
          setTransferRequests(response.data.num_of_transfers);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user]);

  const handleDelete = (username) => {
    setFriendshipChanged(!friendshipChanged);
    api
      .delete(`user/${userId}/friendship/${username}/`)
      .then((response) => {
        // reload the page
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleApprove = (username) => {
    setFriendshipChanged(!friendshipChanged);
    api
      .post(`user/${userId}/friendship/${username}/`)
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as="div"
            className="relative z-50 lg:hidden"
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-900/80" />
            </Transition.Child>

            <div className="fixed inset-0 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="-translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="-translate-x-full"
              >
                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                  >
                    <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                      <button
                        type="button"
                        className="-m-2.5 p-2.5"
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className="sr-only">Close sidebar</span>
                        <XMarkIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  {/* Sidebar component, swap this element with another sidebar if you like */}
                  <Sidebar
                    clubsAdmined={clubsAdmined}
                    activeTab={props.activeTab}
                  />
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          <DesktopSidebar
            clubsAdmined={clubsAdmined}
            activeTab={props.activeTab}
          />
        </div>

        <div className="lg:pl-72">
          <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
            <button
              type="button"
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>

            {/* Separator */}
            <div
              className="h-6 w-px bg-gray-200 lg:hidden"
              aria-hidden="true"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
              <SearchUser />
              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <NotificationFlyout
                  transferRequests={transferRequests}
                  requests={requests}
                  handleApprove={handleApprove}
                  handleDelete={handleDelete}
                />

                {/* Separator */}
                <div
                  className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-200"
                  aria-hidden="true"
                />

                {/* Profile dropdown */}
                {token === null && (
                  <>
                    <Link
                      className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                      aria-hidden="true"
                      to="/login"
                    >
                      Log in
                    </Link>
                    <Link
                      className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                      aria-hidden="true"
                      to="/register"
                    >
                      Sign up
                    </Link>
                  </>
                )}
                {token !== null && (
                  <Menu as="div" className="relative">
                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 rounded-full bg-gray-50"
                        src={user.profile_picture}
                        alt=""
                      />
                      <span className="hidden lg:flex lg:items-center">
                        <span
                          className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                          aria-hidden="true"
                        >
                          {user.username}
                        </span>
                        <ChevronDownIcon
                          className="ml-2 h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Menu.Button>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                        <Menu.Item>
                          <Link
                            to="/profile"
                            className="block px-3 py-1 text-sm leading-6 text-gray-900 hover:bg-gray-100"
                          >
                            Your Profile
                          </Link>
                        </Menu.Item>
                        <Menu.Item>
                          <a
                            onClick={logoutUser}
                            className="block px-3 py-1 text-sm leading-6 text-gray-900 cursor-pointer hover:bg-gray-100"
                          >
                            Log Out
                          </a>
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                )}
              </div>
            </div>
          </div>

          <main>
            <div>{props.children}</div>
          </main>
        </div>
      </div>
    </>
  );
}
