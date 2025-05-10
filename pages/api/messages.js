import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {
  if (req.method !== "GET") return res.status(405).json({ error: "Endast GET tillåts" });
  try {
    const messages = await prisma.message.findMany({ orderBy: { createdAt: "desc" } });
    res.status(200).json(messages);
  } catch {
    res.status(500).json({ error: "Kunde inte hämta meddelanden" });
  }
}