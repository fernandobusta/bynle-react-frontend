import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

import eventCover from "../../images/default/default_event_cover.jpg";
import profilePicture from "../../images/default/default_profile_picture.jpg";

import Container from "../../components/Container";
const swal = require("sweetalert2");

function ReceivedTransfers() {
  const { user } = useAuth();
  const api = useAxios();

  const navigate = useNavigate();
  const [requests, setRequests] = useState([]);

  // Get requests
  useEffect(() => {
    api
      .get(`/user/${user.user_id}/transfer-request/`)
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => console.log(err));
  }, [user.user_id]);

  const handleAcceptRequest = (transferRequest, ticketId) => {
    // Send Post request to accept the transfer request
    if (transferRequest.ticket.price == 0) {
      api
        .post(`/accept-transfer-request/${transferRequest.id}/`)
        .then((response) => {
          swal.fire({
            title: "Transfer Accepted",
            icon: "success",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
          navigate("/tickets");
        })
        .catch((err) => {
          console.error("Error accepting transfer request:", err);
          swal.fire({
            title: "Cannot accept transfer",
            text: err.response.data.detail,
            icon: "error",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        });
    } else {
      api
        .get(`user/${user.user_id}/can-accept-transfer/${transferRequest.id}`)
        .then((response) => {
          if (response.data.can_accept_transfer) {
            navigate(`/transfer/${transferRequest.id}/payment`);
          } else {
            swal.fire({
              title: "Cannot accept transfer",
              text: "You already have a ticket for this event",
              icon: "error",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        })
        .catch((err) => {
          swal.fire({
            title: "Cannot accept transfer",
            text: err.response.data.detail,
            icon: "error",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        });
    }
  };
  const handleDeclineRequest = (transferRequestId, e) => {
    // Call backend API to decline the transfer request
    api
      .delete(`/api/transfer_requests/${transferRequestId}`)
      .then((response) => {
        console.log("Transfer request declined successfully");
        // Update the state to remove the declined request
        setRequests(
          requests.filter((request) => request.id !== transferRequestId)
        );
      })
      .catch((error) => {
        console.error("Error declining transfer request:", error);
      });
  };

  const transferCards = () => {
    return (
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
        {requests.map((request, requestIdx) => (
          <li
            key={requestIdx}
            className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
          >
            <div className="relative flex flex-1 flex-col p-8">
              <div
                className="absolute inset-0 bg-cover bg-center rounded-t-lg"
                style={{
                  backgroundImage: `url(${request.event_cover || eventCover})`,
                }}
              />
              <div className="absolute inset-0 bg-black opacity-50 rounded-lg"></div>
              <div className="relative z-10">
                <img
                  className="mx-auto h-20 w-20 flex-shrink-0 rounded-full"
                  src={request.sender_profile_picture || profilePicture}
                  alt=""
                />
                <h3 className="mt-6 text-sm font-medium text-white">
                  {request.ticket.title}
                </h3>
                <dl className="mt-1 flex flex-grow flex-col justify-between">
                  <dd className="text-sm text-white">{request.club_name}</dd>
                  <dd className="mt-3">
                    <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                      {request.ticket.price === 0
                        ? "Free"
                        : `${request.ticket.price}€`}
                    </span>
                  </dd>
                  <dd className="text-sm text-white mt-4">
                    Sent by {request.sender} on {request.created_at}
                  </dd>
                </dl>
              </div>
            </div>

            <div>
              <div className="-mt-px flex divide-x divide-gray-200">
                <div className="-ml-px flex w-0 flex-1">
                  <button
                    onClick={() => handleDeclineRequest(request.id)}
                    className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-red-50 hover:text-red-700  transition ease-in-out duration-150"
                  >
                    {/* <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                    Decline
                  </button>
                </div>
                <div className="flex w-0 flex-1">
                  <button
                    onClick={() => handleAcceptRequest(request, request.ticket)}
                    className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-green-50 hover:text-green-700 transition ease-in-out duration-150"
                  >
                    {/* <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                    Accept
                  </button>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  };
  return (
    <Container>
      {requests.length > 0 ? (
        transferCards()
      ) : (
        <div>
          <p>No transfer requests received</p>
        </div>
      )}
    </Container>
  );
}

export default ReceivedTransfers;
