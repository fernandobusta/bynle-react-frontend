import React from "react";
import { Link, NavLink } from "react-router-dom";
import { navigation } from "../components/Constants";
import logo from "../images/bynle-logo.jpeg";

const MobileSidebar = (props) => {
  return (
    <div className="flex grow flex-col gap-y-2 overflow-y-auto bg-white pb-4">
      <div className="flex h-16 shrink-0 items-center pt-2 pl-4">
        <Link to="/" className="flex-grow">
          <img className="h-12 w-auto" src={logo} alt="Bynle" />
        </Link>
      </div>
      <nav className="flex flex-1 flex-col px-6">
        <ul role="list" className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <NavLink
                    to={`${item.href}`}
                    className={({ isActive, isPending, isTransitioning }) =>
                      [
                        isPending ? "pending" : "",
                        isActive
                          ? "bg-gray-50 text-bynlegreen-600"
                          : "text-gray-800 hover:text-bynlegreen-600 hover:bg-gray-50",
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
          {props.clubsAdmined.length > 0 && (
            <li>
              <div className="text-xs font-semibold leading-6 text-gray-400">
                Clubs You Admin
              </div>
              <ul role="list" className="-mx-2 mt-2 space-y-1">
                {props.clubsAdmined.map((club) => (
                  <li key={club.name}>
                    <NavLink
                      to={`clubs/${club.id}`}
                      className={({ isActive, isPending, isTransitioning }) =>
                        [
                          isPending ? "pending" : "",
                          isActive
                            ? "bg-gray-50 text-bynlegreen-600"
                            : "text-gray-800 hover:text-bynlegreen-600 hover:bg-gray-50",
                          isTransitioning
                            ? "transitioning"
                            : "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold",
                        ].join(" ")
                      }
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg border text-[0.625rem] font-medium bg-white">
                        {club.name[0]}
                      </span>
                      <span className="truncate">{club.name}</span>
                    </NavLink>
                  </li>
                ))}
              </ul>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default MobileSidebar;
