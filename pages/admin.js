import { useState, useEffect } from "react";

export default function Admin() {
  const [users, setUsers] = useState({ count: 0, users: [] });

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch("/api/active", {
        method: "GET",
        headers: { "x-admin-key": process.env.NEXT_PUBLIC_ADMIN_KEY }
      });
      const data = await res.json();
      setUsers(data);
    };

    fetchUsers();
    const interval = setInterval(fetchUsers, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ padding: "20px", color: "white", background: "#0f172a" }}>
      <h1>Active Users</h1>
      <p>Currently online: {users.count}</p>
      <ul>
        {users.users.map((u, i) => (
          <li key={i}>{u}</li>
        ))}
      </ul>
    </div>
  );
}
