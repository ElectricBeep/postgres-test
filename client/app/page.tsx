import axios from "axios"
import UsersList from "./components/UsersList";
import { User } from "@/types";

export default async function Home() {
  const getUsers = async (): Promise<User[]> => {
    try {
      const res = await axios.get(`${process.env.BASE_URL}/api/users`);
      return (res.data as any) || [];

    } catch (error) {
      console.log(error);
      return [];
    }
  }

  const users = await getUsers();

  return (
    <div className="w-[1440px] mx-auto py-10">
      <UsersList users={users} />
    </div>
  )
}
