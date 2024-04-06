import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { TopBar } from "@/components/TopBar";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });

  return (
    <>
      <Head>
        <title>ECommerce</title>
      </Head>
      <main>
        <TopBar />
        <div className="box-border absolute w-96 h-116 left-36 top-44 bg-white border border-gray-300 rounded-xl">
          login
        </div>
      </main>
    </>
  );
}
