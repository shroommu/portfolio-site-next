import styled from "styled-components";

const BaseInput = styled.textarea`
  padding: 2px;
  max-height: 300px;
  min-height: 100px;
  resize: vertical;
`;

export default function TextArea({ value, onChange, className, id, name }) {
  const handleChange = (e) => {
    const { value } = e.target;
    onChange(value);
  };

  return (
    <BaseInput
      id={id}
      name={name}
      value={value}
      onChange={handleChange}
      className={className}
    />
  );
}
