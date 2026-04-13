import Select from "react-select";

function DifficultyOptions({
  options,
  value,
  onChange,
  inputId,
  name,
  className,
}) {
  const selectedOption =
    options.find((option) => option.value === value) ?? null;

  return (
    <Select
      options={options}
      value={selectedOption}
      onChange={onChange}
      inputId={inputId}
      name={name}
      className={className}
      classNamePrefix="difficulty-select"
      isSearchable={false}
    />
  );
}

export default DifficultyOptions;
