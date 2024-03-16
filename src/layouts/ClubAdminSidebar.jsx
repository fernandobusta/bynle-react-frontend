import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
  ArrowLeftIcon,
  PlusCircleIcon,
} from "@heroicons/react/24/outline";

import { Link, NavLink, Outlet } from "react-router-dom";

import logo from "../images/bynle-logo-tittie.jpeg";
import clubLogo from "../images/default/default_club_logo.jpg";

const navigation = [
  {
    name: "Create Event",
    url: "create-event",
    icon: PlusCircleIcon,
  },
  {
    name: "Edit Club",
    url: "edit",
    icon: HomeIcon,
  },
  {
    name: "Edit Media",
    url: "edit-media",
    icon: FolderIcon,
  },
  {
    name: "Manage Events",
    url: "manage-events",
    icon: CalendarIcon,
  },
  {
    name: "Manage Admins",
    url: "manage-admins",
    icon: UsersIcon,
  },
  {
    name: "Stripe Payments",
    url: "stripe",
    icon: DocumentDuplicateIcon,
  },
  {
    name: "Club Stats",
    url: "stats",
    icon: ChartPieIcon,
  },
];

function ClubAdminSidebar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
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
                  <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6 pb-2 ring-1 ring-white/10">
                    <div className="flex h-16 shrink-0 items-center">
                      <Link to="." className="flex-grow">
                        <img
                          className="h-12 w-12 object-cover bg-white rounded-full"
                          src={logo}
                          alt="Bynle Logo"
                        />
                      </Link>
                    </div>
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-1">
                            {navigation.map((item) => (
                              <li key={item.name}>
                                <NavLink
                                  to={`${item.url}`}
                                  className={({
                                    isActive,
                                    isPending,
                                    isTransitioning,
                                  }) =>
                                    [
                                      isPending ? "pending" : "",
                                      isActive
                                        ? "bg-gray-800 text-white"
                                        : "text-gray-400 hover:text-white hover:bg-gray-800",
                                      isTransitioning
                                        ? "transitioning"
                                        : "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                                    ].join(" ")
                                  }
                                >
                                  <item.icon
                                    className="h-6 w-6 shrink-0"
                                    aria-hidden="true"
                                  />
                                  {item.name}
                                </NavLink>
                              </li>
                            ))}
                          </ul>
                        </li>
                        <li className="mt-auto mb-4">
                          <Link
                            to="/"
                            className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                          >
                            <ArrowLeftIcon
                              className="h-6 w-6 shrink-0"
                              aria-hidden="true"
                            />
                            Home
                          </Link>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        {/* Static sidebar for desktop */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-gray-900 px-6">
            <div className="flex h-16 shrink-0 items-center">
              <Link to="." className="flex-grow">
                <img
                  className="h-12 w-12 object-cover bg-white rounded-full"
                  src={logo}
                  alt="Bynle Logo"
                />
              </Link>
            </div>
            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-1">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <NavLink
                          to={`${item.url}`}
                          className={({
                            isActive,
                            isPending,
                            isTransitioning,
                          }) =>
                            [
                              isPending ? "pending" : "",
                              isActive
                                ? "bg-gray-800 text-white"
                                : "text-gray-400 hover:text-white hover:bg-gray-800",
                              isTransitioning
                                ? "transitioning"
                                : "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold cursor-pointer",
                            ].join(" ")
                          }
                        >
                          <item.icon
                            className="h-6 w-6 shrink-0"
                            aria-hidden="true"
                          />
                          {item.name}
                        </NavLink>
                      </li>
                    ))}
                  </ul>
                </li>
                <li className="mt-auto mb-6">
                  <Link
                    to="/"
                    className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-400 hover:bg-gray-800 hover:text-white"
                  >
                    <ArrowLeftIcon
                      className="h-6 w-6 shrink-0"
                      aria-hidden="true"
                    />
                    Home
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex-1 text-sm font-semibold leading-6 text-gray-900">
            Dashboard
          </div>
          <Link to=".">
            <span className="sr-only">Club Settings</span>
            <img
              className="h-8 w-8 object-cover rounded-full bg-gray-50"
              src={logo}
              alt="Bynle Logo"
            />
          </Link>
        </div>
        <main className="py-10 lg:pl-72">
          <div className="px-4 sm:px-6 lg:px-8">
            <Outlet />
          </div>
        </main>
      </div>
    </>
  );
}

export default ClubAdminSidebar;
