import Head from "next/head";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import OrderItem from "@/components/OrderItem";
import axios from "axios";
import Cookies from "js-cookie";

export default function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    getOrders();
  }, []);

  async function getOrders() {
    try {
      setOrdersLoading(true);
      const { data } = await axios.get("/api/orders/my-orders", {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
          user: JSON.stringify(user),
        },
      });
      setOrders(data);
    } catch (error) {
      console.log("error: >>>>>>>>", error);
      // console.log('error.response.data.error: >>>>>>>>', error.response.data.error)
      // console.log('error.response.data.message: >>>>>>>>', error.response.data.message)
    } finally {
      setOrdersLoading(false);
    }
  }

  let content = null;
  if (ordersLoading) {
    content = <h2 className="flex items-center justify-center">Loading...</h2>;
  }
  if (!ordersLoading && orders.length === 0) {
    content = (
      <h2 className="flex items-center justify-center">You have no orders</h2>
    );
  }
  if (!ordersLoading && orders.length > 0) {
    content = orders.map((order) => (
      <OrderItem key={order._id} order={order} />
    ));
  }

  return (
    <>
      <Head>
        <title>My Orders | Crwn Clothing</title>
      </Head>

      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-6">My Orders ({orders.length})</h1>
        <div className="flex flex-col items-center justify-center gap-4">
          {content}
        </div>
      </div>
    </>
  );
}

// // route guard - if user is not logged in, redirect to home page -- commented out because we're using middleware for route guards
// export async function getServerSideProps(ctx) {
//   const { req, res } = ctx;
//   const { token } = req.cookies;

//   if (!token) {
//     return {
//       redirect: {
//         destination: "/",
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {
//       //
//     },
//   };
// }
