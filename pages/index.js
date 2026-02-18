import { useState } from "react";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!prompt) return;

    setLoading(true);
    setResponse("");

    try {
      const res = await fetch("/api/nexis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Something went wrong");
      }

      setResponse(data.result);
    } catch (err) {
      console.error(err);
      setResponse("Error: " + err.message);
    }

    setLoading(false);
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "Arial" }}>
      <h1>Nexis</h1>

      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        cols={50}
        placeholder="Ask Nexis anything..."
      />

      <br />

      <button
        onClick={handleSubmit}
        style={{ marginTop: "1rem", padding: "0.5rem 1rem" }}
      >
        {loading ? "Thinking..." : "Submit"}
      </button>

      <div style={{ marginTop: "1rem" }}>
        <strong>Response:</strong>
        <p>{response}</p>
      </div>
    </div>
  );
}
