import { Button } from "./components/ui/button";
import { trpc } from "./app";

export function Home() {
  const { data, isLoading, error } = trpc.sayHello.useQuery();

  console.log(data);

  return <Button>Button</Button>;
}

export default Home;
