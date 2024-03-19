import React, { useState, useEffect } from "react";

import { Link } from "react-router-dom";

import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";

import Container from "../../components/Container";
import { ticket_status } from "../../components/Constants";

function Tickets() {
  const api = useAxios();
  const { user } = useAuth();

  const [tickets, setTickets] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/user/${user.user_id}/tickets/`);
        setTickets(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [user.user_id]);

  return (
    <Container xpadding={" "} ypadding={" "}>
      <div className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="grid grid-cols-2 justify-items-stretch items-center">
            <div className="">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Ticket history 🎫
              </h1>
              <p className="mt-2 text-sm text-gray-500">
                Check the status of your tickets.
              </p>
            </div>
            <Link to="/transfer/ticket" className="justify-self-end">
              <button
                type="button"
                className="inline-flex justify-center px-3 py-2 rounded-full bg-bynlegreen-600 text-sm font-semibold text-white shadow-sm hover:bg-bynlegreen-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bynlegreen-700"
              >
                <span>Transfers</span>
              </button>
            </Link>
          </div>

          <div className="mt-8">
            <div className="space-y-20">
              <table className="mt-4 w-full text-gray-500 sm:mt-6">
                <thead className="sr-only text-left text-sm text-gray-500 sm:not-sr-only">
                  <tr>
                    <th
                      scope="col"
                      className="py-3 pr-8 font-normal sm:w-2/5 lg:w-1/3"
                    >
                      Ticket
                    </th>
                    <th
                      scope="col"
                      className="hidden w-1/5 py-3 pr-8 font-normal sm:table-cell"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="hidden py-3 pr-8 font-normal sm:table-cell"
                    >
                      Status
                    </th>
                    <th scope="col" className="w-0 py-3 text-right font-normal">
                      Info
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border-b border-gray-200 text-sm sm:border-t">
                  {tickets.map((ticket, ticketIdx) => (
                    <tr key={ticketIdx}>
                      <td className="py-6 pr-8">
                        <div className="flex items-center">
                          <div>
                            <div className="font-medium text-gray-900">
                              {ticket.title}
                            </div>
                            <div className="mt-1 sm:hidden">
                              {ticket.price} €
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="hidden py-6 pr-8 sm:table-cell">
                        {ticket.price} €
                      </td>
                      <td className="hidden py-6 pr-8 sm:table-cell">
                        {/* Get the label, given the value */}
                        {
                          ticket_status.find(
                            (status) => status.value === ticket.status
                          ).label
                        }
                      </td>
                      <td className="whitespace-nowrap py-6 text-right font-medium">
                        <Link
                          to={`${ticket.id}`}
                          className="text-bynlegreen-600 hover:text-bynlegreen-900"
                        >
                          View
                          <span className="hidden lg:inline"> Ticket</span>
                          <span className="sr-only">, {ticket.name}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
}

export default Tickets;
