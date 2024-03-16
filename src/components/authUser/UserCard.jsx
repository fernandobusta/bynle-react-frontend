import {
  UserCircleIcon,
  AtSymbolIcon,
  CheckBadgeIcon,
} from "@heroicons/react/20/solid";
import { Link } from "react-router-dom";

export default function UserCard(props) {
  return (
    <div className="lg:col-start-3 lg:row-end-1">
      <h2 className="sr-only">Summary</h2>
      <div className="rounded-lg bg-gray-50 shadow-sm ring-1 ring-gray-900/5">
        <dl className="flex flex-wrap">
          <div className="flex-auto pl-6 pt-6">
            <dt className="text-base font-semibold leading-6 text-gray-900">
              {props.profile.full_name}
            </dt>
            <dd className="mt-1 text-sm font-semibold leading-6 text-gray-900">
              {props.profile.course} {props.profile.year} -
              {(props.profile.student_id && ` ${props.profile.student_id}`) ||
                " No ID"}
            </dd>
          </div>
          <div className="flex-none self-end px-6 pt-4">
            <dt className="sr-only">Permissions</dt>
            {(props.profile.verified && (
              <CheckBadgeIcon
                className="h-6 w-5 text-green-400"
                aria-hidden="true"
              />
            )) || (
              <dd className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20">
                Not Verified
              </dd>
            )}
          </div>
          <div className="mt-6 flex w-full flex-none gap-x-4 border-t border-gray-900/5 px-6 pt-6">
            <dt className="flex-none">
              <span className="sr-only">User</span>
              <UserCircleIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm font-medium leading-6 text-gray-900">
              {props.profile.username}
            </dd>
          </div>
          <div className="mt-4 flex w-full flex-none gap-x-4 px-6">
            <dt className="flex-none">
              <span className="sr-only">Email</span>
              <AtSymbolIcon
                className="h-6 w-5 text-gray-400"
                aria-hidden="true"
              />
            </dt>
            <dd className="text-sm leading-6 text-gray-500">
              {props.profile.email}
            </dd>
          </div>
        </dl>
        {/* Either Change details or See other students, or nothing at all, placeholder atm */}
        <div className="mt-6 border-t border-gray-900/5 px-6 py-6">
          <Link
            to="edit"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Change Details <span aria-hidden="true">&rarr;</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
