export default async function handler(req, res) {
  const { category, secret } = req.query;

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // This should be the actual path, not a rewritten path
    // e.g., for "/shop/[category]" this should be "/shop/category-1"
    // await res.revalidate(`/shop/${category}`);
    await res.revalidate("/shop");
    return res.json({ revalidated: true });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.json({
      revalidated: false,
      message: err.message || "could not revalidate",
    });
  }
}
