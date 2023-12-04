import Link from "next/link";
import useSWR from "swr";
import { useRouter } from "next/router";
import Form from "@/components/Form";

export default function EditService() {
  const router = useRouter();
  const { id } = router.query;
  const {
    data: service,
    isLoading,
    mutate,
  } = useSWR(id ? `/api/services/${id}` : null);

  // http://localhost:3001/api/services/{id}
  async function onSubmit(data) {
    console.log("Edit", data);
    const url = `/api/services/${id}`;

    // #1 fetch request
    await fetch(url, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // #2 mutate
    mutate("/api/services");
    mutate(); // /api/services/{id}
    // #3 redirect
    router.push("/");
  }

  async function handleDelete() {
    // 0 confirm
    if (!confirm("are you sure?")) {
      return;
    }
    // #1 fetch
    const url = `/api/services/${id}`;
    await fetch(url, { method: "DELETE" });

    // #2 mutate
    mutate("/api/services");
    mutate(); // /api/services/{id}
    // #3 redirect
    router.push("/");
  }

  if (!service || isLoading) {
    return "Loading...";
  }

  return (
    <>
      <nav>
        <Link href="/">Homepage</Link>
      </nav>
      <h1>Edit {service.name}</h1>
      <Form onSubmit={onSubmit} service={service} />
      <button onClick={handleDelete}>Delete</button>
    </>
  );
}
