import Head from "next/head";
import Link from "next/link";

export default function Custom404Page() {
  return (
    <>
      <Head>
        <title>404 | Crwn Clothing</title>
      </Head>

      <main className="flex flex-col items-center justify-center">
        <h1 className="font-bold text-5xl mb-4">404</h1>
        <p className="font-light text-3xl mb-6">Page not found</p>
        <Link
          href="/"
          className="font-light text-base text-blue-600 hover:text-blue-700"
        >
          Go back home
        </Link>
      </main>
    </>
  );
}
