import { useEffect, useState } from 'react';

const useFormInput = (initialValue) => {
  const [value, setValue] = useState(initialValue);

  function handleChange(e) {
    setValue(e.target.value);
  }

  useEffect(() => {
    setValue(initialValue.trim());
  });

  return {
    value,
    onChange: handleChange,
    helperText: value !== '' && value !== null ? null : 'Please fill in this field',
  };
};

export default useFormInput;
