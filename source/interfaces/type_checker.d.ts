/*
* TypeChecker is used to wrap values with some of utilities.
* When a funciton being observed by a Spy is invoked a new
* instance of Call is created. Some of the details a about the
* function Call (eg. returnValue) are wrapped with a TypeChecker.
*
* TypeChecker are also used when we work with a Marcher.
*/

interface ITypeChecker {

  // returns the value.
  value() : any;

  // The value must be == to the given value.
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
  isTypeOf(t : string) : boolean;

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
  isInstanceOf(a : any) : boolean;

  // Requires the value to define the given property.
  itHas(property) : boolean;

  // The property must be defined by the value itself. Inherited properties are ignored.
  itHasOwn(property) : boolean;
}
