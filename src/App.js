import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { PrivateRoute, PrivateRouteForScanners } from "./utils/PrivateRoute";
import { AuthProvider } from "./context/AuthContext";

import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/authUser/ProfilePage";
import EventSinglePage from "./pages/EventSinglePage";
import PaymentPage from "./pages/PaymentPage";
import ClubProfilePage from "./pages/ClubProfilePage";
import ClubsPage from "./pages/ClubsPage";
import EventsPage from "./pages/EventsPage";
import MyTicketsPage from "./pages/MyTicketsPage";
import CreateEventPage from "./pages/admin/CreateEventPage";
import CreateClubPage from "./pages/CreateClubPage";
import SuccessPage from "./pages/SuccessPage";
import TicketPage from "./pages/TicketPage";
import TransferPage from "./pages/transfers/TransferPage";
import Landing from "./pages/Landing";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/user/RegisterPage";
import NotFound from "./pages/NotFound";
import FriendsPage from "./pages/FriendsPage";
import StripeSuccessPage from "./pages/StripeSuccessPage";
import StripeSuccessUserPage from "./pages/StripeSuccessUser";
import SuccessPaymentPage from "./pages/StripePaymentSucess";
import PublicUserProfilePage from "./pages/PublicUserProfilePage";
import TransferPaymentPage from "./pages/TransferPaymentPage";
import StripeTransferSuccessPage from "./pages/StripeTransferSuccessPage";
import EditProfilePage from "./pages/authUser/EditProfilePage";

import "./styles/fancytitle.css";
import "./styles/rotationpile.css";
// Club Settings
import ClubEditPage from "./pages/admin/ClubEditPage";
import ClubEditMediaPage from "./pages/admin/ClubEditMediaPage";
import ClubStripePage from "./pages/admin/ClubStripePage";
import ClubAdminsPage from "./pages/admin/ClubAdminsPage";
import ClubManageEventsPage from "./pages/admin/ClubManageEventsPage";
import ScanTicketPage from "./pages/scanner/ScanTicketPage";
import ScannerLoginPage from "./pages/scanner/ScannerLoginPage";
import ScannerTicketsPage from "./pages/scanner/ScannerTicketsPage";
import ScannerEventPage from "./pages/scanner/ScannerEventPage";
import ClubStatsPage from "./pages/admin/ClubStatsPage";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/landing" element={<Landing />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/scanner-login" element={<ScannerLoginPage />} />
          <Route path="*" element={<NotFound />} />

          <Route element={<PrivateRoute />}>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/edit-profile" element={<EditProfilePage />} />
            <Route path="/club/:clubId" element={<ClubProfilePage />} />
            <Route path="/event/:eventId" element={<EventSinglePage />} />
            <Route path="/event/:eventId/payment" element={<PaymentPage />} />
            <Route path="/my-tickets/:ticketId" element={<TicketPage />} />
            <Route path="/my-tickets" element={<MyTicketsPage />} />
            {/* Transfer */}
            <Route path="/transfers-tickets/" element={<TransferPage />} />
            <Route
              path="/transfer/:transferRequestId/payment"
              element={<TransferPaymentPage />}
            />
            <Route
              path="/club/:clubId/create-event"
              element={<CreateEventPage />}
            />
            <Route path="my-friends" element={<FriendsPage />} />
            <Route path="user/:username" element={<PublicUserProfilePage />} />
            <Route path="/create-club" element={<CreateClubPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route
              path="/stripe-successful/:clubId"
              element={<StripeSuccessPage />}
            />
            <Route
              path="/stripe-payment-successful/:eventId"
              element={<SuccessPaymentPage />}
            />
            <Route
              path="/stripe-success-transfer-payment/:transferId"
              element={<StripeTransferSuccessPage />}
            />
            <Route
              path="/stripe-successful/user/:userId"
              element={<StripeSuccessUserPage />}
            />
            <Route path="/clubs" element={<ClubsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="*" element={<NotFound />} />

            {/* Club Settings - Club Admins */}
            <Route
              path="/club-settings/edit-club/:clubId"
              element={<ClubEditPage />}
            />
            <Route
              path="/club-settings/edit-club-media/:clubId"
              element={<ClubEditMediaPage />}
            />
            <Route
              path="/club-settings/stripe-settings/:clubId"
              element={<ClubStripePage />}
            />
            <Route
              path="/club-settings/manage-admins/:clubId"
              element={<ClubAdminsPage />}
            />
            <Route
              path="/club-settings/manage-events/:clubId"
              element={<ClubManageEventsPage />}
            />
          </Route>
          <Route
            path="/club-settings/club-stats/:clubId"
            element={<ClubStatsPage />}
          />
          <Route element={<PrivateRouteForScanners />}>
            <Route path="/scan-ticket" element={<ScanTicketPage />} />
            <Route path="/event-tickets" element={<ScannerTicketsPage />} />
            {/* <Route path="/event-details" element={<ScannerEventPage />} /> */}
          </Route>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
