import React, { useState, useEffect, useContext } from "react";
import useAxios from "../../utils/useAxios";
import FriendSelector from "./FriendSelector";
import TicketSelector from "./TicketSelector";
import { InformationAlert } from "../alerts/Alert";
const swal = require("sweetalert2");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function TransferRequest({ user_id }) {
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [isStripeConnected, setIsStripeConnected] = useState(false);
  const [isStripeCompleted, setIsStripeCompleted] = useState(false);
  const [tickets, setTickets] = useState([]);
  const [friends, setFriends] = useState([]);
  const [transferMade, setTransferMade] = useState(false);
  const api = useAxios();

  // Get user information by ID and check if stripe is connected
  useEffect(() => {
    api
      .get(`/stripe-account/user/${user_id}/`)
      .then((res) => {
        // Check if 'stripe' is not null and 'stripe_connected' is true
        setIsStripeCompleted(res.data.stripe_complete);
        setIsStripeConnected(res.data.stripe_connected);
      })
      .catch((error) => {
        console.error("Error fetching club information:", error);
      });
  }, [user_id, transferMade]);

  // Get the tickets of the user
  useEffect(() => {
    if (user_id) {
      api
        .get(`user/${user_id}/available-to-transfer-tickets/`)
        .then((res) => {
          setTickets(res.data);
          setSelectedTicket(res.data[0]);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user_id]);

  // Get friends of user
  useEffect(() => {
    if (user_id) {
      api
        .get(`user/${user_id}/friends/accepted/`)
        .then((res) => {
          setFriends(res.data);
          setSelectedFriend(res.data[0]);
        })
        .catch((err) => console.log(err));
    }
  }, [user_id]);

  // Create a transfer request
  const handleSubmit = (e) => {
    e.preventDefault();
    api
      .post("create-transfer-request/", {
        receiver: selectedFriend.username,
        ticket: selectedTicket,
      })
      .then(() => {
        setTransferMade(!transferMade);
        swal.fire({
          title: "Request sent!",
          text: "Transfer request sent!",
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
          title: "Could not transfer ticket!",
          text: err.response.data.detail,
          icon: "error",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  };

  const transferButton = () => {
    if (selectedTicket) {
      if (selectedTicket.price !== 0) {
        return (
          <>
            {isStripeConnected ? (
              isStripeCompleted ? (
                <p className="text-sm text-green-500 mt-1">
                  User all set up with Stripe
                </p>
              ) : (
                <div>
                  <p className="text-sm text-red-500 mt-1">
                    You need to complete stripe setup to transfer a paid ticket.
                  </p>
                </div>
              )
            ) : (
              <div>
                <p className="text-sm text-red-500 mt-1">
                  You need to setup Stripe to transfer a paid ticket.
                </p>
                {/* Add a button to redirect to Edit Club Page */}
              </div>
            )}
          </>
        );
      }
    } else {
      return null;
    }
  };

  return (
    <>
      <InformationAlert
        message="To transfer a ticket for money you need to setup a Stripe account. If the ticket was free, you can transfer it without setting up Stripe."
        moreInfo={false}
      />

      {friends.length === 0 ? (
        <p>Add Friends to transfer tickets to!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="pt-4">
            {selectedFriend && (
              <FriendSelector
                users={friends}
                selected={selectedFriend}
                setSelected={setSelectedFriend}
                title={"Select a Friend"}
              />
            )}
          </div>
          <div className="pt-4">
            {tickets.length === 0 ? (
              <p>No tickets available to transfer</p>
            ) : (
              <TicketSelector
                tickets={tickets}
                selected={selectedTicket}
                setSelected={setSelectedTicket}
                title={"Select a Ticket"}
              />
            )}
          </div>

          {transferButton()}

          {/* Conditionally render the "Send Transfer Request" button */}
          {selectedTicket && (
            <button
              type="submit"
              className={classNames(
                selectedTicket.price !== 0 &&
                  (!isStripeConnected || !isStripeCompleted)
                  ? "disabled:opacity-25"
                  : "hover:bg-indigo-700",
                "mt-4 bg-indigo-600 text-white font-semibold py-2 px-4 rounded"
              )}
              disabled={
                selectedTicket.price !== 0 &&
                (!isStripeConnected || !isStripeCompleted)
              }
            >
              Send Transfer Request
            </button>
          )}
        </form>
      )}
    </>
  );
}

export default TransferRequest;
