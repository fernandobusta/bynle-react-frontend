import React from "react";
import { Link } from "react-router-dom";
import { SITE_URL } from "../components/Constants";
import clubLogo from "../images/default/default_club_logo.jpg";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

export default function ClubCarousel({ clubs }) {
  return (
    <Carousel
      responsive={responsive}
      ssr={true} // means to render carousel on server-side.
      infinite={true}
      containerClass="carousel-container"
      dotListClass="custom-dot-list-style"
      itemClass="carousel-item-padding-40-px"
      centerMode={true}
    >
      {clubs.map((club) => (
        <Link
          to={`${SITE_URL}/club/${club.id}`}
          key={club.id}
          className="grid justify-items-center mt-1"
        >
          <img
            className=" h-24 w-24 rounded-full ring-1 ring-white hover:ring-2 hover:ring-blue-900"
            src={club.club_logo || clubLogo}
            alt=""
          />
          <h3 className="mt-2 text-base font-semibold leading-7 tracking-tight text-gray-900">
            {club.name}
          </h3>
        </Link>
      ))}
    </Carousel>
  );
}
