import Head from "next/head";
import Link from "next/link";
import { useContext } from "react";
import { useRouter } from "next/router";
import { AuthContext } from "@/context/AuthContext";
import { Formik, Form, Field, ErrorMessage } from "formik";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export default function SignIn() {
  const { setUser } = useContext(AuthContext);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sign In | Crwn Clothing</title>
      </Head>

      <div>
        <h1 className="font-bold text-center text-4xl my-6">Sign In</h1>
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Email is required";
            } else if (!/\S+@\S+\.\S+/.test(values.email)) {
              errors.email = "Email address is invalid";
            }
            if (!values.password) {
              errors.password = "Password is required";
            } else if (values.password.length < 6) {
              errors.password = "Password must be at least 6 characters";
            }
            return errors;
          }}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true);
            try {
              const { data: data } = await axios.post(
                "/api/users/sign-in",
                values
              );
              // console.log("sign in data: >>>>>>>>>", data);
              localStorage.setItem(
                "loggedInUserData",
                JSON.stringify({
                  username: data.username,
                  email: data.email,
                  token: data.token,
                  isAdmin: data.isAdmin,
                })
              );
              setUser(data);
              Cookies.set("token", data.token);
              Cookies.set("isAdmin", data.isAdmin);
              toast.success(data.message);
              router.push("/");
            } catch (error) {
              console.log("error: >>>>>>>>>", error);
              toast.error(error?.response?.data?.message);
            } finally {
              setSubmitting(false);
              values.email = "";
              values.password = "";
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col items-center justify-center text-lg gap-3 mb-6">
              <div className="form-group mb-2">
                <label htmlFor="email" className="block">
                  Email
                </label>
                <Field
                  type="string"
                  name="email"
                  className="border border-[#333] p-2 focus:outline-none rounded text-base min-w-[300px] tracking-[0.1rem]"
                  placeholder="user@email.com"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <div className="form-group mb-2">
                <label htmlFor="password" className="block">
                  Password
                </label>
                <Field
                  type="password"
                  name="password"
                  className="border border-[#333] p-2 focus:outline-none rounded text-base min-w-[300px] tracking-[0.1rem]"
                  placeholder="supersecret"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-sm text-red-500"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`
                  bg-black hover:bg-gray-800 text-white py-2 px-4 rounded 
                  ${isSubmitting && "cursor-not-allowed opacity-50"}
                `}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </button>
            </Form>
          )}
        </Formik>
        <div className="text-center">
          Don't have an account?{" "}
          <Link href="/sign-up" className="text-blue-500 hover:text-blue-600">
            Sign Up
          </Link>
        </div>
      </div>
    </>
  );
}

// // route guard - if user is logged in, redirect to home page -- commented out because we're using middleware for route guards
// export async function getServerSideProps(ctx) {
//   const { req, res } = ctx;
//   const { token } = req.cookies;

//   if (token) {
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
