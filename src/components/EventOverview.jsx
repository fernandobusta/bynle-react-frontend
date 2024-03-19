import { RadioGroup } from "@headlessui/react";
import { CheckIcon } from "@heroicons/react/20/solid";

import { useNavigate } from "react-router-dom";

import useAxios from "../hooks/useAxios";
import { useAuth } from "../hooks/useAuth";
import eventCover from "../images/default/default_event_cover.jpg";

const swal = require("sweetalert2");

export default function EventOverview(props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const api = useAxios();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (props.event.soldout === true) {
      swal.fire({
        title: "Tickets have sold out.",
        icon: "warning",
        toast: true,
        timer: 3000,
        position: "top-right",
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } else if (props.free) {
      // Send Post request to create ticket
      api
        .post(`/api/tickets/`, {
          title: props.event.title,
          status: "A",
          price: 0.0,
          user: user.username,
          event: props.eventId,
        })
        .then((response) => {
          swal.fire({
            title: "Ticket created successfully",
            icon: "success",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
          navigate(`/tickets`);
        })
        .catch((err) => {
          console.log(err);
          swal.fire({
            title: "Can't perform this operation.",
            icon: "error",
            toast: true,
            timer: 3000,
            position: "top-right",
            timerProgressBar: true,
            showConfirmButton: false,
          });
        });
    } else {
      navigate(`/events/${props.eventId}/payment`);
    }
  };
  return (
    <div className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8">
        {/* Product details */}
        <div className="lg:max-w-lg lg:self-end">
          <nav aria-label="Breadcrumb">
            <div className="list-none flex items-center space-x-2">
              <li>
                <div className="flex items-center text-sm">
                  <a
                    href={"/club/" + props.event.club}
                    className="font-medium text-gray-500 hover:text-gray-900"
                  >
                    {/* Get the name of the club here with link to the club page (Profile) */}
                    {props.event.club_name}
                  </a>
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                    className="ml-2 h-5 w-5 flex-shrink-0 text-gray-300"
                  >
                    <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                  </svg>
                </div>
              </li>

              <li>
                <div className="flex items-center text-sm">
                  <p className="font-medium text-gray-500 hover:text-gray-900">
                    {props.event.title}
                  </p>
                </div>
              </li>
            </div>
          </nav>

          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {props.event.title}
            </h1>
          </div>

          <section aria-labelledby="information-heading" className="mt-4">
            <h2 id="information-heading" className="sr-only">
              Product information
            </h2>

            <div className="flex items-center">
              <p className="text-lg text-gray-900 sm:text-xl">
                € {props.event.price}
              </p>

              <div className="ml-4 border-l border-gray-300 pl-4">
                <div className="flex items-center">
                  {/* Get the total number of tickets sold */}
                  <p className="text-sm text-gray-500">
                    Don't miss out on this event!
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 space-y-6">
              <p className="text-base text-gray-500">
                {props.event.description}
              </p>
            </div>

            <div className="mt-6 flex items-center">
              <CheckIcon
                className="h-5 w-5 flex-shrink-0 text-green-500"
                aria-hidden="true"
              />
              {/* Get the availability of tickets -> if numbe of tickets sol = capacity */}
              <p className="ml-2 text-sm text-gray-500">
                Tickets available for purchase
              </p>
            </div>
          </section>
        </div>

        {/* Product image */}
        <div className="mt-10 lg:col-start-2 lg:row-span-2 lg:mt-0 lg:self-center">
          <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg">
            <img
              src={props.event.event_cover || eventCover}
              alt="Event Cover"
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product form */}
        <div className="mt-10 lg:col-start-1 lg:row-start-2 lg:max-w-lg lg:self-start">
          <section aria-labelledby="options-heading">
            <h2 id="options-heading" className="sr-only">
              Product options
            </h2>

            <div className="sm:flex sm:justify-between">
              <RadioGroup>
                <RadioGroup.Label className="block text-sm font-medium text-gray-700">
                  Important information
                </RadioGroup.Label>
                <div className="mt-1 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {/* Location of event */}
                  <RadioGroup.Option
                    as="div"
                    className="relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none"
                  >
                    <>
                      <RadioGroup.Label
                        as="p"
                        className="text-base font-medium text-gray-900"
                      >
                        {props.event.location}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="p"
                        className="mt-1 text-sm text-gray-500"
                      >
                        Contact a member of the club if you are unsure of the
                        location.
                      </RadioGroup.Description>
                      <div
                        className="pointer-events-none absolute -inset-px rounded-lg"
                        aria-hidden="true"
                      />
                    </>
                  </RadioGroup.Option>
                  {/* Date and time of event */}
                  <RadioGroup.Option
                    as="div"
                    className="relative block cursor-pointer rounded-lg border border-gray-300 p-4 focus:outline-none"
                  >
                    <>
                      <RadioGroup.Label
                        as="p"
                        className="text-base font-medium text-gray-900"
                      >
                        {props.event.date}
                      </RadioGroup.Label>
                      <RadioGroup.Description
                        as="p"
                        className="mt-1 text-sm text-gray-500"
                      >
                        {props.event.time}
                      </RadioGroup.Description>
                      <div
                        className="pointer-events-none absolute -inset-px rounded-lg"
                        aria-hidden="true"
                      />
                    </>
                  </RadioGroup.Option>
                </div>
              </RadioGroup>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="mt-10">
                {props.event.soldout ? (
                  <div
                    className="flex w-full items-center disabled
                  justify-center rounded-md border border-transparent
                  bg-gray-600 px-8 py-3 text-base font-medium text-white focus:outline-none focus:ring-2"
                  >
                    {" "}
                    Sold Out
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="flex w-full items-center
                  justify-center rounded-md border border-transparent
                  bg-indigo-600 px-8 py-3 text-base font-medium text-white
                  hover:bg-indigo-700 focus:outline-none focus:ring-2
                  focus:ring-indigo-500 focus:ring-offset-2
                  focus:ring-offset-gray-50"
                  >
                    {" "}
                    Buy Ticket
                  </button>
                )}
              </div>
              <div className="mt-6 text-center">
                <div className="group inline-flex text-base font-medium">
                  <span className="text-gray-500 hover:text-gray-700 ">
                    Never miss a party with us ;){" "}
                  </span>
                </div>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}
