import { SQL } from "drizzle-orm";

export const conditionalWhereFilter = (
  filter: () => SQL,
  coniditon: boolean
): SQL | undefined => (coniditon ? filter() : undefined);
