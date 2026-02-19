export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { messages } = req.body;

    // Make sure we have some text
    if (!messages || messages.length === 0) {
      return res.status(400).json({ error: "No messages provided" });
    }

    // Call the Groq OpenAI-compatible chat endpoint
    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant", // safe default supported model
          messages: messages,
          temperature: 0.7
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      return res.status(500).json({ error: data });
    }

    // Extract the assistant text
    const reply = data.choices?.[0]?.message?.content || "";

    return res.status(200).json({ result: reply });
  } catch (err) {
    return res
      .status(500)
      .json({ error: err.message || "Unknown server error" });
  }
}
