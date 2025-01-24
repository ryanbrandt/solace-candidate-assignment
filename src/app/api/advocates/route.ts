import { NextRequest } from "next/server";
import {
  GetAdvocateSupportedQueryParameters,
  ParsedGetAdvocateQueryParameters,
} from "@/app/api/advocates/types";
import { getFilteredSpecialtyIds } from "@/db/repositories/specialties";
import {
  getFilteredAdvocateIds,
  getFullAdvocateGraph,
} from "@/db/repositories/advocate";
import {
  calculateOffset,
  calculateTotalPages,
} from "@/app/api/common/utilities/pagination";
import { parseSearchParameterToNumberOrDefault } from "@/app/api/common/utilities/request";
import {
  DEFAULT_PAGE_NUMBER,
  DEFAULT_PAGE_SIZE,
} from "@/app/api/common/constants";
import { PaginatedResponse } from "@/app/api/common/types";

const _parseGetAdvocateQueryParameters = (
  searchParams: URLSearchParams
): ParsedGetAdvocateQueryParameters => ({
  firstName: searchParams.get(GetAdvocateSupportedQueryParameters.FIRST),
  lastName: searchParams.get(GetAdvocateSupportedQueryParameters.LAST),
  city: searchParams.get(GetAdvocateSupportedQueryParameters.CITY),
  degree: searchParams.get(GetAdvocateSupportedQueryParameters.DEGREE),
  yearsOfExperience: parseSearchParameterToNumberOrDefault(
    searchParams.get(GetAdvocateSupportedQueryParameters.YEARS_OF_EXP),
    null
  ),
  specialties:
    searchParams
      .get(GetAdvocateSupportedQueryParameters.SPECIALTIES)
      ?.split(",") ?? null,
  pageSize: parseSearchParameterToNumberOrDefault(
    searchParams.get(GetAdvocateSupportedQueryParameters.PAGE_SIZE),
    DEFAULT_PAGE_SIZE
  ),
  pageNumber: parseSearchParameterToNumberOrDefault(
    searchParams.get(GetAdvocateSupportedQueryParameters.PAGE_NUMBER),
    DEFAULT_PAGE_NUMBER
  ),
});

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const queryParameters = _parseGetAdvocateQueryParameters(searchParams);

  // Kind of unfortunate this can't be done in one query
  // Not sure if that is achievable with this ORM, but would be ideal
  let filteredSpecialtyIds: Array<number> = [];
  if (queryParameters.specialties) {
    filteredSpecialtyIds = await getFilteredSpecialtyIds(
      queryParameters.specialties
    );
  }
  const filteredAdvocateIds = await getFilteredAdvocateIds(
    queryParameters,
    filteredSpecialtyIds
  );

  const totalPages = calculateTotalPages(
    filteredAdvocateIds.length,
    queryParameters.pageSize
  );
  const pageOffset = calculateOffset(
    queryParameters.pageNumber,
    queryParameters.pageSize
  );

  const filteredAndAssembledAdvocates = await getFullAdvocateGraph(
    (advocate, { inArray }) => inArray(advocate.id, filteredAdvocateIds),
    pageOffset,
    queryParameters.pageSize
  );

  const response: PaginatedResponse<typeof filteredAndAssembledAdvocates> = {
    content: filteredAndAssembledAdvocates,
    pageSize: queryParameters.pageSize,
    pageNumber: queryParameters.pageNumber,
    totalPages,
  };

  return Response.json(response);
}
