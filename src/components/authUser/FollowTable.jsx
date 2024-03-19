import { ChevronRightIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
import clubLogo from "../../images/default/default_club_logo.jpg";

export default function FollowTable(props) {
  return (
    <div className={`${props.className}`}>
      <ul
        role="list"
        className="divide-y divide-gray-100 overflow-hidden bg-white shadow-sm ring-1 ring-gray-900/5 sm:rounded-xl"
      >
        {props.clubs.map((club) => (
          <li
            key={club.id}
            className="relative flex justify-between gap-x-6 px-4 py-5 hover:bg-gray-50 sm:px-6"
          >
            <div className="flex min-w-0 gap-x-4">
              <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={club.club_logo || clubLogo}
                alt=""
              />
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  <a href={`clubs/${club.id}`}>
                    <span className="absolute inset-x-0 -top-px bottom-0" />
                    {club.name}
                  </a>
                </p>
                <p className="mt-1 flex text-xs leading-5 text-gray-500">
                  <a
                    href={`mailto:${club.email}`}
                    className="relative truncate hover:underline"
                  >
                    {club.email}
                  </a>
                </p>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-x-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                  Following
                </span>
              </div>
              <CheckCircleIcon className="sm:hidden flex h-5 w-5 text-green-500" />
              <ChevronRightIcon
                className="h-5 w-5 flex-none text-gray-400"
                aria-hidden="true"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
