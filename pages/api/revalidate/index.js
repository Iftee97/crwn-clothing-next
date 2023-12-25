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

// // on-demand revalidation for next js page router. but the api must be from a separate api, not next js api
/* 
export default async function handler(req, res) {
  // check for the POST request
  if (req.method !== "POST") {
    return res
      .status(400)
      .json({ error: "Invalid HTTP method. Only POST requests are allowed." });
  }

  // check for the secret token
  if (req.query.secret !== process.env.REVALIDATE_SECRET_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    // check that body is not empty
    const body = req.body;
    if (!body) {
      res.status(400).send("Bad request (no body)");
      return;
    }

    // get the slug to revalidate from body
    const slugToRevalidate = body.slugToRevalidate;
    if (slugToRevalidate) {
      await res.unstable_revalidate(/blog/${slugToRevalidate});
      return res.json({ revalidated: true });
    }
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send("Error revalidating");
  }
}
*/
