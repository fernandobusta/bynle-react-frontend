import React from "react";
import { Link } from "react-router-dom";

import {
  BanknotesIcon,
  ClockIcon,
  PencilSquareIcon,
  FaceSmileIcon,
  ShieldCheckIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/outline";

const actions = [
  {
    title: "Create Event",
    href: "create-event",
    icon: ClockIcon,
    text: "Create a new event for your club. If you want to charge for tickets, you can set up Stripe to receive payments.",
    iconForeground: "text-teal-700",
    iconBackground: "bg-teal-50",
  },
  {
    title: "Edit Club",
    href: "edit",
    icon: PencilSquareIcon,
    text: "Edit your club's information. You can change the name, description, and more.",
    iconForeground: "text-purple-700",
    iconBackground: "bg-purple-50",
  },
  {
    title: "Schedule a one-on-one",
    href: ".",
    icon: FaceSmileIcon,
    text: `Email us at contact@bynle.com to schedule a one-on-one meeting with us. We can help you with any questions you have about your club.`,
    iconForeground: "text-sky-700",
    iconBackground: "bg-sky-50",
  },
  {
    title: "Stripe Configuration",
    href: "stripe",
    icon: BanknotesIcon,
    text: "Set up Stripe for your club so that you can receive payments for events. You can also view your Stripe account status and all the transactions.",
    iconForeground: "text-yellow-700",
    iconBackground: "bg-yellow-50",
  },
  {
    title: "Manage Events",
    href: "manage-events",
    icon: ShieldCheckIcon,
    text: "Manage your club's events. Create Ticket Scanner users and view all the events you have created.",
    iconForeground: "text-rose-700",
    iconBackground: "bg-rose-50",
  },
  {
    title: "Stats",
    href: "stats",
    icon: ChartBarSquareIcon,
    text: "View statistics about your club. You can see information about your followers, events, and more.",
    iconForeground: "text-indigo-700",
    iconBackground: "bg-indigo-50",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function Admins() {
  return (
    <div>
      <div className="my-fancy-title">
        <span className="fancy-top-key"></span>
        <span className="fancy-text">Admin Panel</span>
        <span className="fancy-bottom-key-1"></span>
        <span className="fancy-bottom-key-2"></span>
      </div>

      <div className="divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0 mt-6">
        {actions.map((action, actionIdx) => (
          <div
            key={action.title}
            className={classNames(
              actionIdx === 0
                ? "rounded-tl-lg rounded-tr-lg sm:rounded-tr-none"
                : "",
              actionIdx === 1 ? "sm:rounded-tr-lg" : "",
              actionIdx === actions.length - 2 ? "sm:rounded-bl-lg" : "",
              actionIdx === actions.length - 1
                ? "rounded-bl-lg rounded-br-lg sm:rounded-bl-none"
                : "",
              "group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500"
            )}
          >
            <div>
              <span
                className={classNames(
                  action.iconBackground,
                  action.iconForeground,
                  "inline-flex rounded-lg p-3 ring-4 ring-white"
                )}
              >
                <action.icon className="h-6 w-6" aria-hidden="true" />
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-base font-semibold leading-6 text-gray-900">
                <Link to={action.href} className="focus:outline-none">
                  {/* Extend touch target to entire panel */}
                  <span className="absolute inset-0" aria-hidden="true" />
                  {action.title}
                </Link>
              </h3>
              <p className="mt-2 text-sm text-gray-500">{action.text}</p>
            </div>
            <span
              className="pointer-events-none absolute right-6 top-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
