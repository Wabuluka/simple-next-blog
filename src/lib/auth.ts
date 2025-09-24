import { NextApiRequest, NextApiResponse } from "next";

export interface AuthUser {
  id: string;
  email: string;
  role: string;
}

// Simple session management (in production, use proper sessions/JWT)
export const mockUsers: AuthUser[] = [
  { id: "1", email: "admin@example.com", role: "admin" },
];

export const isAuthenticated = (req: NextApiRequest): AuthUser | null => {
  const token = req.headers.authorization?.replace("Bearer ", "");
  if (!token) return null;

  // In real app, verify JWT token
  return mockUsers.find((user) => user.id === token) || null;
};

export const requireAuth =
  (handler: Function) => async (req: NextApiRequest, res: NextApiResponse) => {
    const user = isAuthenticated(req);
    if (!user) {
      return res.status(401).json({ error: "Unauthorized" });
    }
    return handler(req, res, user);
  };
