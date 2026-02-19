export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    // TODO: Replace this with your AI/Groq API call
    // For now, it just echoes the last message
    const lastMessage = messages[messages.length - 1]?.content || "";
    const aiReply = `Nexis says: ${lastMessage}`;

    res.status(200).json({ result: aiReply });
  } catch (err) {
    res.status(500).json({ error: "Something went wrong." });
  }
}
