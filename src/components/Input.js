import styled from "styled-components";

const BaseInput = styled.input`
  padding: 2px;
`;

export default function Input({
  value,
  onChange,
  className,
  id,
  name,
  type,
  autoComplete,
}) {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <BaseInput
      id={id}
      name={name}
      type={type}
      autoComplete={autoComplete}
      value={value}
      onChange={handleChange}
      className={className}
    />
  );
}

Input.defaultProps = {
  type: "text",
};
