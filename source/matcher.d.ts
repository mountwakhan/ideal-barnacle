interface MatcherInterface {

  // number - The value must be == to the given number.
  // string - The value must be a string and have the expectation as a substring.
  // RegExp - The value must be a string and match the given regular expression.
  // any    - The value must be not null or undefined and have the all the expectation's properties.
  // Function -
  match(obj : (number|string|RegExp|Function|any));

  // Matches anything.
  isAny


// Requires the value to be defined.
isDefined

// Requires the value to be truthy.
isTrue

// Requires the value to be falsy.
isFalse

isBool
// Requires the value to be a boolean.
isNumber
// Requires the value to be a number.
isString
// Requires the value to be a string.

// Requires the value to be an object.
isObject

// Requires the value to be a function.
isFunc

// Requires the value to be an array.
isArray

// Requires the value to be a regular expression.
isRegexp

// Requires the value to be a date object.
isDate

// Requires the value to strictly equal ref.
isSame(ref)


isTypeOf(type)
// Requires the value to be of the given type, where type can be one of
// "undefined", "null", "boolean", "number", "string", "object", "function",
// "array", "regexp" or "date".

isInstanceOf(type)
// Requires the value to be an instance of the given type.

// Requires the value to define the given property.
itHas(property)


itHasOwn(property)
