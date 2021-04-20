// https://underscorejs.org/#isObject
const isObject = something => something === Object(something);

const transformKey = key => {
  if (!isNaN(key)) {
    return key;
  }

  const pos = key.indexOf('_');

  return pos === 0 || pos === -1
    ? key
    : key
        .split('_')
        .reduce((acc, s, index) => `${acc}${index > 0 ? `${s.charAt(0).toUpperCase()}${s.slice(1)}` : s}`, '');
};

export const transformRecursively = input => {
  if (!isObject(input)) {
    return input;
  }

  const baseSubject = Array.isArray(input) ? [] : {};

  return Object.keys(input).reduce((obj, key) => {
    obj[transformKey(key)] = transformRecursively(input[key]);

    return obj;
  }, baseSubject);
};

export default async responsePromise => {
  const response = await responsePromise;

  return transformRecursively(response);
};
