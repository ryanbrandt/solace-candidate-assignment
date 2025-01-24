export const parseSearchParameterToNumberOrDefault = <T>(
  searchParameter: string | null,
  defaultValue: T
): number | T =>
  searchParameter ? parseInt(searchParameter, 10) : defaultValue;
