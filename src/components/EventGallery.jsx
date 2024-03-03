import React from "react";
import { Link } from "react-router-dom";
import { SITE_URL } from "../components/Constants";
import eventCover from "../images/default/default_event_cover.jpg";
import clubLogo from "../images/default/default_club_logo.jpg";

export default function EventGallery(props) {
  return (
    <div className={`bg-white py-10 sm:py-10 ${props.className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            {props.title}
          </h2>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {props.events.map((event) => (
            <Link to={`${SITE_URL}/event/${event.id}`} key={event.id}>
              <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80 max-h-9">
                <img
                  src={event.event_cover || eventCover}
                  alt=""
                  className="absolute inset-0 -z-10 h-full w-full object-cover"
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

                <div className="items-center gap-y-1 text-sm leading-6 text-gray-300 grid">
                  <div>{event.location}</div>
                  <h3 className=" text-lg font-semibold leading-6 text-white">
                    <div>
                      <span className="absolute inset-0" />
                      {event.title}
                    </div>
                  </h3>
                  <div className="-ml-4 flex items-center gap-x-4">
                    <svg
                      viewBox="0 0 2 2"
                      className="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
                    >
                      <circle cx={1} cy={1} r={1} />
                    </svg>
                    <div className="flex gap-x-2.5">
                      <img
                        src={event.club_logo || clubLogo}
                        alt=""
                        className="h-6 w-6 flex-none rounded-full bg-white/10"
                      />
                    </div>
                    <time dateTime={event.date}>{event.date}</time>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
