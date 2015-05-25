///<reference path="../typings/tsd.d.ts" />
/// <reference path="../source/interfaces/type_checker.d.ts"/>

import TypeChecker = require("../source/type_checker");
import Matcher = require("../source/matcher");

var expect = chai.expect;

class Calculator {
  public sume(a : number, b : number) : number {
    return a + b;
  }
  public multiply(a : number, b : number) : number {
   return a * b;
  }
}

class ScientificCalculator extends Calculator {
  // Used to test itHasOwn, no need for real implementation.
  public sin(a : number) { return 0; }
  public cos(a : number) { return 0; }
  public tan(a : number) { return 0; }
}

describe("Matcher Class \n", () => {

  it('should be able to match any \n', () => {
    var m = new Matcher();
    expect(m.isAny(new TypeChecker(5))).to.be.true;
    expect(m.isAny(new TypeChecker("5"))).to.be.true;
  });

  it('should be able to match undefined \n', () => {
    var m = new Matcher();
    expect(m.isDefined(new TypeChecker(1))).to.be.true;
    expect(m.isDefined(new TypeChecker("test"))).to.be.true;
    expect(m.isDefined(new TypeChecker(false))).to.be.true;
    expect(m.isDefined(new TypeChecker({ test : "test" }))).to.be.true;
    expect(m.isDefined(new TypeChecker(null))).to.be.false;
    expect(m.isDefined(new TypeChecker(undefined))).to.be.false;
  });

  it('should be able to match something truthy \n', () => {
    var m = new Matcher();
    expect(m.isTruthy(new TypeChecker(1))).to.be.true;
    expect(m.isTruthy(new TypeChecker(2))).to.be.true;
    expect(m.isTruthy(new TypeChecker("test"))).to.be.true;
    expect(m.isTruthy(new TypeChecker(true))).to.be.true;
    expect(m.isTruthy(new TypeChecker({ test : "test" }))).to.be.true;
    expect(m.isTruthy(new TypeChecker(0))).to.be.false;
    expect(m.isTruthy(new TypeChecker(""))).to.be.false;
    expect(m.isTruthy(new TypeChecker(false))).to.be.false;
  });

  it('should be able to match something falsy \n', () => {
    var m = new Matcher();
    expect(m.isFalsy(new TypeChecker(0))).to.be.true;
    expect(m.isFalsy(new TypeChecker(""))).to.be.true;
    expect(m.isFalsy(new TypeChecker(false))).to.be.true;
    expect(m.isFalsy(new TypeChecker(1))).to.be.false;
    expect(m.isFalsy(new TypeChecker(2))).to.be.false;
    expect(m.isFalsy(new TypeChecker("test"))).to.be.false;
    expect(m.isFalsy(new TypeChecker(true))).to.be.false;
    expect(m.isFalsy(new TypeChecker({ test : "test" }))).to.be.false;
  });

  it('should be able to match a number \n', () => {
    var m = new Matcher();

    // using isTypeOf()
    var isTypeOfNumberMatcher = m.isTypeOf("number");
    expect(isTypeOfNumberMatcher(new TypeChecker(5))).to.be.true;
    expect(isTypeOfNumberMatcher(new TypeChecker("5"))).to.be.false;

    // using isNumber()
    expect(m.isNumber(new TypeChecker(5))).to.be.true;
    expect(m.isNumber(new TypeChecker("5"))).to.be.false;
  });

  it('should be able to match booleans \n', () => {
    var m = new Matcher();

    // using isTypeOf()
    var isTypeOfBooleanMatcher = m.isTypeOf("boolean");
    expect(isTypeOfBooleanMatcher(new TypeChecker(true))).to.be.true;
    expect(isTypeOfBooleanMatcher(new TypeChecker(false))).to.be.true;
    expect(isTypeOfBooleanMatcher(new TypeChecker("1"))).to.be.false;
    expect(isTypeOfBooleanMatcher(new TypeChecker(1))).to.be.false;

    // using isBool()
    expect(m.isBool(new TypeChecker(true))).to.be.true;
    expect(m.isBool(new TypeChecker(false))).to.be.true;
    expect(m.isBool(new TypeChecker("1"))).to.be.false;
    expect(m.isBool(new TypeChecker(1))).to.be.false;
  });

  it('should be able to match strings \n', () => {
    var m = new Matcher();

    // using isTypeOf()
    var isTypeOfStringMatcher = m.isTypeOf("string");
    expect(isTypeOfStringMatcher(new TypeChecker("test"))).to.be.true;
    expect(isTypeOfStringMatcher(new TypeChecker(true))).to.be.false;
    expect(isTypeOfStringMatcher(new TypeChecker({}))).to.be.false;
    expect(isTypeOfStringMatcher(new TypeChecker(1))).to.be.false;

    // using isString()
    expect(m.isString(new TypeChecker("test"))).to.be.true;
    expect(m.isString(new TypeChecker(true))).to.be.false;
    expect(m.isString(new TypeChecker({}))).to.be.false;
    expect(m.isString(new TypeChecker(1))).to.be.false;
  });

  it('should be able to match functions \n', () => {
    var m = new Matcher();

    // using isTypeOf()
    var isTypeOfFunctionMatcher = m.isTypeOf("function");
    expect(isTypeOfFunctionMatcher(new TypeChecker(function a() { return "b"; }))).to.be.true;
    expect(isTypeOfFunctionMatcher(new TypeChecker(true))).to.be.false;
    expect(isTypeOfFunctionMatcher(new TypeChecker({}))).to.be.false;
    expect(isTypeOfFunctionMatcher(new TypeChecker(1))).to.be.false;

    // using isFunc()
    expect(m.isFunc(new TypeChecker(function a() { return "b"; }))).to.be.true;
    expect(m.isFunc(new TypeChecker(true))).to.be.false;
    expect(m.isFunc(new TypeChecker({}))).to.be.false;
    expect(m.isFunc(new TypeChecker(1))).to.be.false;
  });

  it('should be able to match arrays \n', () => {
    var m = new Matcher();

    // using isTypeOf()
    var isTypeOfArrayMatcher = m.isTypeOf("array");
    expect(isTypeOfArrayMatcher(new TypeChecker([1,2,3]))).to.be.true;
    expect(isTypeOfArrayMatcher(new TypeChecker(true))).to.be.false;
    expect(isTypeOfArrayMatcher(new TypeChecker({}))).to.be.false;
    expect(isTypeOfArrayMatcher(new TypeChecker("[1,2,3]"))).to.be.false;

    // using isArray()
    expect(m.isArray(new TypeChecker([1,2,3]))).to.be.true;
    expect(m.isArray(new TypeChecker(true))).to.be.false;
    expect(m.isArray(new TypeChecker({}))).to.be.false;
    expect(m.isArray(new TypeChecker("[1,2,3]"))).to.be.false;
  });

  it('should be able to match objects \n', () => {
    var m = new Matcher();

    // using isTypeOf()
    var isTypeOfObjectMatcher = m.isTypeOf("object");
    expect(isTypeOfObjectMatcher(new TypeChecker({ test : "test" }))).to.be.true;
    expect(isTypeOfObjectMatcher(new TypeChecker([1,2,3]))).to.be.true;
    expect(isTypeOfObjectMatcher(new TypeChecker(new Date()))).to.be.true;
    expect(isTypeOfObjectMatcher(new TypeChecker(true))).to.be.false;
    expect(isTypeOfObjectMatcher(new TypeChecker("[1,2,3]"))).to.be.false;

    // using isObject()
    expect(m.isObject(new TypeChecker({ test : "test" }))).to.be.true;
    expect(m.isObject(new TypeChecker([1,2,3]))).to.be.true;
    expect(m.isObject(new TypeChecker(new Date()))).to.be.true;
    expect(m.isObject(new TypeChecker(true))).to.be.false;
    expect(m.isObject(new TypeChecker("[1,2,3]"))).to.be.false;
  });

  it('should be able to match dates \n', () => {
    var m = new Matcher();

    // using isTypeOf()
    var isTypeOfDateMatcher = m.isTypeOf("date");
    expect(isTypeOfDateMatcher(new TypeChecker(new Date()))).to.be.true;
    expect(isTypeOfDateMatcher(new TypeChecker({ test : "test" }))).to.be.false;
    expect(isTypeOfDateMatcher(new TypeChecker([1,2,3]))).to.be.false;
    expect(isTypeOfDateMatcher(new TypeChecker(true))).to.be.false;
    expect(isTypeOfDateMatcher(new TypeChecker("[1,2,3]"))).to.be.false;

    // using isDate()
    expect(m.isDate(new TypeChecker(new Date()))).to.be.true;
    expect(m.isDate(new TypeChecker({ test : "test" }))).to.be.false;
    expect(m.isDate(new TypeChecker([1,2,3]))).to.be.false;
    expect(m.isDate(new TypeChecker(true))).to.be.false;
    expect(m.isDate(new TypeChecker("[1,2,3]"))).to.be.false;
  });

  it('should be able to match regular expressions \n', () => {
    var m = new Matcher();

    // using isTypeOf()
    var isTypeOfRegExpMatcher = m.isTypeOf("regexp");
    expect(isTypeOfRegExpMatcher(new TypeChecker(new RegExp('ab+c', 'i')))).to.be.true;
    expect(isTypeOfRegExpMatcher(new TypeChecker({ test : "test" }))).to.be.false;
    expect(isTypeOfRegExpMatcher(new TypeChecker([1,2,3]))).to.be.false;
    expect(isTypeOfRegExpMatcher(new TypeChecker(true))).to.be.false;
    expect(isTypeOfRegExpMatcher(new TypeChecker("[1,2,3]"))).to.be.false;

    // using isDate()
    expect(m.isRegexp(new TypeChecker(new RegExp('ab+c', 'i')))).to.be.true;
    expect(m.isRegexp(new TypeChecker({ test : "test" }))).to.be.false;
    expect(m.isRegexp(new TypeChecker([1,2,3]))).to.be.false;
    expect(m.isRegexp(new TypeChecker(true))).to.be.false;
    expect(m.isRegexp(new TypeChecker("[1,2,3]"))).to.be.false;
  });

  it('should be able to match instances of a type \n', () => {
    var m = new Matcher();
    var r = new RegExp('ab+c', 'i');
    var d = new Date();
    var c = new Calculator();
    var cc = new ScientificCalculator();

    var isTypeOfRegExpMatcher = m.isInstanceOf(RegExp);
    expect(isTypeOfRegExpMatcher(new TypeChecker(r))).to.be.true;
    expect(isTypeOfRegExpMatcher(new TypeChecker(d))).to.be.false;
    expect(isTypeOfRegExpMatcher(new TypeChecker(c))).to.be.false;
    expect(isTypeOfRegExpMatcher(new TypeChecker(cc))).to.be.false;

    var isTypeOfDateMatcher = m.isInstanceOf(Date);
    expect(isTypeOfDateMatcher(new TypeChecker(d))).to.be.true;
    expect(isTypeOfDateMatcher(new TypeChecker(r))).to.be.false;
    expect(isTypeOfDateMatcher(new TypeChecker(c))).to.be.false;
    expect(isTypeOfDateMatcher(new TypeChecker(cc))).to.be.false;

    var isTypeOfCalculatorMatcher = m.isInstanceOf(Calculator);
    expect(isTypeOfCalculatorMatcher(new TypeChecker(cc))).to.be.true;
    expect(isTypeOfCalculatorMatcher(new TypeChecker(c))).to.be.true;
    expect(isTypeOfCalculatorMatcher(new TypeChecker(d))).to.be.false;
    expect(isTypeOfCalculatorMatcher(new TypeChecker(r))).to.be.false;

    var isTypeOfScientificCalculatorMatcher = m.isInstanceOf(ScientificCalculator);
    expect(isTypeOfScientificCalculatorMatcher(new TypeChecker(cc))).to.be.true;
    expect(isTypeOfScientificCalculatorMatcher(new TypeChecker(c))).to.be.false;
    expect(isTypeOfScientificCalculatorMatcher(new TypeChecker(d))).to.be.false;
    expect(isTypeOfScientificCalculatorMatcher(new TypeChecker(r))).to.be.false;
  });

  it('should be able to match strict equal objects \n');            // TODO
  it('should be able to match an object by its properties \n');     // TODO
  it('should be able to match an object by its own properties \n'); // TODO
  it('should be able to match basic types \n');                     // TODO
  it('should be able to match complex types \n');                   // TODO

});
