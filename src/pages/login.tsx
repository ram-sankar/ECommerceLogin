import Button from "@/components/Button";
import Input from "@/components/Input";
import { TopBar } from "@/components/TopBar";
import Link from "next/link";
import { useState } from "react";
import { api } from "@/utils/api";

interface Props {
    
}

export default function login (props: Props) {
    const [email, setEmail] = useState("ram3@gm.com");
    const [password, setPassword] = useState("password");

    const loginUser = api.user.login.useMutation(({
        onSuccess: (res) => {
            console.log(res)
        },
        onError: (error) => {
            console.log(error)
        }
    }));

    const handleFormSubmit = async (e: MouseEvent) => {
        e?.preventDefault()
        // const hashedPassword = await bcrypt.hash(password, 10)
        const payload = {
            email,
            password
        }
        console.log(payload)
        loginUser.mutate(payload)
    }

    const TopSection = () => (
        <div>
            <h2 className="mt-2 text-center text-3xl font-medium leading-10">Login</h2>
            <h3 className="mt-7 text-xl font-medium leading-7 text-center">
                Welcome back to ECOMMERCE
            </h3>
            <div className="mt-2 text-base font-normal leading-6 text-center">
                The next gen business marketplace
            </div>
        </div>
    )

    const LoginForm = () => (
        <div className="mt-5">
        <form className="space-y-6">
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
                onClick={handleFormSubmit}>
                LOGIN
            </Button>
            </div>
        </form>

        <hr className="mt-6 border-gray-400"/>

        <p className="mt-6 text-center font-normal text-gray-700">
            Don't have an Account? 
            <Link href="/" className="font-normal leading-6 text-black hover:text-black ml-3">SIGN UP</Link>
        </p>
        </div>
    )

    return (
        <>
            <TopBar />
            <div className="flex items-center justify-center w-full mt-10">
                <div className="box-border flex-col px-16 py-6 pb-10 items-center justify-center w-[576px] h-116 bg-white border border-gray-400 rounded-xl">
                    {TopSection()}
                    {LoginForm()}
                </div>
            </div>
        </>
    )
}