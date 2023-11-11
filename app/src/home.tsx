import { Button } from "./components/ui/button";
import { trpc } from "./app";

export function Home() {
  const { data, isLoading, error } = trpc.sayHello.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="text-center">
      <h3>Home Route</h3>
      <p>{data.text}</p>
      <p>Date: {data.date}</p>
    </div>
  );
}

export default Home;
