import React, { useState, useEffect, useContext } from "react";
import Navbar from "../../components/scanner/Navbar";
import useAxios from "../../utils/useAxios";
import TicketsTable from "../../components/scanner/TicketsTable";
import { Container } from "../../components/globals/Container";

function ScannerTickets() {
  const api = useAxios();
  const [receivedData, setReceivedData] = useState(false);
  const [active_tickets, setActiveTickets] = useState([]);
  const [used_tickets, setUsedTickets] = useState([]);
  const [refunded_tickets, setRefundedTickets] = useState([]);
  const [cancelled_tickets, setCancelledTickets] = useState([]);

  // Get tickets from the event assigned to scanner
  useEffect(() => {
    api
      .get("scanner/event-tickets/")
      .then((res) => {
        setActiveTickets(res.data.active_tickets);
        setUsedTickets(res.data.used_tickets);
        setRefundedTickets(res.data.refunded_tickets);
        setCancelledTickets(res.data.cancelled_tickets);
        setReceivedData(true);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <Navbar activeTab="Tickets" />
      <Container xpadding={" "}>
        {receivedData === true && (
          <TicketsTable
            active_tickets={active_tickets}
            used_tickets={used_tickets}
            refunded_tickets={refunded_tickets}
            cancelled_tickets={cancelled_tickets}
          />
        )}
      </Container>
    </div>
  );
}

export default ScannerTickets;
