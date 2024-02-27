import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { ticket_status } from "../components/Constants";
import useAxios from "../utils/useAxios";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";
import logo from "../images/bynle-high-resolution-logo-black-transparent.png";
import SpinningMouse from "../components/coolComponents/SpinningMouse";
import NotAllowed from "./NotAllowed";

function TicketPage() {
  const api = useAxios();
  const { user } = useContext(AuthContext);
  const { ticketId } = useParams();
  const [ticket, setTicket] = useState([]);
  const [isYourTicket, setIsYourTicket] = useState(null);
  const [event, setEvent] = useState([]);
  const [club, setClub] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/api/tickets/${ticketId}/`);
        setTicket(response.data);
        setIsYourTicket(true);
      } catch (error) {
        setIsYourTicket(false);
        console.log(error);
      }
    };
    fetchData();
  }, [ticketId]);

  useEffect(() => {
    if (ticket.event) {
      const fetchData = async () => {
        try {
          const response = await api.get(`/api/events/${ticket.event}/`);
          setEvent(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [ticket.event]);

  useEffect(() => {
    if (event.club) {
      const fetchData = async () => {
        try {
          const response = await api.get(`/api/clubs/${event.club}/`);
          setClub(response.data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchData();
    }
  }, [event.club]);

  const showOnPermission = () => {
    if (isYourTicket === true) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-center bg-cover bg-blue-500">
          <div className="absolute bg-blue-500 opacity-80 inset-0 z-0"></div>
          <div className="max-w-md w-full h-full mx-auto z-10 bg-blue-900 rounded-3xl">
            <div className="flex flex-col">
              <div className="bg-white relative drop-shadow-2xl  rounded-3xl p-4 m-4">
                <div className="flex-none sm:flex">
                  <div className="flex-auto justify-evenly">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center  my-1 ">
                        <span className="rounded-full bg-white">
                          {/* Change with our logo */}
                          <img
                            src={logo}
                            className="h-14 w-auto"
                            alt="Bynle Logo"
                          />
                        </span>
                        <h2 className="font-medium">{club.name}</h2>
                      </div>
                      <Link to={"/my-tickets"}>
                        <div className="ml-auto text-blue-800 mr-4 hover:bg-blue-400 hover:rounded-full hover:p-2 text-xs">
                          {" "}
                          Back to Tickets
                        </div>
                      </Link>
                    </div>
                    <div className="border-b border-dashed my-2"></div>
                    {/* Second Section */}
                    <div className="flex items-center">
                      <div className="flex flex-col mx-auto">
                        <div className="flex-auto text-xs text-gray-400 my-1">
                          <span className="mr-1 ">
                            {ticket.status
                              ? ticket_status.find(
                                  (choice) => choice.value === ticket.status
                                ).label
                              : "Undefined"}{" "}
                            ticket - {ticket.price} EUR
                          </span>
                        </div>
                        <div className="w-full flex-none text-lg text-blue-800 font-bold leading-none">
                          {ticket.title}
                        </div>
                        <div className="text-xs">{event.location}</div>
                      </div>
                      <div className="flex flex-col mx-auto">
                        {/* Change with Club Photo */}
                        <img
                          src={club.club_logo}
                          className="h-24 w-auto p-1"
                          alt="Club logo"
                        />
                      </div>
                    </div>
                    {/* Third Section */}
                    <div className="border-b border-dashed  my-5 pt-5">
                      <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                      <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
                    </div>
                    <div className="flex items-center mb-5 p-5 text-sm">
                      <div className="flex flex-col mx-auto">
                        <span className="text-sm">
                          {user.first_name} {user.last_name}
                        </span>
                        <div className="font-semibold">{user.student_id}</div>
                      </div>
                      <div className="flex flex-col ml-auto mx-auto">
                        <span className="text-sm">{user.course}</span>
                        <div className="font-semibold">Year {user.year}</div>
                      </div>
                    </div>
                    <div className="flex items-center mb-4 px-5">
                      <div className="flex flex-col text-sm mx-auto">
                        <span className="">Date</span>
                        <div className="font-semibold">{event.date}</div>
                      </div>

                      <div className="flex flex-col text-sm mx-auto">
                        <span className="">Time</span>
                        <div className="font-semibold">{event.time}</div>
                      </div>
                    </div>
                    <div className="border-b border-dashed my-5 pt-5">
                      <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -left-2"></div>
                      <div className="absolute rounded-full w-5 h-5 bg-blue-900 -mt-2 -right-2"></div>
                    </div>
                    {/* Fourth Section */}
                    <div className="flex flex-col py-5  justify-center text-sm ">
                      <h6 className="font-bold text-center">Ticket Code</h6>
                      <div className="inline-block relative left-auto">
                        <img
                          src={ticket.qr_code}
                          className="px-10"
                          alt="Ticket QR"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    } else if (isYourTicket === false) {
      return (
        <NotAllowed
          title={"Not Allowed"}
          message={"Access Denied"}
          reason={"You are not allowed to access this page."}
        />
      );
    } else {
      return <SpinningMouse />;
    }
  };

  return <div>{showOnPermission()}</div>;
}

export default TicketPage;
