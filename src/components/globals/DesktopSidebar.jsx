import { Cog6ToothIcon } from "@heroicons/react/24/outline";
import { navigation } from "../Constants";
import { Link } from "react-router-dom";
import { SITE_URL } from "../Constants";
import logo from "../../images/bynle-high-resolution-logo-black-transparent.png";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function DesktopSidebar(props) {
  return (
    <div className="flex grow flex-col gap-y-2 overflow-y-auto border-r border-gray-200 bg-white pb-4">
      <div className="flex h-16 shrink-0 items-center pt-2 px-2">
        <Link to={`${SITE_URL}/`} className="flex-grow">
          <img className="h-12 w-auto" src={logo} alt="Bynle" />
        </Link>
      </div>
      <nav className="flex flex-1 flex-col px-6">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={`${SITE_URL}${item.href}`}
                    className={classNames(
                      props.activeTab === item.name
                        ? "bg-gray-50 text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                      "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                    )}
                  >
                    <item.icon
                      className={classNames(
                        props.activeTab === item.name
                          ? "text-indigo-600"
                          : "text-gray-400 group-hover:text-indigo-600",
                        "h-6 w-6 shrink-0"
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          {props.clubsAdmined.length > 0 && (
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Clubs You Admin
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {props.clubsAdmined.map((club) => (
                  <li key={club.name}>
                    <Link
                      // Change this with the clubs the user follows
                      to={`${SITE_URL}/club/${club.id}`}
                      className={classNames(
                        props.activeTab === `${club.id}`
                          ? "bg-gray-50 text-indigo-600"
                          : "text-gray-700 hover:text-indigo-600 hover:bg-gray-50",
                        "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                      )}
                    >
                      <span
                        className={classNames(
                          props.activeTab === `${club.id}`
                            ? "text-indigo-600 border-indigo-600"
                            : "text-gray-400 border-gray-200 group-hover:border-indigo-600 group-hover:text-indigo-600",
                          "flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white"
                        )}
                      >
                        {club.name[0]}
                      </span>
                      <span className="truncate">{club.name}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          )}
          {/* 
          <li className="mt-auto">
            <a
              href="#"
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
            >
              <Cog6ToothIcon
                className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600"
                aria-hidden="true"
              />
              Settings
            </a>
          </li> */}
        </ul>
      </nav>
    </div>
  );
}
