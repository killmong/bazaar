import React from "react";

const InputField = (props) => {
  const {
    typeText,
    placeHolderText,
    name,
    onChangeFunction,
    tag,
    label,
    id,
    inputClass,
  } = props;
  return (
    <div className="flex flex-col gap-0">
      <label htmlFor={tag} className="text-base capitalize  text-black">
        {label}{" "}
      </label>
      <input
        type={typeText}
        placeholder={`Enter ${placeHolderText}`}
        name={name}
        id={id}
        required
        onChange={onChangeFunction}
        className={`outline-0  bg-transparent input ${inputClass}`}
      />
    </div>
  );
};

export default InputField;
