interface IMatcher {

  // returns the value
  value() : any;

  // The value must be == to the given value
  match(obj : any) : boolean;

  // Matches anything.
  isAny() : boolean;

  // Requires the value to be defined.
  isDefined() : boolean;

  // Requires the value to be truthy.
  isTruthy() : boolean;

  // Requires the value to be falsy.
  isFalsy() : boolean;

  // Requires the value to be of the given type, where type can be one of
  // "undefined", "null", "boolean", "number", "string", "object", "function",
  // "array", "regexp" or "date".
  isTypeOf(type) : boolean;

  // Requires the value to be a boolean.
  isBool() : boolean;

  // Requires the value to be a number.
  isNumber() : boolean;

  // Requires the value to be a string.
  isString() : boolean;

  // Requires the value to be an object.
  isObject() : boolean;

  // Requires the value to be a function.
  isFunc() : boolean;

  // Requires the value to be an array.
  isArray() : boolean;

  // Requires the value to be a regular expression.
  isRegexp() : boolean;

  // Requires the value to be a date object.
  isDate() : boolean;

  // Requires the value to strictly equal ref.
  isSame(ref) : boolean;

  // Requires the value to be an instance of the given type.
  isInstanceOf(type) : boolean;

  // Requires the value to define the given property.
  itHas(property) : boolean;

  // the property must be defined by the value itself. Inherited properties are ignored.
  itHasOwn(property) : boolean;
}
