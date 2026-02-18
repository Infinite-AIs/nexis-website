import { useState, useRef, useEffect } from "react";

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatRef = useRef(null);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/nexis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: input }),
      });

      const data = await res.json();

      setMessages([
        ...newMessages,
        { role: "assistant", content: data.result || "Error." }
      ]);
    } catch (err) {
      setMessages([
        ...newMessages,
        { role: "assistant", content: "Error connecting to Nexis." }
      ]);
    }

    setLoading(false);
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div style={styles.container}>
      <div style={styles.chatContainer} ref={chatRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              backgroundColor:
                msg.role === "user" ? "#2563eb" : "#1f2937",
            }}
          >
            {msg.content}
          </div>
        ))}

        {loading && (
          <div style={{ ...styles.message, backgroundColor: "#1f2937" }}>
            Nexis is thinking...
          </div>
        )}
      </div>

      <div style={styles.inputContainer}>
        <input
          style={styles.input}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Message Nexis..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button style={styles.button} onClick={sendMessage}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#0f172a",
    color: "white",
  },
chatContainer: {
  flex: 1,
  overflowY: "auto",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-end", // 👈 THIS anchors content to bottom
  padding: "20px",
  gap: "10px",
  maskImage: "linear-gradient(to top, black 70%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to top, black 70%, transparent 100%)",
},

  message: {
    padding: "12px 16px",
    borderRadius: "18px",
    maxWidth: "70%",
    fontSize: "15px",
    lineHeight: "1.4",
  },
  inputContainer: {
    display: "flex",
    padding: "15px",
    borderTop: "1px solid #1e293b",
    backgroundColor: "#0f172a",
  },
  input: {
    flex: 1,
    padding: "12px",
    borderRadius: "12px",
    border: "none",
    outline: "none",
    fontSize: "14px",
    marginRight: "10px",
  },
  button: {
    padding: "12px 18px",
    borderRadius: "12px",
    border: "none",
    backgroundColor: "#2563eb",
    color: "white",
    cursor: "pointer",
  },
};
