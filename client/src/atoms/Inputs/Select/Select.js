import React, { useEffect , useState } from "react";

/**
 * 
 * @property {object[]} options - Options to display on the select
 * @returns {JSX.Element} 
 */
export default function Selection({
  options,
  value = null,
  label = null,
  name = null,
  id = null,
  defaultValue = null,
  errors = {},
  placeholder = true,
  disabled = false,
  placeholderText = 'Selecciona',
  forwardRef = () => {}
}) {

  const [selectValue,setSelectValue] = useState(null);

  useEffect(()=>{
    const htmlElement = document.getElementById(`option${id}${defaultValue}`);

    if(defaultValue===null || htmlElement===null) return;

    htmlElement.selected = true;

    setSelectValue(defaultValue);

  },[defaultValue,options]);

  const updateValue = (value) => {
    setSelectValue(value)
  }

  return (
    <>
      {(value !== null) & (label !== null) ? (
          <>
          <select 
            disabled = {disabled}
            name={name}
            id={id} 
            {...forwardRef(name)} 
            onClick = {(e)=>updateValue(e.target.value)}
          >

            {placeholder === true && defaultValue === null ? <>
            
              <option selected = {true} disabled = {true} value="">{placeholderText}</option>

            </> : null}

            {options.map((option) => (
              <option
                id = {`option${id}${option[value]}`} 
                value={option[value]}>{option[label]}</option>
            ))}
          </select>
          <p className="text-danger">{errors[name]?.['message']}</p>
          </>
      ) : null}
    </>
  );
}
