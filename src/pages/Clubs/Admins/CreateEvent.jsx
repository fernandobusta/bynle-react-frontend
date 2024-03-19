import React, { useState, useEffect } from "react";
import { Switch } from "@headlessui/react";
import Datepicker from "react-tailwindcss-datepicker";
import { useNavigate } from "react-router-dom";

import useAxios from "../../../hooks/useAxios";

import { event_choices } from "../../../components/Constants";
const swal = require("sweetalert2");

const timeOptions = {
  hours: [
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
  ],
  minutes: [
    "00",
    "01",
    "02",
    "03",
    "04",
    "05",
    "06",
    "07",
    "08",
    "09",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
    "32",
    "33",
    "34",
    "35",
    "36",
    "37",
    "38",
    "39",
    "40",
    "41",
    "42",
    "43",
    "44",
    "45",
    "46",
    "47",
    "48",
    "49",
    "50",
    "51",
    "52",
    "53",
    "54",
    "55",
    "56",
    "57",
    "58",
    "59",
  ],
};

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

function CreateEvent() {
  const api = useAxios();
  const navigate = useNavigate();

  const [typeOfEvent, setTypeOfEvent] = useState("Anniversary");
  const [eventCover, SetEventCover] = useState(null);
  const [isStripeConnected, setIsStripeConnected] = useState(false);
  const [isStripeCompleted, setIsStripeCompleted] = useState(false);

  const [time, setTime] = useState({
    hour: "00",
    minute: "00",
  });
  const [freeEvent, setFreeEvent] = useState(false);
  const [value, setValue] = useState({
    startDate: null,
    endDate: null,
  });
  const [eventData, setEventData] = useState({
    title: "",
    description: "",
    price: "",
    date: "",
    time: "",
    capacity: "",
    location: "",
    event_cover: "",
    event_type: "",
    club: "",
  });
  const handleCoverChange = (e) => {
    SetEventCover(e.target.files[0]);
  };
  const clubId = window.location.pathname.split("/")[2];

  const handleValueChange = (newValue) => {
    setValue(newValue);
  };

  const handleChange = (e) => {
    setEventData({
      ...eventData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const eventTime = `${time.hour}:${time.minute}:00`;
    const updatedEventData = {
      ...eventData,
      time: eventTime,
      club: clubId,
      date: value.startDate,
      event_type: event_choices.find((choice) => choice.label === typeOfEvent)
        .value,
      event_cover: eventCover,
    };
    if (freeEvent) {
      updatedEventData.price = 0;
    }
    api
      .post(`/api/events/`, updatedEventData, {
        headers: {
          "content-type": "multipart/form-data",
        },
      })
      .then((res) => {
        navigate("../");
        swal.fire({
          title: "Created Successful",
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
          title: "Enter all fields correctly",
          icon: "error",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  };

  useEffect(() => {
    // Check if the club is connected to Stripe (if so, is it completed?)
    api.get(`/stripe-status/${clubId}`).then((res) => {
      setIsStripeConnected(res.data.stripe_connected);
    });
  }, [clubId]);

  useEffect(() => {
    // Get the stripe status of the club
    api
      .get(`/stripe-account/club/${clubId}/`)
      .then((res) => {
        // Check if 'stripe' is not null and 'stripe_connected' is true
        setIsStripeCompleted(res.data.stripe_complete);
        setIsStripeConnected(res.data.stripe_connected);
      })
      .catch((error) => {
        console.error("Error fetching club information:", error);
      });
  }, [clubId]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Event Information
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              Club information will be displayed publicly for contact purposes.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-3">
              <label
                htmlFor="title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name of Event
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={eventData.title}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bynlegreen-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="capacity"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Capacity
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="capacity"
                  id="capacity"
                  value={eventData.capacity}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bynlegreen-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div className="sm:col-span-6">
              <label
                htmlFor="location"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Location
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="location"
                  id="location"
                  value={eventData.location}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bynlegreen-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Date of Event
              </label>

              <Datepicker
                asSingle={true}
                useRange={false}
                value={value}
                onChange={handleValueChange}
              />
            </div>
            <div className="sm:col-span-3">
              <div className="grid grid-cols-1  sm:grid-cols-6 md:col-span-1 gap-x-4">
                <div className="sm:col-span-2">
                  <label
                    htmlFor="hour"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Hour
                  </label>
                  <select
                    id="hour"
                    name="hour"
                    value={time.hour}
                    onChange={(e) => setTime({ ...time, hour: e.target.value })}
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-bynlegreen-600 sm:text-sm sm:leading-6"
                  >
                    {timeOptions.hours.map((hour) => (
                      <option key={hour}>{hour}</option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label
                    htmlFor="minute"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Minute
                  </label>
                  <select
                    id="minute"
                    name="minute"
                    value={time.minute}
                    onChange={(e) =>
                      setTime({ ...time, minute: e.target.value })
                    }
                    className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-bynlegreen-600 sm:text-sm sm:leading-6"
                  >
                    {timeOptions.minutes.map((minute) => (
                      <option key={minute}>{minute}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price of Ticket
              </label>

              <div
                className={classNames(
                  freeEvent ? "hidden" : "block",
                  "relative mt-2 rounded-md shadow-sm mb-2"
                )}
              >
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <span className="text-gray-500 sm:text-sm">$</span>
                </div>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={eventData.price}
                  onChange={handleChange}
                  className="block w-full rounded-md border-0 py-1.5 pl-7 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bynlegreen-600 sm:text-sm sm:leading-6 "
                  placeholder="0.00"
                  aria-describedby="price-currency"
                  disabled={!isStripeCompleted} // Disable the input if not connected
                />
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
                  <span
                    className="text-gray-500 sm:text-sm"
                    id="price-currency"
                  >
                    EUR
                  </span>
                </div>
              </div>

              {/* Display a message based on stripe_connected status */}
              {isStripeConnected ? (
                <div>
                  {isStripeCompleted ? (
                    <p className="text-sm text-green-500 mt-1">
                      Club set up with stripe
                    </p>
                  ) : (
                    <div>
                      <p className="text-sm text-red-500 mt-1">
                        Club needs to complete stripe setup.
                      </p>
                      {/* Add a button to redirect to Edit Club Page */}
                      <button
                        className="text-sm text-blue-500 underline mt-1"
                        onClick={() => {
                          // Redirect to the Edit Club Page
                          navigate(`/club-settings/edit-club/${clubId}`);
                        }}
                      >
                        Go to Edit Club Page
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-sm text-red-500 mt-1">
                    Club needs to setup stripe for payments
                  </p>
                  {/* Add a button to redirect to Edit Club Page */}
                  <button
                    className="text-sm text-blue-500 underline mt-1"
                    onClick={() => {
                      // Redirect to the Edit Club Page
                      navigate(`/club-settings/edit-club/${clubId}`);
                    }}
                  >
                    Go to Edit Club Page
                  </button>
                </div>
              )}

              <Switch.Group as="div" className="flex items-center mt-2">
                <Switch
                  checked={freeEvent}
                  onChange={setFreeEvent}
                  className={classNames(
                    freeEvent ? "bg-bynlegreen-600" : "bg-gray-200",
                    "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-bynlegreen-600 focus:ring-offset-2"
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={classNames(
                      freeEvent ? "translate-x-5" : "translate-x-0",
                      "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
                    )}
                  />
                </Switch>
                <Switch.Label as="span" className="ml-3 text-sm">
                  <span className="font-medium text-gray-900">
                    {freeEvent ? "Yessir, it's free" : "Is the Event Free?"}
                  </span>{" "}
                </Switch.Label>
              </Switch.Group>
            </div>
            <div className="sm:col-span-3">
              <label
                htmlFor="event_type"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Event Type
              </label>
              <select
                id="event_type"
                name="event_type"
                value={typeOfEvent}
                onChange={(e) => setTypeOfEvent(e.target.value)}
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-bynlegreen-600 sm:text-sm sm:leading-6"
              >
                {event_choices.map((event_choice) => (
                  <option key={event_choice.label}>{event_choice.label}</option>
                ))}
              </select>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="event-cover"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Event Cover
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <input
                  id="event-cover"
                  name="event-cover"
                  type="file"
                  onChange={handleCoverChange}
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  accept="image/png, image/jpeg, image/jpg"
                />
              </div>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Event Description
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-bynlegreen-600 sm:text-sm sm:leading-6"
                  value={eventData.description}
                  onChange={handleChange}
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write about the Event, what is going to happen and who it's for.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-end gap-x-6">
        <a href="/">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
        </a>
        <button
          type="submit"
          className="rounded-md bg-bynlegreen-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-bynlegreen-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-bynlegreen-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}

export default CreateEvent;
