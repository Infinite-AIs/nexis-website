import axios from "axios";

export default async function handler(req, res) {
  const { prompt } = req.body;
  const API_KEY = process.env.GROQ_API_KEY;

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).json({
      result: response.data.choices[0].message.content
    });

} catch (error) {
  console.error("FULL ERROR:", error.response?.data || error);

  res.status(500).json({
    error: JSON.stringify(error.response?.data || error.message)
  });
}
}
