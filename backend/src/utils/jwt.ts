import json from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "supersecret";

export const signToken = (payload: object) =>
  json.sign(payload, JWT_SECRET, { expiresIn: "1h" });

export const verifyToken = (token: string) => json.verify(token, JWT_SECRET);
