import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Cookies from "js-cookie";

export default function CreateCatetgory() {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setIsSubmitting(true);
      const { data } = await axios.post(
        "/api/categories/create-category",
        {
          title,
          imageUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
            isAdmin: Cookies.get("isAdmin"),
          },
        }
      );
      toast.success(data.message);
      router.push("/");
    } catch (error) {
      console.log("error: >>>>>>>>>", error);
      toast.error(error?.response?.data?.message);
    } finally {
      setIsSubmitting(false);
      setTitle("");
      setImageUrl("");
    }
  }

  return (
    <>
      <Head>
        <title>Create Category | Crwn Clothing</title>
      </Head>

      <div>
        <h1 className="font-bold text-center text-4xl my-6">Create Category</h1>
        <form
          className="flex flex-col items-center justify-center text-lg gap-3 mb-6"
          onSubmit={handleSubmit}
        >
          <div className="form-group mb-2">
            <label htmlFor="title" className="block">
              Title
            </label>
            <input
              type="string"
              name="title"
              className="border border-[#333] p-2 focus:outline-none rounded text-base min-w-[300px] tracking-[0.1rem]"
              placeholder="e.g. Hats"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group mb-2">
            <label htmlFor="imageUrl" className="block">
              Image Url
            </label>
            <input
              type="text"
              name="imageUrl"
              className="border border-[#333] p-2 focus:outline-none rounded text-base min-w-[300px] tracking-[0.1rem]"
              placeholder="http://example.com/image.png"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting || !title || !imageUrl}
            className={`
            bg-black hover:bg-gray-800 text-white py-2 px-4 rounded mt-2 
              ${isSubmitting && "cursor-not-allowed opacity-50"}
            `}
          >
            {isSubmitting ? "loading..." : "Create"}
          </button>
        </form>
      </div>
    </>
  );
}

// // route guard - if user is not admin, redirect to home page -- commented out because we're using middleware for route guards
// export async function getServerSideProps(ctx) {
//   const { req } = ctx;
//   const { isAdmin } = req.cookies;

//   if (isAdmin !== "true") {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       // no props to return for route guard
//     },
//   };
// }
