import React, { useState, useContext } from "react";
import { Container } from "../../components/globals/Container";
import AuthContext from "../../context/AuthContext";
import Layout from "../../components/Layout";
import StripeConnectUserForm from "../../components/transfers/StripeConnectUserForm";
import TransferRequest from "../../components/transfers/TransferRequest";
import TransferRequestReceived from "../../components/transfers/TransferRequestReceived";
import SentTransfers from "../../components/transfers/SentTransfers";

const tabs = [
  { name: "Transfer Tickets" },
  { name: "Stripe" },
  { name: "Received Transfers" },
  { name: "Sent Transfers" },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TransferPage() {
  const { user } = useContext(AuthContext);
  const activeTab = "My Tickets";
  const [activeEditTab, setActiveEditTab] = useState("Transfer Tickets");
  return (
    <Layout activeTab={activeTab}>
      <Container>
        <div className="sm:hidden">
          <select
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
            onChange={(event) => {
              setActiveEditTab(event.target.value);
            }}
          >
            {tabs.map((tab) => (
              <option key={tab.name} value={tab.name}>
                {tab.name}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex" aria-label="Tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.name}
                  onClick={() => {
                    setActiveEditTab(tab.name);
                  }}
                  className={classNames(
                    activeEditTab === tab.name
                      ? "border-indigo-500 text-indigo-600"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700",
                    "w-1/4 border-b-2 py-4 px-1 text-center text-sm font-medium"
                  )}
                  aria-current={activeEditTab === tab.name ? "page" : undefined}
                >
                  {tab.name}
                </button>
              ))}
            </nav>
          </div>
        </div>
        <div className="mt-5">
          {activeEditTab === "Transfer Tickets" ? (
            <TransferRequest user_id={user.user_id} />
          ) : activeEditTab === "Stripe" ? (
            <StripeConnectUserForm user_id={user.user_id} />
          ) : activeEditTab === "Received Transfers" ? (
            <TransferRequestReceived
              user_id={user.user_id}
              id="pendingTransfers"
            />
          ) : activeEditTab === "Sent Transfers" ? (
            <SentTransfers user_id={user.user_id} />
          ) : null}
        </div>
      </Container>
    </Layout>
  );
}

export default TransferPage;
