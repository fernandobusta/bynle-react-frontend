import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import logo from "../../images/bynle-high-resolution-logo-black-transparent.png";
import NotAllowed from "../NotAllowed";

function Registerpage() {
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [student_id, setStudentId] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [account_type, setAccountType] = useState("Public");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");

  const { registerUser } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Change value for account_type (PUB: Public, PRI: Private, CLO: Closed)
    let ac_type = "";
    if (account_type === "Public") {
      ac_type = "PUB";
    } else if (account_type === "Private") {
      ac_type = "PRI";
    } else {
      ac_type = "CLO";
    }
    registerUser(
      email,
      username,
      student_id,
      first_name,
      last_name,
      course,
      year,
      description,
      ac_type,
      password,
      password2
    );
  };

  return (
    <>
      {user == null ? (
        <div className="flex justify-center px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
          <div className="mx-auto w-full">
            <div className="flex items-stretch">
              <img
                className="h-20 sm:h-30 sm:w-24 w-24 object-cover place-self-center"
                src={logo}
                alt="Bynle"
              />
              <div className="pl-4">
                <h2 className="mt-4 text-4xl font-bold leading-9 tracking-tight text-gray-900">
                  Create an Account
                </h2>
                <p className="mt-2 text-lg leading-6 text-gray-500">
                  Are you a member?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 mt-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                <div className="grid grid-cols-1 gap-y-4">
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      DCU Email address
                    </label>
                    <div className="mt-2">
                      <input
                        id="email"
                        name="email"
                        type="email"
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="account_type"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Account Type
                    </label>
                    <select
                      id="account_type"
                      name="account_type"
                      className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      onChange={(e) => setAccountType(e.target.value)}
                    >
                      <option>Public</option>
                      <option>Private</option>
                      <option>Closed</option>
                    </select>
                  </div>
                  <div>
                    <label
                      htmlFor="first_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      First Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="first_name"
                        name="first_name"
                        type="name"
                        required
                        onChange={(e) => setFirstName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="last_name"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Last Name
                    </label>
                    <div className="mt-2">
                      <input
                        id="last_name"
                        name="last_name"
                        type="name"
                        required
                        onChange={(e) => setLastName(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password"
                        name="password"
                        type="password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                    <div className="mt-2">
                      <input
                        id="password2"
                        name="password2"
                        type="password"
                        required
                        onChange={(e) => setPassword2(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-y-4">
                  <div>
                    <label
                      htmlFor="username"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Username
                    </label>
                    <div className="mt-2">
                      <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="student_id"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Student Id
                    </label>
                    <div className="mt-2">
                      <input
                        id="student_id"
                        name="student_id"
                        type="number"
                        required
                        onChange={(e) => setStudentId(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="course"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Course
                    </label>
                    <div className="mt-2">
                      <input
                        id="course"
                        name="course"
                        type="text"
                        required
                        onChange={(e) => setCourse(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="year"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Year
                    </label>
                    <div className="mt-2">
                      <input
                        id="year"
                        name="year"
                        type="number"
                        required
                        onChange={(e) => setYear(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>
                  <div className="col-span-full">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Bio
                    </label>
                    <div className="mt-2">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        required
                        onChange={(e) => setDescription(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        defaultValue={""}
                      />
                    </div>
                    <p className="mt-3 text-sm leading-6 text-gray-600">
                      Write a few sentences about yourself.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <NotAllowed
          title="You're already a user!"
          message="Relax will ya, you're already a user."
          reason="Why you trying to register if you're logged in man relax?"
        />
      )}
    </>
  );
}

export default Registerpage;
