import React from "react";
import { Outlet } from "react-router-dom";

const AnonymousLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AnonymousLayout;
