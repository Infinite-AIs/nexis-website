import axios from 'axios';

export default async function handler(req, res) {
  const prompt = req.body.prompt;
  const API_KEY = process.env.GROQ_API_KEY;

  console.log('Calling Groq API...');

  try {
    const response = await axios.post(
      'https://api.groq.ai/v1/completions', // use the correct endpoint from Groq dashboard
      { prompt },
      { headers: { 'Authorization': `Bearer ${API_KEY}` } }
    );

    res.status(200).json({ result: response.data });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
}
