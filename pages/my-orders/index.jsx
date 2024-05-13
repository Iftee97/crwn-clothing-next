import Head from "next/head";
import OrderItem from "@/components/OrderItem";
import axios from "axios";

export default function MyOrders({ orders }) {
  return (
    <>
      <Head>
        <title>My Orders | Crwn Clothing</title>
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">My Orders ({orders.length})</h1>
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
  const { token } = req.cookies;

  // // route guard - if user is not logged in, redirect to home page -- commented out because we're using middleware for route guards
  // if (!token) {
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
      `${process.env.NEXT_PUBLIC_API_URL}/orders/my-orders`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    orders = data;
  } catch (error) {
    console.log("error: >>>>>>>>", error);
    orders = [];
  }

  return {
    props: {
      orders,
    },
  };
}
