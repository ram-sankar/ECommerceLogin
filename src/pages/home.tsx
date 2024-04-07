import Button from "@/components/Button";
import Input from "@/components/Input";
import { TopBar } from "@/components/TopBar";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "@/utils/api";
import { useRouter } from "next/router";
import { useQuery } from "@tanstack/react-query";
import { categoryRouter } from "@/server/api/routers/category";

interface Props {}

export default function login(props: Props) {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loggedInUser = localStorage.getItem("logged_in_user");
    if (loggedInUser) {
      setUserEmail(loggedInUser);
    } else {
      router.push("/");
    }
  }, []);

  const { data } = api.category.getCategories.useInfiniteQuery(
    {
      limit: 4,
    },
    {
      getNextPageParam: () => page,
    },
  );

  const TopSection = () => (
    <div>
      <h2 className="mt-2 text-center text-3xl font-medium leading-10">
        Please mark your interests!
      </h2>
      <div className="mt-2 text-center text-base font-normal leading-6">
        We will keep you notified.
      </div>
    </div>
  );

  const RenderCategoryList = () => {
    const currentList = data?.pages.slice((page-1)*10, page*10)
    return currentList?.[0]?.map(cat => (
        <div key={cat.id}>
{/* <input type="checkbox" className="appearance-none w-6 h-6 border-2 border-gray-300 rounded-md checked:bg-black checked:border-none  checked:after:bg-white" /> */}
{/* <input type="checkbox" className="w-6 h-6 border-2 border-gray-300 rounded-md checked:bg-black checked:border-none" /> */}
<div className="flex items-center me-4">
    <input checked id="red-checkbox" type="checkbox" value="" className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 rounded focus:ring-red-500 dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
    <label htmlFor="red-checkbox" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Red</label>
</div>

            {cat?.category_name}
        </div>
    ))
  };

  return (
    <>
      <TopBar />
      <div className="mt-10 flex w-full items-center justify-center">
        <div className="h-116 box-border w-[576px] flex-col items-center justify-center rounded-xl border border-gray-400 bg-white px-16 py-6 pb-10">
          {TopSection()}
          {RenderCategoryList()}
        </div>
      </div>
    </>
  );
}
