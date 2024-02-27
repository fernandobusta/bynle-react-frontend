import React from "react";
import Html5QrcodePlugin from "../../components/scanner/Html5QrcodePlugin";
import useAxios from "../../utils/useAxios";
import Navbar from "../../components/scanner/Navbar";

const swal = require("sweetalert2");

function ScanTicketPage() {
  const api = useAxios();

  const validateTicket = (validationUrl) => {
    api
      .post(validationUrl)
      .then((response) => {
        if (response.status === 403) {
          console.log("You are not authorized to scan this ticket");
          swal.fire({
            title: "You are not authorized to scan this ticket",
            text: response.data.detail,
            icon: "error",
          });
        } else if (response.status === 200) {
          if (response.data.ticket_status === "active") {
            console.log("Ticket is valid");
            swal.fire({
              title: "Ticket is valid",
              text: `First Name: ${response.data.first_name}\nLast Name: ${
                response.data.last_name
              }\nStudent_id: ${response.data.student_id}\n${
                response.data.scanned_ago
                  ? "Scanned " + response.data.scanned_ago
                  : null
              }`,
              icon: "success",
            });
          } else if (response.data.ticket_status === "used") {
            console.log("Ticket has already been used");
            swal.fire({
              title: `Ticket has already been scanned.`,
              text: `Scanned ${response.data.scanned_ago}`,
              icon: "error",
            });
          } else {
            console.log("Ticket is not valid");
            swal.fire({
              title: "Ticket is not valid",
              icon: "error",
            });
          }
        } else {
          console.log("Ticket is not valid");
          swal.fire({
            title: "Ticket is not valid",
            icon: "error",
          });
        }
      })
      .catch((error) => {
        console.log(error);
        swal.fire({
          title: error.response.data.detail,
          icon: "error",
        });
      });
  };
  const onNewScanResult = (decodedText, decodedResult) => {
    // Validation for QR url
    // Must have REACT_APP_SITE_URL in the url
    if (!decodedText.includes(process.env.REACT_APP_API_URL)) {
      swal.fire({
        title: "Invalid QR code",
        text: "This QR code is not valid",
        icon: "error",
      });
      console.log("Invalid QR code");
    } else {
      validateTicket(decodedText);
    }
  };

  return (
    <div>
      <Navbar activeTab="Scanner" />
      <Html5QrcodePlugin
        fps={1}
        qrbox={250}
        disableFlip={false}
        qrCodeSuccessCallback={onNewScanResult}
      />
    </div>
  );
}

export default ScanTicketPage;
