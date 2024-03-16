import React from "react";
import { useNavigate, NavLink, Outlet } from "react-router-dom";

const tabs = [
  { name: "Transfer Tickets", href: "ticket" },
  { name: "Stripe", href: "stripe" },
  { name: "Received Transfers", href: "received" },
  { name: "Sent Transfers", href: "sent" },
];

function TransferNavbar() {
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-2 mx-2">
        <div className="sm:hidden">
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-bynlegreen-500 focus:ring-bynlegreen-500"
            onChange={(event) => {
              navigate(`${event.target.value}`);
            }}
          >
            {tabs.map((tab) => (
              <option key={tab.href} value={tab.href}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              {tabs.map((tab) => (
                <NavLink
                  to={`${tab.href}`}
                  key={tab.name}
                  className={({ isActive, isPending, isTransitioning }) =>
                    [
                      isPending ? "pending" : "",
                      isActive
                        ? "border-bynlegreen-500 text-bynlegreen-600"
                        : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-700",
                      isTransitioning
                        ? "transitioning"
                        : "w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium",
                    ].join(" ")
                  }
                >
                  {tab.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </div>
      <Outlet />
    </>
  );
}

export default TransferNavbar;
