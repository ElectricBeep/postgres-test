import { User } from "@/types";
import { FC } from "react"

interface UsersListProps {
  users: User[]
}

const UsersList: FC<UsersListProps> = ({ users }) => {
  if (users.length === 0) {
    return (
      <div className="mt-4 text-neutral-400">
        No users found.
      </div>
    )
  }
  return (
    <div>
      {users?.map((user) => (
        <div>{user.email}</div>
      ))}
    </div>
  )
}

export default UsersList;