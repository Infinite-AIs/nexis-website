import axios from 'axios';
console.log('Calling Groq API...');

export default async function handler(req, res) {
  const prompt = req.body.prompt;
  const API_KEY = process.env.GROQ_API_KEY;

  try {
    const response = await axios.post(
      'https://api.groq.ai/v1/llm',
      { prompt },
      { headers: { 'Authorization': `Bearer ${API_KEY}` } }
    );
    res.status(200).json({ result: response.data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

