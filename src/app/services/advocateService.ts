import { GetAdvocateQueryParameters, GetAdvocateResponse } from "@/app/types";

export const fetchAdvocates = async (
  parameters: GetAdvocateQueryParameters
): Promise<GetAdvocateResponse> => {
  const searchString = Object.keys(parameters).reduce<string>(
    (acc: string, key: string) => {
      if (parameters[key]) {
        const operator = acc ? "&" : "?";
        acc += `${operator}${key}=${parameters[key]}`;
      }

      return acc;
    },
    ""
  );

  const response = await fetch(`/api/advocates${searchString}`);

  if (response.status !== 200) {
    throw new Error(
      `Received non-OK status from advocates endpoint: ${response.status}`
    );
  }

  const responseContent = (await response.json()) as GetAdvocateResponse;

  return responseContent;
};
