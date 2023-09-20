import styled from "styled-components";

const BaseInput = styled.input`
  padding: 2px;
`;

export default function Input({ value, onChange, className }) {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <BaseInput value={value} onChange={handleChange} className={className} />
  );
}
