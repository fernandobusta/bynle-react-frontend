import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Combobox } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import useAxios from "../hooks/useAxios";

function SearchUser() {
  const api = useAxios();
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (searchUser !== "") {
      api
        .get(`/usernames?username=${searchUser}`)
        .then((res) => {
          setUsers(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [searchUser]);

  return (
    <div className="relative flex flex-1">
      <Combobox as="div">
        <div className="relative flex flex-1 mt-6">
          <MagnifyingGlassIcon
            className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
            aria-hidden="true"
          />
          <Combobox.Input
            type="search"
            className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
            placeholder="Search friends...."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
          />
        </div>
        <div className="absolute z-10 w-full bg-white rounded-xl shadow-lg">
          <Combobox.Options className="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {users.map((user) => (
              <Combobox.Option
                key={user.username}
                value={user}
                className={({ active }) =>
                  `${
                    active ? "text-white bg-blue-400" : "text-gray-900 bg-white"
                  }
              cursor-pointer select-none relative py-2 pl-3 pr-9`
                }
                onClick={() => navigate(`users/${user.username}`)}
              >
                {user.username}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </div>
      </Combobox>
    </div>
  );
}

export default SearchUser;
