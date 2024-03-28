import Head from "next/head";
import OrderItem from "@/components/OrderItem";
import axios from "axios";

export default function AllOrders({ orders }) {
  return (
    <>
      <Head>
        <title>All Orders | Crwn Clothing</title>
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">
          All Orders ({orders.length})
        </h1>
        <div className="flex flex-col items-center justify-center gap-4">
          {orders.map((order) => (
            <OrderItem key={order._id} order={order} />
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { req, res } = ctx;
  const { token, isAdmin } = req.cookies;

  // // route guard - if user is not admin, redirect to home page -- commented out because we're using middleware for route guards
  // if (isAdmin !== "true") {
  //   return {
  //     redirect: {
  //       destination: "/",
  //       permanent: false,
  //     },
  //   };
  // }

  let orders = [];
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/orders/all-orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          isAdmin,
        },
      }
    );
    // console.log("data: >>>>>>>>", data);
    orders = data;
  } catch (error) {
    // console.log("error: >>>>>>>>", error);
    orders = [];
  }

  return {
    props: {
      orders,
    },
  };
}
