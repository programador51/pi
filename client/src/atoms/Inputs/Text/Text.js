import React, { useEffect } from "react";
import Container from "./Styles";

export function Text({
  placeholder = "Escribe aqui",
  name = null,
  id = null,
  defaultValue = null,
  forwardRef = () => {},
  errors = {},
  readOnly = false
}) {
  useEffect(() => {
    if (defaultValue === null) return;

    const htmlElement = document.getElementById(id);

    if (htmlElement === null || htmlElement === undefined) return;

    htmlElement.value = defaultValue;
  }, [defaultValue]);

  return (
    <Container>
      <input
        readOnly = {readOnly}
        {...forwardRef(name)}
        name={name}
        id={id}
        type="text"
        placeholder={placeholder}
      />
    <p className="text-danger">{errors?.[name]?.['message']}</p>
    </Container>
  );
}
