type GenericOrNull<T> = T | null;
type StringOrNull = GenericOrNull<string>;

export enum GetAdvocateSupportedQueryParameters {
  FIRST = "firstName",
  LAST = "lastName",
  CITY = "city",
  DEGREE = "degree",
  SPECIALTIES = "specialties",
  YEARS_OF_EXP = "yearsOfExperience",
  PAGE_SIZE = "pageSize",
  PAGE_NUMBER = "pageNumber",
}

export interface ParsedGetAdvocateQueryParameters {
  firstName: StringOrNull;
  lastName: StringOrNull;
  city: StringOrNull;
  degree: StringOrNull;
  specialties: GenericOrNull<Array<string>>;
  yearsOfExperience: GenericOrNull<number>;
  pageSize: number;
  pageNumber: number;
}
