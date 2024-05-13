import Head from "next/head";
import UserItem from "@/components/UserItem";
import axios from "axios";

export default function AllUsers({ users }) {
  return (
    <>
      <Head>
        <title>All Users | Crwn Clothing</title>
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">All Users ({users.length})</h1>
        <div className="flex flex-col items-center justify-center gap-4">
          {users.map((user) => (
            <UserItem key={user._id} user={user} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const { isAdmin } = req.cookies;

  // // route guard - if user is not admin, redirect to home page -- commented out because we're using middleware for route guards
  // if (isAdmin !== "true") {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  let users = [];
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/users/all-users`,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.token}`,
          isAdmin,
        },
      }
    );
    users = data;
  } catch (error) {
    console.log("error: >>>>>>>>", error);
    users = [];
  }

  return {
    props: {
      users,
    },
  };
}
