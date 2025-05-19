import React from "react";

const InputField = ({
  typeText = "text",
  placeHolderText = "",
  name,
  label,
  id,
  inputClass = "",
  register,
  errors,
  validationRules = {},
}) => {
  return (
    <div className="flex flex-col gap-0 mb-4">
      <label htmlFor={id || name} className="text-base capitalize text-black">
        {label}
      </label>
      <input
        type={typeText}
        placeholder={`Enter ${placeHolderText}`}
        name={name}
        id={id || name}
        className={`outline-0 bg-transparent input ${inputClass} ${
          errors?.[name] ? "border-red-500" : ""
        }`}
        {...register(name, validationRules)}
      />
      {errors?.[name] && (
        <span className="text-red-500 text-sm mt-1">
          {errors[name].message}
        </span>
      )}
    </div>
  );
};

export default InputField;
