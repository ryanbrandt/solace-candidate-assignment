import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { GetAdvocateQueryParameters } from "@/app/types";

export interface AdvocateSearchFormValuesAndSetters {
  firstName: { value: string; setter: Dispatch<SetStateAction<string>> };
  lastName: { value: string; setter: Dispatch<SetStateAction<string>> };
  city: { value: string; setter: Dispatch<SetStateAction<string>> };
  degree: { value: string; setter: Dispatch<SetStateAction<string>> };
  specialties: { value: string; setter: Dispatch<SetStateAction<string>> };
}

export const useAdvocateSearchForm = (): [
  AdvocateSearchFormValuesAndSetters,
  GetAdvocateQueryParameters
] => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [city, setCity] = useState("");
  const [degree, setDegree] = useState("");
  const [specialties, setSpecialties] = useState("");

  const [queryParameters, setQueryParameters] =
    useState<GetAdvocateQueryParameters>({});

  useEffect(() => {
    setQueryParameters({
      firstName: firstName.trim() ?? undefined,
      lastName: lastName.trim() ?? undefined,
      city: city.trim() ?? undefined,
      degree: degree.trim() ?? undefined,
      specialties: specialties.trim() ?? undefined,
    });
  }, [firstName, lastName, city, degree, specialties, setQueryParameters]);

  return [
    {
      firstName: { value: firstName, setter: setFirstName },
      lastName: { value: lastName, setter: setLastName },
      city: { value: city, setter: setCity },
      degree: { value: degree, setter: setDegree },
      specialties: { value: specialties, setter: setSpecialties },
    },
    queryParameters,
  ];
};
