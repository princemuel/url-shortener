export const getElement = (selector, scope, isList) => {
  const el = isList
    ? [...(scope || document).querySelectorAll(selector)]
    : (scope || document).querySelector(selector);

  if ((!isList && el) || (isList && !el.length < 1)) {
    return el;
  }
  throw new Error(`Element(s) not found with this selector ===> ${selector}`);
};

//isList can be set to true or left out of the function call
