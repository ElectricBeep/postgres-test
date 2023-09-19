import { User } from "@/types";
import { FC } from "react"

interface UsersListProps {
  users: User[]
}

const UsersList: FC<UsersListProps> = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className="mx-auto w-fit">
        Gettings users...
      </div>
    )
  }
  return (
    <>
      <div>
        {users?.map((user) => (
          <div key={user.id} className="mx-auto w-fit mt-4">
            <div> ID: {user.id}</div>
            <div>NAME: {user.name}</div>
            <div>EMAIL: {user.email}</div>
            <div>CREATED: {user.createdAt}</div>
          </div >
        ))}
      </div >
    </>
  )
}

export default UsersList;