import { TextInput } from "@ryanbrandt/react-quick-ui";
import { AdvocateSearchFormValuesAndSetters } from "@/app/hooks/useAdvocateSearchForm";

interface Props {
  formState: AdvocateSearchFormValuesAndSetters;
}
const AdvocateSearchForm = ({ formState }: Props) => {
  const { firstName, lastName, degree, city, specialties } = formState;

  return (
    <form
      className="flex flex-col items-center gap-10"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <div className="flex flex-row gap-10">
        <TextInput
          label="First Name"
          value={firstName.value}
          onChange={firstName.setter}
        />
        <TextInput
          label="Last Name"
          value={lastName.value}
          onChange={lastName.setter}
        />
        <TextInput label="City" value={city.value} onChange={city.setter} />
        <TextInput
          label="Degree"
          value={degree.value}
          onChange={degree.setter}
        />
        <TextInput
          label="Specialties (Comma-separated)"
          value={specialties.value}
          onChange={specialties.setter}
        />
      </div>
    </form>
  );
};

export default AdvocateSearchForm;
