import React, { useState, useEffect, useContext } from "react";
import { WarningAlert, ErrorAlert, SuccessAlert } from "../alerts/Alert";
import AuthContext from "../../context/AuthContext";
import useAxios from "../../utils/useAxios";
import { PlusCircleIcon } from "@heroicons/react/20/solid";
import SpinningMouse from "../../components/coolComponents/SpinningMouse";
const swal = require("sweetalert2");

function StripeConnectUserForm(props) {
  const { user } = useContext(AuthContext);
  const { userId } = user.user_id;
  const api = useAxios();
  const [isLoading, setIsLoading] = useState(false);
  const [isStripeConnected, setIsStripeConnected] = useState(null);
  const [isStripeCompleted, setIsStripeCompleted] = useState(null);
  const [stripeAccountIncompleteLink, setStripeAccountIncompleteLink] =
    useState(false);

  useEffect(() => {
    // Check if the user is connected to Stripe (if so, is it completed?)
    api.get(`/stripe-status-user/${user.user_id}`).then((res) => {
      setIsStripeConnected(res.data.stripe_connected);
      setStripeAccountIncompleteLink(res.data.account_link_url);
    });
  }, [userId]);

  useEffect(() => {
    if (isStripeConnected) {
      api
        .get(`/stripe-account/user/${user.user_id}/`)
        .then((res) => {
          setIsStripeCompleted(res.data.stripe_complete);
        })

        .catch((error) => {
          console.error("Error fetching user information: ", error);
        });
    }
  }, [user.user_id, isStripeConnected]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!isStripeConnected) {
      setIsLoading(true);
      api
        .get(`/create-stripe-account-express/${user.user_id}`)
        .then((res) => {
          window.location.href = res.data.account_link_url;
        })

        .catch((err) => {
          console.log(err);
          if (err.response && err.response.data.message) {
            swal.fire({
              title: "Could not create account",
              text: err.response.data.message,
              icon: "error",
              toast: true,
              timer: 3000,
              position: "top-right",
              timerProgressBar: true,
              showConfirmButton: false,
            });
          }
        });
    } else {
      if (!isStripeCompleted) {
        window.location.href = stripeAccountIncompleteLink;
      }
    }
  };

  const stripeAlerts = () => {
    if (isStripeConnected === false) {
      return (
        <div>
          <ErrorAlert
            title="Stripe not connected"
            message="Please connect your stripe account to continue"
          />
          <button
            onClick={handleClick}
            className="mt-5 inline-flex ring-blue-600 justify-center px-3 py-2 rounded-full ring-1 ring-inset bg-blue-50 text-sm font-semibold shadow-sm hover:bg-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
          >
            <PlusCircleIcon
              className="-ml-0.5 mr-1.5 h-5 w-5 text-blue-600"
              aria-hidden="true"
            />
            <span className="text-blue-700">Create Stripe Account</span>
          </button>
        </div>
      );
    } else if (isStripeConnected === null) {
      return <div>Loading...</div>;
    } else {
      return (
        <div>
          {isStripeCompleted ? (
            <div>
              <SuccessAlert title="Stripe Account Complete" />
              <p className="mt-5">
                Stripe is used to transer tickets between users. Only tickets
                that were purchased for more than 0 Euros will require a user to
                setup a Stripe account. If you plan to transfer tickets for
                free, you do not need to setup a Stripe account.
              </p>
            </div>
          ) : (
            <div>
              <WarningAlert
                title="Stripe Accouny Incomplete"
                message="Please complete your stripe account to continue."
              />
              <button
                onClick={handleClick}
                className="mt-5 inline-flex ring-blue-600 justify-center px-3 py-2 rounded-full ring-1 ring-inset bg-blue-50 text-sm font-semibold shadow-sm hover:bg-blue-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-700"
              >
                <PlusCircleIcon
                  className="-ml-0.5 mr-1.5 h-5 w-5 text-blue-600"
                  aria-hidden="true"
                />
                <span className="text-blue-700">Complete Stripe Account</span>
              </button>
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div>
      {isLoading ? <SpinningMouse title="Loading Stripe..." /> : stripeAlerts()}
    </div>
  );
}

export default StripeConnectUserForm;
