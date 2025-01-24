import { GetAdvocateResponseContent } from "@/app/types";

interface Props {
  advocates: GetAdvocateResponseContent;
}

const AdvocateTable = ({ advocates }: Props) => (
  <table className="border-separate border-spacing-5 border border-gray-400 dark:border-gray-500 m-20">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>City</th>
        <th>Degree</th>
        <th>Specialties</th>
        <th>Years of Experience</th>
        <th>Phone Number</th>
      </tr>
    </thead>
    <tbody>
      {advocates.map(
        ({
          id,
          firstName,
          lastName,
          yearsOfExperience,
          phoneNumber,
          advocateSpecialties,
          advocateDegrees,
          advocateCities,
        }) => {
          return (
            <tr key={id}>
              <td>{firstName}</td>
              <td>{lastName}</td>
              <td>
                {advocateCities.map(({ city }) => (
                  <div key={`${id}-${city.name}`}>{city.name}</div>
                ))}
              </td>
              <td>
                {advocateDegrees.map(({ degree }) => (
                  // @ts-ignore
                  <div key={`${id}-${degree.value}`}>{degree.value}</div>
                ))}
              </td>
              <td>
                {advocateSpecialties.map(({ specialty }) => (
                  // @ts-ignore
                  <div key={`${id}-${specialty.value}`}>{specialty.value}</div>
                ))}
              </td>
              <td>{yearsOfExperience}</td>
              <td>{phoneNumber}</td>
            </tr>
          );
        }
      )}
    </tbody>
  </table>
);

export default AdvocateTable;
