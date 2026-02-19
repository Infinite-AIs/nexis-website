let activeUsers = {}; // in-memory store

export default function handler(req, res) {
  const now = Date.now();

  // remove users inactive for 60 seconds
  Object.keys(activeUsers).forEach(ip => {
    if (now - activeUsers[ip] > 60000) {
      delete activeUsers[ip];
    }
  });

  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;

  if (req.method === "POST") {
    // user ping
    activeUsers[ip] = now;
    return res.status(200).json({ success: true });
  }

  if (req.method === "GET") {
    // admin view
    const key = req.headers["x-admin-key"];
    if (key !== process.env.ADMIN_KEY) {
      return res.status(403).json({ error: "Forbidden" });
    }
    const users = Object.keys(activeUsers);
    return res.status(200).json({ count: users.length, users });
  }

  res.status(405).json({ error: "Method not allowed" });
}
