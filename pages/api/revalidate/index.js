export default async function handler(req, res) {
  // // Check for secret to confirm this is a valid request
  // if (req.query.secret !== process.env.MY_SECRET_TOKEN) {
  //   return res.status(401).json({ message: "Invalid token" });
  // }

  try {
    // this should be the actual path not a rewritten path
    // e.g. for "/blog/[slug]" this should be "/blog/post-1"
    // await res.revalidate("/path-to-revalidate");

    const { category } = req.query;
    console.log("category: >>>>>", category);

    await res.revalidate(`/shop/${category}`);

    console.log({
      revalidated: true,
      revalidationPath: `/shop/${category}`,
    });
    return res.json({
      revalidated: true,
      revalidationPath: `/shop/${category}`,
    });
  } catch (error) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    console.log("Error revalidating: >>>>>>>", error);
    return res.status(500).json({ message: "Error revalidating", error });
  }
}
