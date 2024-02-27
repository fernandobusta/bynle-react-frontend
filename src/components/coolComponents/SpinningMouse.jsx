import React from "react";
import "../../styles/spinningmouse.css";

// Code: https://uiverse.io/Nawsome/wet-mayfly-23
function SpinningMouse(props) {
  return (
    <div className="h-screen grid grid-rows-[20%_80%] place-items-center">
      {props.title && (
        <h1 className="font-bold text-2xl pt-20">{props.title}</h1>
      )}
      <div
        aria-label="Orange and tan hamster running in a metal wheel"
        role="img"
        className="wheel-and-hamster"
      >
        <div className="wheel"></div>
        <div className="hamster">
          <div className="hamster__body">
            <div className="hamster__head">
              <div className="hamster__ear"></div>
              <div className="hamster__eye"></div>
              <div className="hamster__nose"></div>
            </div>
            <div className="hamster__limb hamster__limb--fr"></div>
            <div className="hamster__limb hamster__limb--fl"></div>
            <div className="hamster__limb hamster__limb--br"></div>
            <div className="hamster__limb hamster__limb--bl"></div>
            <div className="hamster__tail"></div>
          </div>
        </div>
        <div className="spoke"></div>
      </div>
    </div>
  );
}

export default SpinningMouse;
