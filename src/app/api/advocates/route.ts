import db from "@/db";
import { advocates } from "@/db/seed/advocates";

export async function GET() {
  // Uncomment this line to use a database
  // const data = await db.select().from(advocates);

  const data = advocates;

  return Response.json({ data });
}
