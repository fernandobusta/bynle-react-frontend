import React, { useState, useEffect, useContext } from "react";
import useAxios from "../../utils/useAxios";
import eventCover from "../../images/default/default_event_cover.jpg";
const swal = require("sweetalert2");

export default function SentTransfers({ user_id }) {
  const api = useAxios();
  const [pendingTransfers, setPendingTransfers] = useState([]);
  const [acceptedTransfers, setAcceptedTransfers] = useState([]);
  const [deletedUser, setDeletedUser] = useState(false);

  // Get requests made by user
  useEffect(() => {
    if (user_id) {
      api
        .get(`user/${user_id}/sent-transfer-requests/`)
        .then((res) => {
          setPendingTransfers(res.data.pending_transfer_requests);
          setAcceptedTransfers(res.data.accepted_transfer_requests);
        })
        .catch((err) => console.log(err));
    }
  }, [user_id, deletedUser]);

  const deleteTransfer = (transferId) => {
    api
      .delete(`/api/transfer_requests/${transferId}`)
      .then((res) => {
        setDeletedUser(!deletedUser);
        swal.fire({
          title: "Transfer request deleted",
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
          title: "Could not delete transfer request!",
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

  const transferTable = () => {
    return (
      <div className="">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Transfers
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the transfers you have made.
            </p>
          </div>
          {/* <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button
              type="button"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add user
            </button>
          </div> */}
        </div>
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
                      Sent to
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Date sent
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-0"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white">
                  {pendingTransfers.map((transfer, transferIdx) => (
                    <tr key={transferIdx}>
                      <td className="whitespace-nowrap py-5 pl-4 pr-3 text-sm sm:pl-0">
                        <div className="flex items-center">
                          <div className="h-11 w-11 flex-shrink-0">
                            <img
                              className="h-11 w-11 rounded-full"
                              src={transfer.event_cover || eventCover}
                              alt={transfer.club_name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">
                              {transfer.ticket.title}
                            </div>
                            <div className="mt-1 text-gray-500">
                              {transfer.club_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <div className="text-gray-900">{transfer.receiver}</div>
                        <div className="mt-1 text-gray-500">
                          {transfer.department}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        <span className="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          {transfer.status}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-5 text-sm text-gray-500">
                        {transfer.created_at}
                      </td>
                      <td className="relative whitespace-nowrap py-5 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                        <button
                          onClick={() => deleteTransfer(transfer.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Remove
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
    );
  };
  return <div>{transferTable()}</div>;
}
