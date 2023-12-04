import useSWR from "swr";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Service() {
  const router = useRouter();
  const { id } = router.query;
  const { data: service, isLoading } = useSWR(
    id ? `/api/services/${id}` : null
  );

  if (!service || isLoading) {
    return "Loading...";
  }

  const { name, price, description } = service;

  return (
    <>
      <nav>
        <Link href={`/services/edit/${id}`}>Edit</Link>
        <Link href="/">Homepage</Link>
      </nav>
      <h1>
        {name} - {price}
      </h1>
      <p>{description}</p>
    </>
  );
}
