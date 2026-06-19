import { useState } from "react";

/**
 * Generic form-validation hook.
 * values: object of field values
 * validate: function(values) => errors object
 */
export function useFormValidation(initialValues, validate) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((v) => ({ ...v, [name]: value }));
  };

  const handleSubmit = (onValid) => (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitted(true);
    if (Object.keys(validationErrors).length === 0) {
      onValid(values);
    }
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setSubmitted(false);
  };

  return { values, errors, submitted, handleChange, handleSubmit, reset, setValues };
}
