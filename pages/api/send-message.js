import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Endast POST tillåts" });
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: "Alla fält krävs" });
  }
  try {
    await prisma.message.create({ data: { name, email, message } });
    res.status(200).json({ message: "Meddelande sparat" });
  } catch {
    res.status(500).json({ error: "Kunde inte spara meddelandet" });
  }
}