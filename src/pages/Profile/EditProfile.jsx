import React, { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import { useAuth } from "../../hooks/useAuth";
import Container from "../../components/Container";
import { RadioGroup } from "@headlessui/react";
import { UserCircleIcon, CheckCircleIcon } from "@heroicons/react/20/solid";
const swal = require("sweetalert2");

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const accountOptions = [
  {
    id: 1,
    title: "Public Account",
    code: "PUB",
    description:
      "Anyone can see the events you are attending and your public profile.",
    users: "Meet new people!",
  },
  {
    id: 2,
    title: "Private Account",
    code: "PRI",
    description:
      "Only your friends can see the events you are attending. But your public profile is still visible.",
    users: "Just my friends!",
  },
  {
    id: 3,
    title: "Closed Account",
    code: "CLO",
    description:
      "Are you only here to buy tickets? With a closed account, no one can see your profile.",
    users: "Keep me hidden!",
  },
];

function EditProfile() {
  const api = useAxios();
  const { user } = useAuth();

  // Initial state
  const [initialState, setInitialState] = useState({
    profilePicture: null,
    birthday: "",
    course: "",
    year: 0,
    description: "",
  });
  // Current state
  const [profilePicture, setProfilePicture] = useState(null);
  const [birthday, setBirthday] = useState("");
  const [course, setCourse] = useState("");
  const [year, setYear] = useState(0);
  const [description, setDescription] = useState("");

  const [selectedAccountType, setSelectedAccountType] = useState("");

  // Get the account type of the user
  useEffect(() => {
    api
      .get(`/api/users/${user.user_id}/account_type/`)
      .then((res) => {
        setSelectedAccountType(
          accountOptions.find((a) => a.code === res.data.account_type)
        );
      })
      .catch((err) => {
        console.log(err);
      });
  }, [user.user_id]);

  const changeAccountType = (e) => {
    e.preventDefault();
    api
      .patch(`/api/users/${user.user_id}/change_account_type/`, {
        account_type: selectedAccountType.code,
      })
      .then((res) => {
        swal.fire({
          title: "Account changed successfully",
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
        console.log(res);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          swal.fire({
            title: "Could not change account",
            text: err.response.data.account_type,
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

  // If they cancel the form
  const handleCancel = () => {
    setProfilePicture(initialState.profilePicture);
    setBirthday(initialState.birthday);
    setCourse(initialState.course);
    setYear(initialState.year);
    setDescription(initialState.description);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if the state has changed
    if (
      initialState.profilePicture === profilePicture &&
      initialState.birthday === birthday &&
      initialState.course === course &&
      initialState.year === year &&
      initialState.description === description
    ) {
      return; // No changes, so return early
    }
    const data = new FormData();
    if (profilePicture) {
      data.append("profile_picture", profilePicture);
    }
    data.append("birthday", birthday);
    data.append("course", course);
    if (year !== 0) {
      data.append("year", parseInt(year));
    }
    data.append("description", description);
    console.log(data);
    api
      .put(`/api/profiles/${user.user_id}/`, data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        swal.fire({
          title: "Profile updated successfully",
          text: res.data.message,
          icon: "success",
          toast: true,
          timer: 3000,
          position: "top-right",
          timerProgressBar: true,
          showConfirmButton: false,
        });
        console.log(res);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          swal.fire({
            title: "Could not update Profile",
            text:
              err.response.data.birthday ||
              err.response.data.course ||
              err.response.data.year ||
              err.response.data.description ||
              err.response.data.profile_picture,
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

  const editAccountSelector = () => {
    return (
      <div className="mt-10">
        <RadioGroup
          value={selectedAccountType}
          onChange={setSelectedAccountType}
        >
          <RadioGroup.Label className="text-base font-semibold leading-6 text-gray-900">
            Edit Account Type
          </RadioGroup.Label>

          <div className="mt-4 grid grid-cols-1 gap-y-6 sm:grid-cols-3 sm:gap-x-4">
            {accountOptions.map((account) => (
              <RadioGroup.Option
                key={account.id}
                value={account}
                className={({ active }) =>
                  classNames(
                    active
                      ? "border-indigo-600 ring-2 ring-indigo-600"
                      : "border-gray-300",
                    "relative flex cursor-pointer rounded-lg border bg-white p-4 shadow-sm focus:outline-none"
                  )
                }
              >
                {({ checked, active }) => (
                  <>
                    <span className="flex flex-1">
                      <span className="flex flex-col">
                        <RadioGroup.Label
                          as="span"
                          className="block text-sm font-medium text-gray-900"
                        >
                          {account.title}
                        </RadioGroup.Label>
                        <RadioGroup.Description
                          as="span"
                          className="mt-1 flex items-center text-sm text-gray-500"
                        >
                          {account.description}
                        </RadioGroup.Description>
                        <RadioGroup.Description
                          as="span"
                          className="mt-6 text-sm font-medium text-gray-900"
                        >
                          {account.users}
                        </RadioGroup.Description>
                      </span>
                    </span>
                    <CheckCircleIcon
                      className={classNames(
                        !checked ? "invisible" : "",
                        "h-5 w-5 text-indigo-600"
                      )}
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        active ? "border" : "border-2",
                        checked ? "border-indigo-600" : "border-transparent",
                        "pointer-events-none absolute -inset-px rounded-lg"
                      )}
                      aria-hidden="true"
                    />
                  </>
                )}
              </RadioGroup.Option>
            ))}
          </div>
        </RadioGroup>
        <form onSubmit={changeAccountType}>
          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Update Account Type
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 border-b border-gray-900/10 pb-12 md:grid-cols-3">
          <div>
            <h2 className="text-base font-semibold leading-7 text-gray-900">
              Profile
            </h2>
            <p className="mt-1 text-sm leading-6 text-gray-600">
              This information will be displayed publicly so be careful what you
              share. Only the fields you fill will be modified.
            </p>
          </div>

          <div className="grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 md:col-span-2">
            <div className="sm:col-span-3">
              <label
                htmlFor="course"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Course
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="course"
                  id="course"
                  value={course}
                  onChange={(e) => setCourse(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="year"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Year
              </label>
              <div className="mt-2">
                <input
                  type="number"
                  name="year"
                  id="year"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Birthday
                <input
                  type="date"
                  value={birthday}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </label>
            </div>
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                About
              </label>
              <div className="mt-2">
                <textarea
                  id="description"
                  name="description"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <p className="mt-3 text-sm leading-6 text-gray-600">
                Write a few sentences about yourself.
              </p>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="photo"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Profile Picture
              </label>
              <div className="mt-2 flex items-center gap-x-3">
                <UserCircleIcon
                  className="h-12 w-12 text-gray-300"
                  aria-hidden="true"
                />
                <input
                  type="file"
                  className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file && file.size > 1024 * 1024) {
                      // file size in bytes
                      swal.fire({
                        title: "File too large",
                        text: "Profile picture should not be more than 1MB",
                        icon: "error",
                        toast: true,
                        timer: 3000,
                        position: "top-right",
                        timerProgressBar: true,
                        showConfirmButton: false,
                      });
                    } else {
                      setProfilePicture(file);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-6 flex items-center justify-end gap-x-6">
          <button
            type="button"
            onClick={handleCancel}
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Save
          </button>
        </div>
      </form>

      {editAccountSelector()}
      {/* <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
      <div>
        <h2 className="text-base font-semibold leading-7 text-black">
          Delete account
        </h2>
        <p className="mt-1 text-sm leading-6 text-gray-600">
          No longer want to use Bynle? You can delete your account here.
          This action is not reversible. All information related to this
          account will be deleted permanently.
        </p>
      </div>

      <form className="flex items-start md:col-span-2">
        <button className="rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-400">
          Yes, delete my account
        </button>
      </form>
    </div> */}
    </Container>
  );
}

export default EditProfile;
