import Head from "next/head";
import Link from "next/link";

import { api } from "@/utils/api";
import { TopBar } from "@/components/TopBar";
import { MouseEvent, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const [name, setName] = useState("");
  const [email, setEmail] = useState("ram@gm.com");
  const [password, setPassword] = useState("");

  const handleFormSubmit = (e: MouseEvent) => {
    e?.preventDefault()
    const payload = {
      name, 
      email,
      password
    }
    console.log(payload)
  }

  const RenderCreateAccountForm = () => (
    <div className="flex items-center justify-center w-full mt-10">
      <div className="box-border flex-col px-16 py-6 pb-10 items-center justify-center w-[576px] h-116 bg-white border border-gray-400 rounded-xl">
        <div>
          <h2 className="mt-2 text-center text-3xl font-medium leading-10">Create your account</h2>
        </div>

        <div className="mt-5">
          <form className="space-y-6" action="#" method="POST">
            <Input 
              label={"Name"}
              key="name"
              value={name}
              onChange={(e) => setName(e?.target?.value)}
            />
            <Input 
              label={"Email"}
              key="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e?.target?.value)}
            />
            <Input 
              label={"Password"}
              key="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e?.target?.value)}
            />

            <div>
              <Button type="submit" 
                onClick={handleFormSubmit}>
                CREATE ACCOUNT
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center font-normal text-gray-700">
            Have an Account? 
            <a href="#" className="font-normal leading-6 text-black hover:text-black ml-3">LOGIN</a>
          </p>
        </div>
      </div>
    </div>

  )

  return (
    <>
      <Head>
        <title>ECommerce</title>
      </Head>
      <main>
        <TopBar />
        {RenderCreateAccountForm()}
      </main>
    </>
  );
}
