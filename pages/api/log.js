export default function handler(req, res) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0] ||
    req.socket?.remoteAddress ||
    "Unknown";

  console.log("Visitor IP:", ip);

  res.status(200).json({ message: "Logged" });
}
