const Common = {};

Common.validAny = any => any !== null && any !== undefined;
Common.validArray = arr => Array.isArray(arr) && arr.length > 0;
Common.validString = str => Common.validAny(str) && str && str.toLowerCase() !== 'null' && str.toLowerCase() !== 'undefined' && str.trim().length > 0;
Common.validNumber = num => Common.validAny(num);
Common.validId = num => Common.validAny(num) && num > 0;

Common.toQuery = params => Object.keys(params)
    .filter(key => Common.validAny(params[key]))
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    .join('&');

export default Common;