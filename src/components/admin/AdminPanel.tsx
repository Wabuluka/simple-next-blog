import { useState } from "react";

export default function AdminPanel() {
  const [posts, setPosts] = useState();

  return (
    <div className="admin-panel">
      <h1>Admin Dashboard</h1>
      <div className="admin-actions">
        <button>Create New Post</button>
        <button>Manage Users</button>
      </div>
    </div>
  );
}
