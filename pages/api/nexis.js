import { supabase } from "../../utils/supabaseClient";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { messages } = req.body;

    // example: fetch AI response from database or send request
    const { data, error } = await supabase.from("profiles").select("*");

    if (error) return res.status(500).json({ error: error.message });

    res.status(200).json({ result: data });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}

<script type="module">
  import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm'

  const supabaseUrl = 'YOUR_SUPABASE_URL'
  const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  // Sign up a new user
  async function signup(email, password, role='user') {
    const { data, error } = await supabase.auth.signUp({ email, password })
    if (error) return alert(error.message)

    await supabase.from('profiles').insert([{ id: data.user.id, email, role }])
    alert('Account created!')
  }

  // Sign in
  async function login(email, password) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) return alert(error.message)
    alert('Logged in!')
  }

  // Get all accounts (admin)
  async function getAllAccounts() {
    const { data, error } = await supabase.from('profiles').select('*')
    console.log(data)
  }
</script>


import axios from "axios";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Messages array required" });
  }

  const API_KEY = process.env.GROQ_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({ error: "Missing GROQ_API_KEY" });
  }

  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: "You are Nexis, a fast, intelligent AI assistant."
          },
          ...messages
        ],
        temperature: 0.7
      },
      {
        headers: {
          "Authorization": `Bearer ${API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    return res.status(200).json({ result: reply });

  } catch (error) {
    console.error("Groq Error:", error.response?.data || error.message);
    return res.status(500).json({
      error: error.response?.data || error.message
    });
  }
}
