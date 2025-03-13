"use server"
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export async function getUserFromToken() {
    try {
        const token = cookies().get("token")?.value; // Get token from cookies
        if (!token) return null;

        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded; // Returns user data (id, email, username)
    } catch (error) {
        return null; // Invalid or expired token
    }
}
