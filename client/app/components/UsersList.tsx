"use client";

import { User } from "@/types";
import axios from "axios";
import { useState } from "react";

const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getUsers = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get("https://test-6rtf.onrender.com/api/users");
      setUsers(res.data);

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col gap-5 items-center justify-center">
      <button
        onClick={getUsers}
        disabled={isLoading}
        className="bg-black text-white text-bold px-4 py-2 rounded-lg"
      >
        {isLoading ? "Loading..." : "Get Users"}
      </button>
      <div>
        {users.length === 0
          ? <div className="mx-auto w-fit">{isLoading ? "Loading..." : ""}</div>
          : users?.map((user: User) => (
            <div key={user.id} className="mx-auto w-fit mt-4">
              <div> ID: {user.id}</div>
              <div>NAME: {user.name}</div>
              <div>EMAIL: {user.email}</div>
              <div>CREATED: {user.createdAt}</div>
            </div>
          ))}
      </div >
    </div>
  )
}

export default UsersList;