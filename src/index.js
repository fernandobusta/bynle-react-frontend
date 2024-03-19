import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";

import "./styles/fancytitle.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layouts
import AnonymousLayout from "./layouts/AnonymousLayout";
import MainLayout from "./layouts/MainLayout";
import TransferNavbar from "./layouts/TransferNavbar";
import ClubAdminSidebar from "./layouts/ClubAdminSidebar";

// Protected routes
import { ProtectedRoute } from "./routes/ProtectedRoute";
import { ClubAdminRoute } from "./routes/ClubAdminRoute";

// Auth provider
import { AuthProvider } from "./hooks/useAuth";

// Error page
import ErrorPage from "./pages/Errors";

// Pages
import Login from "./pages/Auth/Login";
import Landing from "./pages/Landing";
import Register from "./pages/Auth/Register";

// Authenticated pages
import Home from "./pages/Home";
import Clubs from "./pages/Clubs";
import Club from "./pages/Clubs/Club";
import CreateClub from "./pages/Clubs/CreateClub";
import Profile from "./pages/Profile";
import EditProfile from "./pages/Profile/EditProfile";
import Events from "./pages/Events";
import Event from "./pages/Events/Event";
import EventPayment from "./pages/Events/EventPayment";
import Friends from "./pages/Friends";
import PublicProfile from "./pages/Friends/PublicProfile";

// Tickets
import Tickets from "./pages/Tickets";
import Ticket from "./pages/Tickets/Ticket";
// Transfers
import TransferTicket from "./pages/Tickets/TransferTicket";
import TransferPayment from "./pages/Tickets/TransferPayment";
import StripeTransfer from "./pages/Tickets/StripeTransfer";
import SentTransfers from "./pages/Tickets/SentTransfers";
import ReceivedTransfers from "./pages/Tickets/ReceivedTransfers";

// Club Admins
import EditClub from "./pages/Clubs/Admins/EditClub";
import EditMedia from "./pages/Clubs/Admins/EditMedia";
import Admins from "./pages/Clubs/Admins";
import ManageEvents from "./pages/Clubs/Admins/ManageEvents";
import ManageAdmins from "./pages/Clubs/Admins/ManageAdmins";
import StripeClub from "./pages/Clubs/Admins/StripeClub";
import CreateEvent from "./pages/Clubs/Admins/CreateEvent";
import Stats from "./pages/Clubs/Stats";

// Stripe and success pages
import StripeSuccess from "./pages/StripeSuccess/StripeSuccessPage";
import EventPaidSuccess from "./pages/Events/EventPaidSuccess";
import StripeSuccessUser from "./pages/Tickets/StripeSuccessUser";
import StripeTransferSuccess from "./pages/Tickets/StripeTransferSuccess";
import SuccessPage from "./pages/SuccessPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            index: true,
            element: <Home />,
          },
          {
            path: "profile",
            children: [
              {
                index: true,
                element: <Profile />,
              },
              {
                path: "edit",
                element: <EditProfile />,
              },
            ],
          },
          {
            path: "clubs",
            children: [
              {
                index: true,
                element: <Clubs />,
              },
              {
                path: "create",
                element: <CreateClub />,
              },
              {
                path: ":clubId",
                children: [
                  {
                    index: true,
                    element: <Club />,
                  },
                ],
              },
            ],
          },
          {
            path: "events",
            children: [
              {
                index: true,
                element: <Events />,
              },
              {
                path: ":eventId",
                children: [
                  {
                    index: true,
                    element: <Event />,
                  },
                  {
                    path: "payment",
                    element: <EventPayment />,
                  },
                  {
                    path: "success",
                    element: <EventPaidSuccess />,
                  },
                ],
              },
            ],
          },
          {
            path: "tickets",
            children: [
              {
                index: true,
                element: <Tickets />,
              },
              {
                path: "stripe-success-user/:userId",
                element: <StripeSuccessUser />,
              },
              {
                path: "stripe-success-transfer-payment/:transferId",
                element: <StripeTransferSuccess />,
              },
            ],
          },
          {
            element: <TransferNavbar />,
            path: "transfer",
            children: [
              {
                path: "ticket",
                element: <TransferTicket />,
              },
              {
                path: "stripe",
                element: <StripeTransfer />,
              },
              {
                path: "sent",
                element: <SentTransfers />,
              },
              {
                path: "received",
                element: <ReceivedTransfers />,
              },
              {
                path: ":transferRequestId/payment",
                element: <TransferPayment />,
              },
            ],
          },
          {
            path: "friends",
            element: <Friends />,
          },
          {
            path: "users/:username",
            element: <PublicProfile />,
          },
        ],
      },
      {
        // Should be only accessible on navigate
        path: "success",
        element: <SuccessPage />,
      },
      {
        // Outside of MainLayout
        path: "tickets/:ticketId",
        element: <Ticket />,
      },
    ],
  },
  {
    path: "/clubs/:clubId/admins",
    element: <ClubAdminRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        element: <ClubAdminSidebar />,
        children: [
          {
            index: true,
            element: <Admins />,
          },
          {
            path: "edit",
            element: <EditClub />,
          },
          {
            path: "edit-media",
            element: <EditMedia />,
          },
          {
            path: "manage-events",
            element: <ManageEvents />,
          },
          {
            path: "manage-admins",
            element: <ManageAdmins />,
          },
          {
            path: "stripe",
            element: <StripeClub />,
          },
          {
            path: "create-event",
            element: <CreateEvent />,
          },
          {
            path: "stats",
            element: <Stats />,
          },
        ],
      },
      {
        path: "stripe-successful",
        element: <StripeSuccess />,
      },
    ],
  },
  {
    element: <AnonymousLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "landing",
        element: <Landing />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
