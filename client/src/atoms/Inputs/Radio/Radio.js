import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

export default function Radio({
  id = null,
  name = null,
  forwardRef = () => {},
  errors = {},
  options = [],
  label = "",
  value = "",
  selected = null,
  disabled = false
}) {
  useEffect(() => {
    if (selected === null || options.length === 0) return;

    document.getElementById(`radio-${id}-${selected}`).checked = true;

  }, [selected,options]);

  return (
    <div id={id}>
      {options.map((option) => {
        const tempId = uuid();
        return (
          <div>
            <input
              disabled = {disabled}
              {...forwardRef(name)}
              type="radio"
              name={name}
              value={option[value]}
              id={`radio-${id}-${option[value]}`}
              key = {tempId}
            />
            <label htmlFor={tempId}>{option[label]}</label>
          </div>
        );
      })}

      <p className="text-danger">{errors[name]?.['message']}</p>
    </div>
  );
}
