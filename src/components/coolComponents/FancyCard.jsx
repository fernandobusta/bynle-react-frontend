import React from "react";
import "../../styles/fancycard.css";

// Source: https://uiverse.io/ElSombrero2/tricky-robin-67
function FancyCard({ event }) {
  return (
    <div class="fancycard-card">
      <div class="fancycard-content">
        <div class="fancycard-back">
          <div class="fancycard-back-content">
            <img
              src={event.event_cover}
              className="rounded-full object-cover w-24 h-24"
              alt="event"
            />
            <strong>{event.title}</strong>
          </div>
        </div>
        <div class="fancycard-front">
          <div class="fancycard-img">
            <div class="fancycard-circle"></div>
            <div class="fancycard-circle" id="fancycard-right"></div>
            <div class="fancycard-circle" id="fancycard-bottom"></div>
          </div>

          <div class="fancycard-front-content">
            <small class="fancycard-badge">{event.club_name}</small>
            <div class="fancycard-description">
              <div class="fancycard-title">
                <p class="fancycard-title">
                  <strong>{event.location}</strong>
                </p>
                <svg
                  fill-rule="nonzero"
                  height="15px"
                  width="15px"
                  viewBox="0,0,256,256"
                >
                  <g
                    text-anchor="none"
                    font-size="none"
                    font-weight="none"
                    font-family="none"
                    stroke-dashoffset="0"
                    stroke-dasharray=""
                    stroke-miterlimit="10"
                    stroke-linejoin="miter"
                    stroke-linecap="butt"
                    stroke-width="1"
                    stroke="none"
                    fill-rule="nonzero"
                    fill="#20c997"
                  >
                    <g transform="scale(8,8)">
                      <path d="M25,27l-9,-6.75l-9,6.75v-23h18z"></path>
                    </g>
                  </g>
                </svg>
              </div>
              <p class="fancycard-card-footer">
                {event.date} - {event.time}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FancyCard;
