import axios from "axios"
import UsersList from "./components/UsersList";
import { User } from "@/types";

export default async function Home() {
  const getUsers = async (): Promise<User[]> => {
    try {
      const res = await axios.get("http://localhost:3000/api/users");
      return (res.data as any) || [];

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const users = await getUsers();

  return (
    <>
      <UsersList users={users} />
    </>
  )
}
