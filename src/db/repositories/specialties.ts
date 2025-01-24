import { specialty } from "@/db/schema";
import db from "@/db";

import { ilike, or } from "drizzle-orm";

export const getFilteredSpecialtyIds = async (
  specialtySearchParameters: Array<string>
): Promise<Array<number>> => {
  const specialtiesLikeFilters = specialtySearchParameters.map((s) =>
    ilike(specialty.value, `%${s}%`)
  );
  const filteredSpecialties = await db
    .select({ specialtyId: specialty.id })
    .from(specialty)
    .where(or(...specialtiesLikeFilters));

  return filteredSpecialties.map((s) => s.specialtyId);
};
