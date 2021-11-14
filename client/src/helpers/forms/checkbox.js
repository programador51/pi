/**
 * Get the value of checkboxes
 * @param {string} container - ID attribute of the html elemento on the DOM where are the checkboxes
 * @returns {object[]} Values of the checkboxes
 */
export const getCheckValues = (container) => {

    const objCheckbox = (key, value) => ({
        noCheckbox: key,
        isChecked: value.checked,
        id: value.id,
        name: value.name,
        value: value.value
    });

    const createArray = (element, value) => element.push(value);

    let elements = [];

    const checkboxes = document.querySelectorAll(`#${container} input[type=checkbox]`);

    checkboxes.forEach((value, key) => createArray(elements, objCheckbox(key, value)));

    return elements;
}