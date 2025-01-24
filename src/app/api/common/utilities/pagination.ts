export const calculateTotalPages = (
  totalRecords: number,
  pageSize: number
): number => Math.ceil(totalRecords / pageSize);

export const calculateOffset = (pageNumber: number, pageSize: number): number =>
  (pageNumber - 1) * pageSize;
