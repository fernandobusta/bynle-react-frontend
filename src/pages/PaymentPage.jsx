import { useEffect, useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
import { useParams } from "react-router-dom";
import useAxios from "../utils/useAxios";
import FancyCard from "../components/coolComponents/FancyCard";
import AuthContext from "../context/AuthContext";
import { Link } from "react-router-dom";

const stripePromise = loadStripe(
  "pk_test_51OU7wPA0q2qWiYPCRhxSjkEM672GuI1Iy7F2Ds50GkholpkUrGl6XlIcyq0s6C6bfqoHUGQWuHCcD08R2ZdfhJeT00XDeTKSpy"
);

export default function PaymentPage() {
  const { eventId } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const [event, setEvent] = useState([]);
  const [soldOut, setSoldOut] = useState(null);
  const [hasTicket, setHasTicket] = useState(null);
  const api = useAxios();
  const { user } = useContext(AuthContext);

  // Getting event data
  useEffect(() => {
    api
      .get(`/api/events/${eventId}`)
      .then((res) => {
        setEvent(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [eventId]);

  // Check if the event has sold out
  useEffect(() => {
    api
      .get(`event/${eventId}/soldout/`)
      .then((res) => {
        setSoldOut(res.data.sold_out);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [eventId]);

  // Check if the user already has a ticket for the event
  useEffect(() => {
    if (user) {
      api
        .get(`user/${user.user_id}/has-ticket-for-event/${eventId}/`)
        .then((res) => {
          setHasTicket(res.data.has_ticket);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, [user.user_id, eventId]);

  // Creating checkout session, getting the client secret
  useEffect(() => {
    api
      .post(`/api/create-checkout-session/`, {
        eventId,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        console.error("Error creating checkout session:", error);
      });
  }, [eventId]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  const showOnAvailable = (soldOut, hasTicket) => {
    if (!soldOut && !hasTicket) {
      return (
        <div>
          {clientSecret && (
            <div className="lg:col-start-2 lg:row-start-1 lg:self-start pb-5 lg:pb-0">
              <Elements options={options} stripe={stripePromise}>
                <CheckoutForm event={event} soldOut={soldOut} />
              </Elements>
            </div>
          )}{" "}
        </div>
      );
    } else {
      if (hasTicket) {
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              You already have a ticket for this event
            </h1>
          </div>
        );
      } else if (soldOut) {
        return (
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              This event is sold out
            </h1>
            {/* button to go back home */}
            <Link
              to="/"
              className="mt-4 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded"
            >
              Go back home
            </Link>
          </div>
        );
      }
    }
  };
  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-x-8 lg:px-8 place-items-center">
      {/* Checkout Form */}
      {showOnAvailable(soldOut, hasTicket)}
      <div className="flex items-center justify-center">
        <div className="mt-4 lg:mt-0 sm:w-96 w-80 rounded-lg border border-gray-200 bg-white shadow-sm ">
          <div className="flex items-center justify-center my-4">
            <FancyCard event={event} />
          </div>
          <dl className="space-y-6 border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flex items-center justify-between">
              <dt className="text-sm">Subtotal</dt>
              <dd className="text-sm font-medium text-gray-900">
                {event.price} €
              </dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-sm">Service</dt>
              <dd className="text-sm font-medium text-gray-900">0 €</dd>
            </div>

            <div className="flex items-center justify-between border-t border-gray-200 pt-6">
              <dt className="text-base font-medium">Total</dt>
              <dd className="text-base font-medium text-gray-900">
                {event.price} €
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}
