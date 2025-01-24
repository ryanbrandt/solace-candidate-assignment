import { ilike, eq, inArray, or, SQL, Operators } from "drizzle-orm";
import { ParsedGetAdvocateQueryParameters } from "@/app/api/advocates/types";
import {
  advocate,
  advocateCity,
  advocateDegree,
  advocateSpecialty,
  city,
  degree,
  specialty,
} from "@/db/schema";
import db from "@/db";
import { conditionalWhereFilter } from "@/db/repositories/utilities";

export const getFilteredAdvocateIds = async (
  filterParameters: ParsedGetAdvocateQueryParameters,
  filteredSpecialtyIds: Array<number>
): Promise<Array<number>> => {
  const queryResult = await db
    .selectDistinctOn([advocate.id], {
      advocateId: advocate.id,
    })
    .from(advocate)
    .leftJoin(advocateDegree, eq(advocate.id, advocateDegree.advocateId))
    .leftJoin(degree, eq(advocateDegree.degreeId, degree.id))
    .leftJoin(advocateCity, eq(advocate.id, advocateCity.advocateId))
    .leftJoin(city, eq(advocateCity.cityId, city.id))
    .leftJoin(advocateSpecialty, eq(advocate.id, advocateSpecialty.advocateId))
    .leftJoin(specialty, eq(advocateSpecialty.specialtyId, specialty.id))
    .where(() =>
      or(
        conditionalWhereFilter(
          () => ilike(advocate.firstName, `%${filterParameters.firstName}%`),
          !!filterParameters.firstName
        ),
        conditionalWhereFilter(
          () => ilike(advocate.lastName, `%${filterParameters.lastName}%`),
          !!filterParameters.lastName
        ),
        conditionalWhereFilter(
          () =>
            eq(advocate.yearsOfExperience, filterParameters.yearsOfExperience!),
          !!filterParameters.yearsOfExperience
        ),
        conditionalWhereFilter(
          () => ilike(city.name, `%${filterParameters.city}%`),
          !!filterParameters.city
        ),
        conditionalWhereFilter(
          () => ilike(degree.value, `%${filterParameters.degree}%`),
          !!filterParameters.degree
        ),
        conditionalWhereFilter(
          () => inArray(specialty.id, filteredSpecialtyIds),
          !!filteredSpecialtyIds.length
        )
      )
    );

  return queryResult.map((record) => record.advocateId);
};

export const getFullAdvocateGraph = async (
  where?: (fields: typeof advocate._.columns, op: Operators) => SQL,
  offset?: number,
  limit?: number
) => {
  const advocates = await db.query.advocate.findMany({
    with: {
      advocateDegrees: {
        with: {
          degree: true,
        },
        columns: {},
      },
      advocateSpecialties: {
        with: { specialty: true },
        columns: {},
      },
      advocateCities: {
        with: {
          city: true,
        },
        columns: {},
      },
    },
    where,
    offset,
    limit,
  });

  return advocates;
};
