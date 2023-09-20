import UsersList from "./components/UsersList";

export default async function Home() {
  return (
    <div className="w-[1440px] mx-auto py-10">
      <UsersList />
    </div>
  )
}
