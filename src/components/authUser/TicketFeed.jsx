import { Link } from "react-router-dom";
import {
  CheckIcon,
  HandThumbUpIcon,
  XCircleIcon,
  ReceiptRefundIcon,
} from "@heroicons/react/20/solid";

export default function TicketFeed(props) {
  return (
    <div className={`flow-root ${props.className}`}>
      <ul className="-mb-8">
        {props.tickets.map((ticket, itemId) => (
          <li key={itemId}>
            <div className="relative pb-8">
              {itemId !== props.tickets.length - 1 ? (
                <span
                  className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                />
              ) : null}
              <div className="relative flex space-x-3">
                <div>
                  {ticket.status === "A" ? (
                    <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-green-500">
                      <CheckIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  ) : ticket.status === "C" ? (
                    <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-red-500">
                      <XCircleIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  ) : ticket.status === "R" ? (
                    <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-gray-400">
                      <ReceiptRefundIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  ) : ticket.status === "U" ? (
                    <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-blue-500">
                      <HandThumbUpIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  ) : (
                    <span className="h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-green-500">
                      <CheckIcon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </span>
                  )}
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <Link to={`tickets/${ticket.id}`}>
                      <p className="text-sm text-gray-500">{ticket.title}</p>
                    </Link>
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-gray-500">
                    {ticket.status === "A" ? (
                      <p>Active</p>
                    ) : ticket.status === "C" ? (
                      <p>Cancelled</p>
                    ) : ticket.status === "R" ? (
                      <p>Refunded</p>
                    ) : ticket.status === "U" ? (
                      <p>Used</p>
                    ) : (
                      <p>Unknown status</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
