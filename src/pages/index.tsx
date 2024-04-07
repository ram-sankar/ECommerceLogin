import Head from "next/head";
import Link from "next/link";
import bcrypt from "bcryptjs";

import { api } from "@/utils/api";
import { TopBar } from "@/components/TopBar";
import { MouseEvent, useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { maskEmail } from "@/shared/helper";
import OtpInput from "@/components/OtpInput";
import { useRouter } from "next/router";

export default function Home() {
  const [name, setName] = useState("ram3");
  const [email, setEmail] = useState("ram3@gm.com");
  const [password, setPassword] = useState("password");
  const [otp, setOTP] = useState("");
  const [isOTPSent, setIsOTPSent] = useState(true);

  const router = useRouter();
  const createUser = api.user.create.useMutation(({
    onSuccess: (res) => {
      console.log(res)
      setIsOTPSent(true)
    },
    onError: (error) => {
      console.log(error)
    }
  }));

  const createNewUser = async () => {
    const hashedPassword = await bcrypt.hash(password, 10)
    const payload = {
        name, 
        email,
        password: hashedPassword
    }
    await createUser.mutate(payload)
  }

  const loginUser = async (newOtpVal?: string) => {
    if (newOtpVal != "12345678" && otp != "12345678") {
      console.log("Invalid OTP")
      return
    }
    localStorage.setItem("logged_in_user", email)
    router.push("/home")
  }

  const RenderCreateAccountForm = () => (
    <div className="flex items-center justify-center w-full mt-10">
      <div className="box-border flex-col px-16 py-6 pb-10 items-center justify-center w-[576px] h-116 bg-white border border-gray-400 rounded-xl">
        <div>
          <h2 className="mt-2 text-center text-3xl font-medium leading-10">Create your account</h2>
        </div>

        <div className="mt-5">
          <form className="space-y-6">
            <Input 
              label={"Name"}
              id="name"
              value={name}
              onChange={(e) => setName(e?.target?.value)}
            />
            <Input 
              label={"Email"}
              id="email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e?.target?.value)}
            />
            <Input 
              label={"Password"}
              id="password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e?.target?.value)}
            />

            <div>
              <Button type="submit" 
                onClick={createNewUser}>
                CREATE ACCOUNT
              </Button>
            </div>
          </form>

          <p className="mt-10 text-center font-normal text-gray-700">
            Have an Account? 
            <Link href="/login" className="font-normal leading-6 text-black hover:text-black ml-3">LOGIN</Link>
          </p>
        </div>
      </div>
    </div>
  )

  const RenderOTPForm = () => {

    const handleOTPChange = (val: string) => {
      setOTP(val)
      if (val?.length === 8) {
          loginUser(val)
      }
    }
    return (
    <div className="flex items-center justify-center w-full mt-10">
      <div className="box-border flex-col px-16 py-6 pb-10 items-center justify-center w-[576px] h-116 bg-white border border-gray-400 rounded-xl">
        <div>
          <h2 className="mt-2 text-center text-3xl font-medium leading-10">Verify your email</h2>
          <div className="mt-2 text-base font-normal leading-6 text-center">
            Enter the 8 digit code you have received on {maskEmail(email)}
          </div>
        </div>

        <div className="mt-8">
          <OtpInput
            length={8}
            onChange={handleOTPChange}
          />

          <div className="mt-12">
            <Button type="submit" 
              onClick={loginUser}>
              VERIFY
            </Button>
          </div>
        </div>
      </div>
    </div>
    )
  }

  return (
    <>
      <Head>
        <title>ECommerce</title>
      </Head>
      <main>
        <TopBar />
        {isOTPSent ? RenderOTPForm() : RenderCreateAccountForm()}
      </main>
    </>
  );
}
