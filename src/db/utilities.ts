import { pgTable, serial, text } from "drizzle-orm/pg-core";

export const pgEnumTable = (tableName: string) =>
  pgTable(tableName, {
    id: serial("id").primaryKey(),
    value: text("value").notNull().unique(),
  });
