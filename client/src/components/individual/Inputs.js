export function InlineInput({
  label,
  type,
  htmlFor,
  required = false,
  id,
  placeholder = "",
  css
}) {
  return (

    <div className={`d-flex justify-content-center align-items-center ${css}`}>

    <label 
        className="text-right mr-2 w-25" 
        htmlFor={htmlFor}>
        {label}
    </label>

        <input
        id={id}
        type={type}
        className="d-inline w-60"
        required = {required}
        placeholder={placeholder}
        />
    </div>
  );
}

export function SelectInput({ options, id, htmlFor, label,css,attributes }) {
  return (
    <div className={`d-flex justify-content-center align-items-center ${css}`}>
      <label className="text-right mr-2 w-25" htmlFor={htmlFor}>
        {label}
      </label>

      <select name={htmlFor} id={id} className="w-60" required>
        {options.map((option) => {
          return (
            <option id={option[attributes.id]} value={option[attributes.value]}>
              {option[attributes.text]}
            </option>
          );
        })}
      </select>
    </div>
  );
}
