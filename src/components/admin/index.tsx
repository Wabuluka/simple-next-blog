import { useRouter } from "next/router";
import { useEffect } from "react";
import AdminPanel from "./AdminPanel";

export default function AdminPage() {
  const router = useRouter();

  useEffect(() => {
    // Additional client-side protection
    const token = document.cookie.includes("auth-token");
    if (!token) {
      router.push("/login");
    }
  }, [router]);

  return (
    <div className="admin-container">
      <AdminPanel />
    </div>
  );
}
