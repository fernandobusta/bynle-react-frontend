import { useState, useEffect, Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import {
  ChevronDownIcon,
  UserGroupIcon,
  PlusIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { BellIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";
import userPicture from "../images/default/default_profile_picture.jpg";

export default function Notifications() {
  const api = useAxios();
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [transferRequests, setTransferRequests] = useState(0);
  const [friendshipChanged, setFriendshipChanged] = useState(false);

  useEffect(() => {
    // Get the pending requests
    api
      .get(`/user/${user.user_id}/friends/pending`)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // Get pending transfer requests
    api
      .get(`user/${user.user_id}/received-transfer-request/`)
      .then((response) => {
        setTransferRequests(response.data.num_of_transfers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [transferRequests]);

  const handleDelete = (username) => {
    api
      .delete(`user/${user.user_id}/friendship/${username}/`)
      .then((response) => {
        // Update the state directly instead of reloading the page
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.username !== username)
        );
        setFriendshipChanged(!friendshipChanged);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleApprove = (username) => {
    api
      .post(`user/${user.user_id}/friendship/${username}/`)
      .then((response) => {
        // Update the state directly instead of reloading the page
        setRequests((prevRequests) =>
          prevRequests.filter((request) => request.username !== username)
        );
        setFriendshipChanged(!friendshipChanged);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const popupNumber = () => {
    const requestLength = requests.length + transferRequests;
    if (requestLength !== 0) {
      return (
        <span className="inline-flex items-center justify-center px-2 py-1 text-xs font-semibold text-white bg-red-600 rounded-full">
          {requestLength}
        </span>
      );
    } else {
      return null;
    }
  };

  return (
    <Popover className="relative">
      <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
        <BellIcon className="h-6 w-6" aria-hidden="true" />
        {popupNumber()}
        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
      </Popover.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <Popover.Panel className="absolute mt-5 flex w-screen max-w-md translate-x-16 right-0 px-4">
          <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="p-4">
              {requests.length === 0 && transferRequests === 0 && (
                <h2>No new notifications</h2>
              )}
              {requests.length > 0 && (
                <h2 className="text-lg font-semibold text-gray-900">
                  Friend Requests:
                </h2>
              )}
              <ul>
                {requests.map((item, itemIdx) => (
                  <li
                    key={itemIdx}
                    className="group relative gap-x-2 rounded-lg py-4 grid-cols-[50%_50%] grid"
                  >
                    <Link to={`users/${item.username}`} key={item.username}>
                      {/* <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white"> */}
                      {/* </div> */}
                      <div className="grid grid-cols-3 gap-2">
                        <img
                          src={item.profile_picture || userPicture}
                          alt={item.username}
                          className="h-10 w-10 rounded-full flex items-center justify-center"
                          aria-hidden="true"
                        />
                        <div className="col-span-2">
                          <div className="font-semibold text-gray-900">
                            {item.username}
                          </div>
                          <p className="mt-1 text-gray-600 text-xs">
                            {item.first_name} {item.last_name}
                          </p>
                        </div>
                      </div>
                    </Link>
                    <div className="grid grid-cols-2 gap-2 max-h-4 flex-1">
                      <button
                        onClick={() => handleDelete(item.username)}
                        className="inline-flex items-center rounded-full bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600 hover:bg-red-400 hover:text-red-900"
                      >
                        <XMarkIcon
                          className="h-5 w-5 flex-1"
                          aria-hidden="true"
                        />
                      </button>
                      <button
                        className="inline-flex items-center rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 ring-1 ring-inset ring-blue-600 hover:bg-blue-400 hover:text-blue-900"
                        onClick={() => handleApprove(item.username)}
                      >
                        <PlusIcon
                          className="h-5 w-5 flex-1"
                          aria-hidden="true"
                        />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {/* {transferRequests > 0 && (
                
              )} */}

              {transferRequests > 0 && (
                <div className="">
                  <h2 className="text-lg font-semibold text-gray-900 pb-2">
                    Transfer Requests:
                  </h2>
                  <Link
                    className="text-gray-900 hover:text-white hover:bg-gray-900 group relative flex gap-x-6 rounded-lg p-4 border border-gray-900"
                    to="/transfer/received"
                  >
                    Pending Transfers: {transferRequests}
                  </Link>
                </div>
              )}
            </div>
            <div className="divide-x divide-gray-900/5 bg-gray-50">
              <Link
                to={"friends"}
                className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-300"
              >
                <UserGroupIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
                My Friends
              </Link>
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
