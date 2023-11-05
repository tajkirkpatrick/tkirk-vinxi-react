import { Button } from "./components/ui/button";
import { trpc } from "./app";

export function Home() {
  const { data, isLoading, error } = trpc.sayHello.useQuery();

  if (isLoading) return <div>Loading...</div>;

  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4">
      <Button
        onClick={() => {
          console.log(data.hello);
        }}
      >
        Button
      </Button>
    </div>
  );
}

export default Home;
