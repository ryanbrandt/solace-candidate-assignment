import { getFullAdvocateGraph } from "@/db/repositories/advocate";
import { PaginatedResponse } from "@/app/api/common/types";

export type GetAdvocateResponseContent = Awaited<
  ReturnType<typeof getFullAdvocateGraph>
>;

export type GetAdvocateResponse = PaginatedResponse<GetAdvocateResponseContent>;

export type GetAdvocateQueryParameters = Partial<{
  [key: string]: string | number;
  firstName: string;
  lastName: string;
  city: string;
  degree: string;
  specialties: string;
  yearsOfExperience: number;
  pageSize: number;
  pageNumber: number;
}>;
