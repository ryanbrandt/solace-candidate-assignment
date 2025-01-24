import { specialties } from "@/db/seed/specialties";
import db from "@/db";
import {
  advocate,
  advocateCity,
  advocateDegree,
  advocateSpecialty,
  city,
  degree,
  specialty,
} from "@/db/schema";
import { advocates } from "@/db/seed/advocates";
import { degrees } from "@/db/seed/degrees";
import { cities } from "@/db/seed/cities";
import {
  extractIdsFromRecords,
  randomValueFromList,
} from "@/app/api/seed/utilities";

export async function POST() {
  const result = await db.transaction(async (tx) => {
    const seededSpecialties = await tx
      .insert(specialty)
      .values(specialties)
      .returning({ id: specialty.id });
    const seededSpecialtyIds = extractIdsFromRecords(seededSpecialties);

    const seededDegrees = await tx
      .insert(degree)
      .values(degrees)
      .returning({ id: degree.id });
    const seededDegreeIds = extractIdsFromRecords(seededDegrees);

    const seededCities = await tx
      .insert(city)
      .values(cities)
      .returning({ id: city.id });
    const seededCityIds = extractIdsFromRecords(seededCities);

    const seededAdvocates = await tx
      .insert(advocate)
      .values(advocates)
      .returning({ id: advocate.id });
    const seededAdvocateIds = extractIdsFromRecords(seededAdvocates);

    const advocateCities = [];
    const advocateSpecialties = [];
    const advocateDegrees = [];
    for (const advocateId of seededAdvocateIds) {
      advocateCities.push({
        advocateId,
        cityId: randomValueFromList(seededCityIds),
      });
      advocateDegrees.push({
        advocateId,
        degreeId: randomValueFromList(seededDegreeIds),
      });
      advocateSpecialties.push({
        advocateId,
        specialtyId: randomValueFromList(seededSpecialtyIds),
      });
    }

    await tx.insert(advocateCity).values(advocateCities);
    await tx.insert(advocateSpecialty).values(advocateSpecialties);
    await tx.insert(advocateDegree).values(advocateDegrees);

    // Would prefer if we could get all of this out of the insert statement somehow instead of re-querying
    // But I'm not familiar enough with this ORM to know if thats possible
    const result = await tx.query.advocate.findMany({
      with: {
        degrees: {
          with: {
            degree: true,
          },
          columns: {},
        },
        specialties: {
          with: { specialty: true },
          columns: {},
        },
        cities: {
          with: {
            city: true,
          },
          columns: {},
        },
      },
      where: (advocate, { inArray }) => inArray(advocate.id, seededAdvocateIds),
    });

    return result;
  });

  return Response.json({ advocates: result });
}
