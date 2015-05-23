/// <reference path="./interfaces/matcher.d.ts"/>
/// <reference path="./interfaces/type_checker.d.ts"/>

import TypeChecker = require("./type_checker");

// Check IMatcher (matcher.d.ts) for documentation.

class Matcher implements IMatcher {

  public isNumber : (a : ITypeChecker) => boolean;
  public isDefined : (a : ITypeChecker) => boolean;
  public isAny : (a : ITypeChecker) => boolean;
  public isTruthy : (a : ITypeChecker) => boolean;
  public isFalsy : (a : ITypeChecker) => boolean;
  public isBool : (a : ITypeChecker) => boolean;
  public isString : (a : ITypeChecker) => boolean;
  public isObject : (a : ITypeChecker) => boolean;
  public isFunc : (a : ITypeChecker) => boolean;
  public isArray : (a : ITypeChecker) => boolean;
  public isRegexp : (a : ITypeChecker) => boolean;
  public isDate : (a : ITypeChecker) => boolean;

  constructor() {
    this.isNumber = function(tc : ITypeChecker) {
      return tc.isNumber();
    }
    this.isDefined = function(tc : ITypeChecker) {
      return tc.isDefined();
    }
    this.isAny = function(tc : ITypeChecker) {
      return tc.isAny();
    }
    this.isTruthy = function(tc : ITypeChecker) {
      return tc.isTruthy();
    }
    this.isFalsy = function(tc : ITypeChecker) {
      return tc.isFalsy();
    }
    this.isBool = function(tc : ITypeChecker) {
      return tc.isFalsy();
    }
    this.isString = function(tc : ITypeChecker) {
      return tc.isFalsy();
    }
    this.isObject = function(tc : ITypeChecker) {
      return tc.isFalsy();
    }
    this.isFunc = function(tc : ITypeChecker) {
      return tc.isFalsy();
    }
    this.isArray = function(tc : ITypeChecker) {
      return tc.isFalsy();
    }
    this.isRegexp = function(tc : ITypeChecker) {
      return tc.isFalsy();
    }
    this.isDate = function(tc : ITypeChecker) {
      return tc.isFalsy();
    }
  }

  public match(a : any) : (a : ITypeChecker) => boolean {
    return function(tc : ITypeChecker) {
      return tc.match(a);
    }
  }

  public isTypeOf(a : string) : (a : ITypeChecker) => boolean {
    return function(tc : ITypeChecker) {
      return tc.match(a);
    }
  }

  public isSame(a : any) : (a : ITypeChecker) => boolean {
    return function(tc : ITypeChecker) {
      return tc.match(a);
    }
  }

  public isInstanceOf(a : any) : (a : ITypeChecker) => boolean {
    return function(tc : ITypeChecker) {
      return tc.match(a);
    }
  }

  public itHas(property : any) : (a : ITypeChecker) => boolean {
    return function(tc : ITypeChecker) {
      return tc.match(property);
    }
  }

  public itHasOwn(a : any) : (a : ITypeChecker) => boolean {
    return function(tc : ITypeChecker) {
      return tc.match(a);
    }
  }
}

export = Matcher;
