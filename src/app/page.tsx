"use client";

import { useDebounce } from "@ryanbrandt/react-quick-ui";
import { useEffect, useState } from "react";
import AdvocateTable from "@/app/_components/advocateTable";
import { fetchAdvocates } from "@/app/services/advocateService";
import { GetAdvocateResponseContent } from "@/app/types";
import ErrorMessage from "@/app/_components/errorMessage";
import { useAdvocateSearchForm } from "@/app/hooks/useAdvocateSearchForm";
import AdvocateSearchForm from "./_components/advocateSearchForm";

export default function Home() {
  const [advocates, setAdvocates] = useState<GetAdvocateResponseContent>([]);
  const [error, setError] = useState<string | null>(null);

  const [formState, queryParameters] = useAdvocateSearchForm();

  // so we dont make a request on each keystroke
  const debouncedQueryParameters = useDebounce(queryParameters, 250);
  useEffect(() => {
    setError(null);

    fetchAdvocates(debouncedQueryParameters)
      .then((result) => {
        setAdvocates(result.content);
      })
      .catch((e) => {
        setError(e.message);
      });
  }, [debouncedQueryParameters, setAdvocates, setError]);

  return (
    <main className="flex flex-col items-center align-center m-24">
      <h1 className="font-medium text-lg m-5">Search Solace Advocates</h1>
      <div>
        <AdvocateSearchForm formState={formState} />
      </div>
      {error ? (
        <ErrorMessage message={error} />
      ) : (
        <AdvocateTable advocates={advocates} />
      )}
    </main>
  );
}
