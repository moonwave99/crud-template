import Link from "next/link";
import { useRouter } from "next/router";
import { mutate } from "swr";
import Form from "@/components/Form";

export default function NewService() {
  const router = useRouter();
  async function onSubmit(data) {
    // #1 fetch request
    await fetch(`/api/services`, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    // #2 mutate
    mutate("/api/services");
    // #3 redirect
    router.push("/");
  }

  return (
    <>
      <nav>
        <Link href="/">Homepage</Link>
      </nav>
      <h1>New</h1>
      <Form onSubmit={onSubmit} />
    </>
  );
}
