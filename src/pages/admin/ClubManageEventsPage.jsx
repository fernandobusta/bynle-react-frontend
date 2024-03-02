import React, { useState, useEffect, useContext, Fragment } from "react";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";
import { Dialog, Transition, Menu } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { InformationAlert } from "../../components/alerts/Alert";
import { useParams } from "react-router-dom";
import ClubSettingsLayout from "../../components/clubSettings/ClubSettingsLayout";
import NotFound from "../NotFound";
const swal = require("sweetalert2");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ClubManageEventsPage() {
  const { clubId } = useParams();
  const [events, setEvents] = useState([]);
  const api = useAxios();
  const [openEvent, setOpenEvent] = useState(0);
  const [openSlideOver, setOpenSlideOver] = useState(false);
  const [ticketScanners, setTicketScanners] = useState([]);
  const [resetPassword, setResetPassword] = useState({ password: "" });
  const [buttonResetPassword, setButtonResetPassword] = useState(null);
  const [newTicketScanner, setNewTicketScanner] = useState({
    username: "",
    password: "",
    email: "",
    event_id: 0,
  });

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

  // Get the events for this club
  useEffect(() => {
    api
      .get(`/club/${clubId}/events/`)
      .then((res) => {
        setEvents(res.data);
      })
      .catch((err) => {
        console.log(err);
      }, []);
  }, [clubId]);

  // Get the ticket scanners for the event
  const getTicketScanners = (eventId) => {
    api
      .get("/ticket-scanner-users/", {
        params: {
          event_id: eventId,
        },
      })
      .then((res) => {
        setTicketScanners(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Open the slide over and get the ticket scanners for the event
  const handleClick = (key, eventId) => {
    getTicketScanners(eventId);
    setOpenEvent(key);
    setNewTicketScanner({ ...newTicketScanner, event_id: eventId });
    setOpenSlideOver(true);
  };

  const handleChange = (e) => {
    setNewTicketScanner({
      ...newTicketScanner,
      [e.target.name]: e.target.value,
    });
  };

  // Create a new Ticket Scanner
  const createTicketScanner = (event) => {
    event.preventDefault();
    api
      .post("/create-ticket-scanner/", newTicketScanner)
      .then((res) => {
        getTicketScanners(newTicketScanner.event_id);
        swal.fire({
          title: "Ticket scanner created successfully",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
        // Clear the form
        setNewTicketScanner({
          username: "",
          password: "",
          email: "",
          event_id: newTicketScanner.event_id,
        });
      })
      .catch((err) => {
        console.log(err);
        swal.fire({
          title: "Could not create ticket scanner",
          icon: "error",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  };

  // Delete a ticket scanner
  const deleteTicketScanner = (scanner_id) => {
    api
      .delete(`ticket-scanner-users/${scanner_id}/delete/`)
      .then((res) => {
        getTicketScanners(newTicketScanner.event_id);
      })
      .catch((err) => {
        console.log(err);
        swal.fire({
          title: "Could not delete ticket scanner",
          icon: "error",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  };

  // Reset Ticket Scanner Password
  const resetTicketScannerPassword = (scanner_id) => {
    api
      .put(`ticket-scanner-users/${scanner_id}/reset-password/`, resetPassword)
      .then((res) => {
        getTicketScanners(newTicketScanner.event_id);
        swal.fire({
          title: "Password reset successfully",
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
          title: "Could not reset ticket scanner password",
          icon: "error",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  };

  const slideOver = () => {
    return (
      <Transition.Root show={openSlideOver} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={setOpenSlideOver}>
          <div className="fixed inset-0" />

          <div className="fixed inset-0 overflow-hidden">
            <div className="absolute inset-0 overflow-hidden">
              <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16 pt-12 lg:pt-0 mg:pt-12">
                <Transition.Child
                  as={Fragment}
                  enter="transform transition ease-in-out duration-500 sm:duration-700"
                  enterFrom="translate-x-full"
                  enterTo="translate-x-0"
                  leave="transform transition ease-in-out duration-500 sm:duration-700"
                  leaveFrom="translate-x-0"
                  leaveTo="translate-x-full"
                >
                  <Dialog.Panel className="pointer-events-auto w-screen max-w-2xl">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                      <div className="px-4 sm:px-6">
                        <div className="flex items-start justify-between">
                          <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">
                            {events[openEvent].title}
                          </Dialog.Title>
                          {/* On smaller screens the XMarkIcon should be in the center left of the slide over */}
                          <div className="ml-3 flex h-7 items-center">
                            <button
                              type="button"
                              className="relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                              onClick={() => setOpenSlideOver(false)}
                            >
                              <span className="absolute -inset-2.5" />
                              <span className="sr-only">Close panel</span>
                              <XMarkIcon
                                className="h-6 w-6"
                                aria-hidden="true"
                              />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="relative mt-6 flex-1">
                        {/* Your content */}
                        <div className="relative h-40 sm:h-56">
                          <img
                            className="absolute h-full w-full object-cover"
                            src={events[openEvent].event_cover}
                            alt={events[openEvent].title}
                          />
                        </div>
                        <form onSubmit={createTicketScanner}>
                          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2 p-5">
                            <div className="sm:col-span-3">
                              <label
                                htmlFor="username"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Username
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  value={newTicketScanner.username}
                                  onChange={handleChange}
                                  name="username"
                                  id="username"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  required
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label
                                htmlFor="password"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Password
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  value={newTicketScanner.password}
                                  onChange={handleChange}
                                  name="password"
                                  id="password"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  required
                                />
                              </div>
                            </div>
                            <div className="sm:col-span-6">
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                              >
                                Email
                              </label>
                              <div className="mt-2">
                                <input
                                  type="email"
                                  value={newTicketScanner.email}
                                  onChange={handleChange}
                                  name="email"
                                  id="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                          <button
                            type="submit"
                            className="mx-5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                          >
                            Add Scanner
                          </button>
                        </form>
                        {ticketScanners.length === 0 ? (
                          <div className="m-5">
                            No ticket scanners added yet. Scanners are allowed
                            to validate tickets at the event. They would be
                            people working at security or at the entrance of the
                            event. Remember to add them before the event starts.
                            Each scanner will have a unique username and
                            password, which they will use to login to the Bynle
                            app. This special login will allow them to scan
                            tickets and validate them.
                          </div>
                        ) : (
                          <div>
                            <ul className="divide-y divide-gray-100 m-5">
                              {ticketScanners.map((scanner, key) => (
                                <ul key={key}>
                                  <li
                                    key={key}
                                    className="flex items-center justify-between gap-x-6 py-5"
                                  >
                                    <div className="min-w-0">
                                      <div className="flex items-start gap-x-3">
                                        <p className="text-sm font-semibold leading-6 text-gray-900">
                                          {scanner.username}
                                        </p>
                                        <p className="text-green-700 bg-green-50 ring-green-600/20 rounded-md whitespace-nowrap mt-0.5 px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset">
                                          Active
                                        </p>
                                      </div>
                                      <div className="mt-1 flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                        <p className="truncate">
                                          Created by {scanner.created_by}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="flex flex-none items-center gap-x-4">
                                      <button
                                        onClick={() =>
                                          setButtonResetPassword(scanner.id)
                                        }
                                        className="hidden rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:block"
                                      >
                                        Reset Password
                                        <span className="sr-only">
                                          , {scanner.username}
                                        </span>
                                      </button>
                                      <Menu
                                        as="div"
                                        className="relative flex-none"
                                      >
                                        <Menu.Button className="-m-2.5 block p-2.5 text-gray-500 hover:text-gray-900">
                                          <span className="sr-only">
                                            Open options
                                          </span>
                                          <EllipsisVerticalIcon
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
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
                                          <Menu.Items className="absolute right-0 z-10 mt-2 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            <Menu.Item className="block sm:hidden">
                                              {({ active }) => (
                                                <button
                                                  onClick={() =>
                                                    setButtonResetPassword(
                                                      scanner.id
                                                    )
                                                  }
                                                  className={classNames(
                                                    active ? "bg-gray-50" : "",
                                                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                  )}
                                                >
                                                  Reset Password
                                                </button>
                                              )}
                                            </Menu.Item>
                                            <Menu.Item>
                                              {({ active }) => (
                                                <button
                                                  onClick={() =>
                                                    deleteTicketScanner(
                                                      scanner.id
                                                    )
                                                  }
                                                  className={classNames(
                                                    active ? "bg-gray-50" : "",
                                                    "block px-3 py-1 text-sm leading-6 text-gray-900"
                                                  )}
                                                >
                                                  Delete
                                                  <span className="sr-only">
                                                    , {scanner.username}
                                                  </span>
                                                </button>
                                              )}
                                            </Menu.Item>
                                          </Menu.Items>
                                        </Transition>
                                      </Menu>
                                    </div>
                                  </li>
                                  {buttonResetPassword === scanner.id ? (
                                    <li className="mt-2">
                                      <form
                                        onSubmit={(e) => {
                                          e.preventDefault();
                                          resetTicketScannerPassword(
                                            scanner.id
                                          );
                                        }}
                                        className="grid grid-cols-2 gap-2 sm:grid-cols-5 md:col-span-2"
                                      >
                                        <input
                                          type="text"
                                          value={resetPassword.password}
                                          onChange={(e) => {
                                            setResetPassword({
                                              password: e.target.value,
                                            });
                                          }}
                                          placeholder="New password"
                                          name="newpassword"
                                          id="newpassword"
                                          className="col-span-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                          required
                                        />
                                        <button
                                          onClick={() =>
                                            setButtonResetPassword(null)
                                          }
                                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                          Cancel
                                        </button>
                                        <button
                                          type="submit"
                                          className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                                        >
                                          Save
                                        </button>
                                      </form>
                                    </li>
                                  ) : null}
                                </ul>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
  };
  const showOnPermission = () => {
    if (isClubAdmin === null) {
      return null;
    } else if (isClubAdmin === false) {
      return <NotFound />;
    } else {
      return (
        <ClubSettingsLayout clubId={clubId} activeTab="Manage Events">
          <div className="px-4 sm:px-6 lg:px-8">
            {openSlideOver && slideOver()}
            <div className="sm:flex sm:items-center">
              <div className="sm:flex-auto">
                <h1 className="text-base font-semibold leading-6 text-gray-900">
                  Users
                </h1>
                <p className="mt-2 text-sm text-gray-700">
                  A list of all the events for the Club.
                </p>
              </div>
              <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
                <button
                  type="button"
                  className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Create Event
                </button>
              </div>
            </div>
            <InformationAlert
              classNames="mt-4"
              message="Click on an event to add ticket scanners for the event."
            />
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
                          Name
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Price
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Tickets
                        </th>
                        <th
                          scope="col"
                          className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                        >
                          <span className="sr-only">Manage Event</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {events.map((event, key) => (
                        <tr key={key}>
                          <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                            {event.title}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {event.date}
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {event.price} €
                          </td>
                          <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {event.soldout ? "Sold Out" : "Available"}
                          </td>
                          <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                            <button
                              onClick={() => handleClick(key, event.id)}
                              type="button"
                              className="text-indigo-600 hover:text-indigo-900"
                            >
                              Manage Event
                              <span className="sr-only">, {event.name}</span>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </ClubSettingsLayout>
      );
    }
  };
  return showOnPermission();
}

export default ClubManageEventsPage;
