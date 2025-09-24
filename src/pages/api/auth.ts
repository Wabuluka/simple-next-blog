import { mockUsers } from "@/src/lib/auth";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    const user = mockUsers.find((u) => u.email == email);

    if (user && password === "password") {
      res.setHeader(
        "Set-Cookie",
        `auth-token=admin-token; Path=/; HttpOnly; SameSite=Strict`
      );
      return res.json({ user });
    }
    return res.status(401).json({ error: "Invalid credentials" });
  }
  return res.status(405).json({ error: "Method not allowed" });
}
