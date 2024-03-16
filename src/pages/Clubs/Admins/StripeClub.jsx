import React, { useState, useEffect } from "react";
import { PlusCircleIcon } from "@heroicons/react/20/solid";

import { useParams } from "react-router-dom";

import useAxios from "../../../hooks/useAxios";

import {
  WarningAlert,
  ErrorAlert,
  SuccessAlert,
} from "../../../components/Alert";
import SpinningMouse from "../../../components/coolComponents/SpinningMouse";
const swal = require("sweetalert2");

function StripeClub() {
  const { clubId } = useParams();
  const api = useAxios();

  const [isLoading, setIsLoading] = useState(false);
  const [isStripeConnected, setIsStripeConnected] = useState(null);
  const [isStripeCompleted, setIsStripeCompleted] = useState(false);
  const [stripeAccountIncompleteLink, setStripeAccountIncompleteLink] =
    useState(false);

  useEffect(() => {
    // Check if the club is connected to Stripe (if so, is it completed?)
    api
      .get(`/stripe-status/${clubId}`)
      .then((res) => {
        setIsStripeConnected(res.data.stripe_connected);
        setStripeAccountIncompleteLink(res.data.account_link_url);
      })
      .catch((error) => {
        console.error("Error fetching club information: ", error);
      });
  }, [clubId]);

  useEffect(() => {
    if (isStripeConnected) {
      api
        .get(`/stripe-account/club/${clubId}/`)
        .then((res) => {
          setIsStripeCompleted(res.data.stripe_complete);
        })
        .catch((error) => {
          console.error("Error fetching club information: ", error);
        });
    }
  }, [clubId, isStripeConnected]);

  const handleClick = (e) => {
    e.preventDefault();
    if (!isStripeConnected) {
      LoadingStripe();
      setIsLoading(true);
    } else {
      if (!isStripeCompleted) {
        window.location.href = stripeAccountIncompleteLink;
      }
    }
  };

  const LoadingStripe = () => {
    api
      .get(`/create-stripe-account-custom/${clubId}`)
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
                Stripe Account Correctly Set Up. More to come soon...
              </p>
            </div>
          ) : (
            <div>
              <WarningAlert
                title="Stripe Account Incomplete"
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
    <>
      {isLoading ? (
        <>
          <SpinningMouse title="Loading Stripe..." />
        </>
      ) : (
        <div>{stripeAlerts()}</div>
      )}
    </>
  );
}

export default StripeClub;
