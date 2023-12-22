export default async function handler(req, res) {
  const { category, secret } = req.query;

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.MY_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    await res.revalidate(`/shop/${category}`);
    return res.json({ revalidated: true });
  } catch (err) {
    return res.json({
      revalidated: false,
      message: err.message || "could not revalidate",
    });
  }
}
