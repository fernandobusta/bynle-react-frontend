import {
  ExclamationTriangleIcon,
  XCircleIcon,
  CheckCircleIcon,
  XMarkIcon,
  InformationCircleIcon,
} from "@heroicons/react/20/solid";

function WarningAlert(props) {
  return (
    <div className={props.classNames}>
      <div className="rounded-md bg-yellow-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <ExclamationTriangleIcon
              className="h-5 w-5 text-yellow-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              {props.title}
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>{props.message}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ErrorAlert(props) {
  return (
    <div className={props.classNames}>
      <div className="rounded-md bg-red-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <XCircleIcon className="h-5 w-5 text-red-400" aria-hidden="true" />
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">{props.title}</h3>
            <div className="mt-2 text-sm text-red-700">{props.message}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SuccessAlert(props) {
  return (
    <div className={props.classNames}>
      <div className="rounded-md bg-green-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <CheckCircleIcon
              className="h-5 w-5 text-green-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-green-800">{props.title}</p>
          </div>
          <div className="ml-auto pl-3">
            <div className="-mx-1.5 -my-1.5">
              <button
                type="button"
                className="inline-flex rounded-md bg-green-50 p-1.5 text-green-500 hover:bg-green-100 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2 focus:ring-offset-green-50"
              >
                <span className="sr-only">Dismiss</span>
                <XMarkIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InformationAlert(props) {
  return (
    <div className={props.classNames}>
      <div className="rounded-md bg-blue-50 p-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <InformationCircleIcon
              className="h-5 w-5 text-blue-400"
              aria-hidden="true"
            />
          </div>
          <div className="ml-3 flex-1 md:flex md:justify-between">
            <p className="text-sm text-blue-700">{props.message}</p>

            {props.moreInfo && (
              <p className="mt-3 text-sm md:ml-6 md:mt-0">
                <button className="whitespace-nowrap font-medium text-blue-700 hover:text-blue-600">
                  More Info
                  <span aria-hidden="true"> &rarr;</span>
                </button>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export { WarningAlert, ErrorAlert, SuccessAlert, InformationAlert };
