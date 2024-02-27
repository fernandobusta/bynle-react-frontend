import { useEffect, useState, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutUserForm from "../components/CheckoutUserForm";
import { Container } from "../components/globals/Container";
import { useParams } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import useAxios from "../utils/useAxios";

const stripePromise = loadStripe(
  "pk_test_51OU7wPA0q2qWiYPCRhxSjkEM672GuI1Iy7F2Ds50GkholpkUrGl6XlIcyq0s6C6bfqoHUGQWuHCcD08R2ZdfhJeT00XDeTKSpy"
);

export default function TransferPaymentPage() {
  const { user } = useContext(AuthContext);

  const { transferRequestId } = useParams();
  const [clientSecret, setClientSecret] = useState("");
  const [transfer, setTransferRequest] = useState([]);
  const [canAccept, setCanAccept] = useState(null);
  const api = useAxios();

  // Get if the user can accept the transfer
  useEffect(() => {
    if (transferRequestId) {
      api
        .get(`user/${user.user_id}/can-accept-transfer/${transferRequestId}`)
        .then((response) => {
          setCanAccept(response.data.can_accept_transfer);
        })
        .catch((error) => {
          console.error("Error fetching transfer details:", error);
        });
    }
  }, [transferRequestId]);

  useEffect(() => {
    if (transferRequestId) {
      api
        .get(`/api/transfer_requests/${transferRequestId}`)
        .then((response) => {
          setTransferRequest(response.data);
        })
        .catch((error) => {
          console.error("Error fetching transfer details:", error);
        });
    }
  }, [transferRequestId]);

  useEffect(() => {
    api
      .post(`api/create-user-checkout-session/`, {
        transferRequestId,
      })
      .then((res) => {
        // Set the client secret from the server response
        setClientSecret(res.data.clientSecret);
      })
      .catch((error) => {
        console.error("Error creating checkout session:", error);
      });
  }, [transferRequestId]);

  const appearance = {
    theme: "stripe",
  };
  const options = {
    clientSecret,
    appearance,
  };

  // Only show the form if the user can accept the transfer
  const showOnAcceptance = () => {
    if (canAccept && clientSecret) {
      return (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutUserForm transfer={transfer} />
        </Elements>
      );
    } else {
      return (
        <div>
          <h2>You cannot accept this transfer.</h2>
        </div>
      );
    }
  };

  return (
    <Container>
      <div className="bg-white">
        {/* Checkout Form */}
        {showOnAcceptance()}
      </div>
    </Container>
  );
}
