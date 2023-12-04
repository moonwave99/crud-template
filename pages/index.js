import useSWR from "swr";
import Link from "next/link";

export default function Homepage() {
  const { data: services, isLoading } = useSWR(`/api/services`);

  if (!services || isLoading) {
    return "Loading...";
  }

  return (
    <>
      <h1>Services</h1>
      <p>
        <Link href="/new">New Service</Link>
      </p>
      {services.length ? (
        <ul>
          {services.map(({ _id, name, price }) => (
            <li key={_id}>
              {name} ({price})<Link href={`/services/${_id}`}>Read More</Link>
            </li>
          ))}
        </ul>
      ) : (
        "No services yet."
      )}
    </>
  );
}
