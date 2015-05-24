/// <reference path="./type_checker.d.ts"/>

/*
* Matchers are used an argument in some of the Spy and Call methods.
*
* someSpy.calledWith(AtSpy.matcher.isNumber);
* someSpy.calledWith(AtSpy.matcher.isInstanceOf(SomeClass));
* someSpy.firtCall().calledWith(AtSpy.matcher.isNumber);
* someSpy.firtCall().calledWith(AtSpy.matcher.isInstanceOf(SomeClass));
*
* Matche uses TypeChecker internally.
*
* Developers are allowed to create a custom Matcher. A custom Matcher is
* just a function that takes a TypeChequer as argument ans returns a boolean.
*
* var isOddMatcher =  function (tc) { return (tc.value() % 2) !== 0; }
* someSpy.calledWith(isOddMatcher);
*/

interface IMatcher {

  // Requires the value to be a number.
  isNumber : (a : ITypeChecker) => boolean;

  // Requires the value to be defined.
  isDefined : (a : ITypeChecker) => boolean;

  // Matches anything.
  isAny : (a : ITypeChecker) => boolean;

  // Requires the value to be truthy.
  isTruthy : (a : ITypeChecker) => boolean;

  // Requires the value to be falsy.
  isFalsy : (a : ITypeChecker) => boolean;

  // Requires the value to be a boolean.
  isBool : (a : ITypeChecker) => boolean;

  // Requires the value to be a string.
  isString : (a : ITypeChecker) => boolean;

  // Requires the value to be an object.
  isObject : (a : ITypeChecker) => boolean;

  // Requires the value to be a function.
  isFunc : (a : ITypeChecker) => boolean;

  // Requires the value to be an array.
  isArray : (a : ITypeChecker) => boolean;

  // Requires the value to be a regular expression.
  isRegexp : (a : ITypeChecker) => boolean;

  // Requires the value to be a date object.
  isDate : (a : ITypeChecker) => boolean;

  // The value must be == to the given value.
  match(a : any) : (a : ITypeChecker) => boolean;

  // Requires the value to be of the given type, where type can be one of
  // "undefined", "null", "boolean", "number", "string", "object", "function",
  // "array", "regexp" or "date".
  isTypeOf(a : string) : (a : ITypeChecker) => boolean;

  // Requires the value to strictly equal ref.
  isSame(a : any) : (a : ITypeChecker) => boolean;

  // Requires the value to be an instance of the given type.
  isInstanceOf(a : any) : (a : ITypeChecker) => boolean;

  // Requires the value to define the given property.
  itHas(property : string) : (a : ITypeChecker) => boolean;

  // The property must be defined by the value itself. Inherited properties are ignored.
  itHasOwn(a : string) : (a : ITypeChecker) => boolean;
}
