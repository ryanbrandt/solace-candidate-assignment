export const randomValueFromList = <T>(list: Array<T>): T => {
  const listLastIndex = list.length - 1;

  return list[Math.floor(Math.random() * listLastIndex)];
};

interface RecordWithId {
  id: number;
}

export const extractIdsFromRecords = <T extends RecordWithId>(
  records: Array<T>
): Array<number> => records.map((r) => r.id);
