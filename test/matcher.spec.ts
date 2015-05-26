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

  it('should be able to match strict equal objects \n', () => {
    var r = new RegExp('ab+c', 'i');
    var d = new Date();
    var o = { test : "test" };
    var co = { test : { test : "test" } };
    var m = new Matcher();

    var isSameRegExMatcher = m.isSame(r);
    expect(isSameRegExMatcher(new TypeChecker(r))).to.be.true;
    expect(isSameRegExMatcher(new TypeChecker(d))).to.be.false;
    expect(isSameRegExMatcher(new TypeChecker(o))).to.be.false;
    expect(isSameRegExMatcher(new TypeChecker(co))).to.be.false;

    var isSameDateMatcher = m.isSame(d);
    expect(isSameDateMatcher(new TypeChecker(d))).to.be.true;
    expect(isSameDateMatcher(new TypeChecker(r))).to.be.false;
    expect(isSameDateMatcher(new TypeChecker(o))).to.be.false;
    expect(isSameDateMatcher(new TypeChecker(co))).to.be.false;

    var isSameObjectMatcher = m.isSame(o);
    expect(isSameObjectMatcher(new TypeChecker(co))).to.be.false;
    expect(isSameObjectMatcher(new TypeChecker(o))).to.be.true;
    expect(isSameObjectMatcher(new TypeChecker(d))).to.be.false;
    expect(isSameObjectMatcher(new TypeChecker(r))).to.be.false;

    var isSameComplexObjectCalculatorMatcher = m.isSame(co);
    expect(isSameComplexObjectCalculatorMatcher(new TypeChecker(co))).to.be.true;
    expect(isSameComplexObjectCalculatorMatcher(new TypeChecker(o))).to.be.false;
    expect(isSameComplexObjectCalculatorMatcher(new TypeChecker(d))).to.be.false;
    expect(isSameComplexObjectCalculatorMatcher(new TypeChecker(r))).to.be.false;
  });

  it('should be able to match an object by its properties \n', () => {
    var m = new Matcher();
    var c = new Calculator();
    var cc = new ScientificCalculator();

    var itHasMultiplyMatcher = m.itHas("multiply");
    expect(itHasMultiplyMatcher(new TypeChecker(c))).to.be.true;
    expect(itHasMultiplyMatcher(new TypeChecker(cc))).to.be.true;

    var itHasSumeMatcher = m.itHas("sume");
    expect(itHasSumeMatcher(new TypeChecker(c))).to.be.true;
    expect(itHasSumeMatcher(new TypeChecker(cc))).to.be.true;

    var itHasToStringMatcher = m.itHas("toString");
    expect(itHasToStringMatcher(new TypeChecker(c))).to.be.true;
    expect(itHasToStringMatcher(new TypeChecker(cc))).to.be.true;

    var itHasSinMatcher = m.itHas("sin");
    expect(itHasSinMatcher(new TypeChecker(c))).to.be.false;
    expect(itHasSinMatcher(new TypeChecker(cc))).to.be.true;

    var itHasCosMatcher = m.itHas("cos");
    expect(itHasCosMatcher(new TypeChecker(c))).to.be.false;
    expect(itHasCosMatcher(new TypeChecker(cc))).to.be.true;

    var itHasTanMatcher = m.itHas("tan");
    expect(itHasTanMatcher(new TypeChecker(c))).to.be.false;
    expect(itHasTanMatcher(new TypeChecker(cc))).to.be.true;
  });

  it('should be able to match an object by its own properties \n', () => {
    var m = new Matcher();
    var c = new Calculator();
    var cc = new ScientificCalculator();

    var itHasOwnMultiplyMatcher = m.itHasOwn("multiply");
    expect(itHasOwnMultiplyMatcher(new TypeChecker(c))).to.be.false;
    expect(itHasOwnMultiplyMatcher(new TypeChecker(cc))).to.be.false;

    var itHasOwnSumeMatcher = m.itHasOwn("sume");
    expect(itHasOwnSumeMatcher(new TypeChecker(c))).to.be.false;
    expect(itHasOwnSumeMatcher(new TypeChecker(cc))).to.be.false;

    var itHasOwnToStringMatcher = m.itHasOwn("toString");
    expect(itHasOwnToStringMatcher(new TypeChecker(c))).to.be.false;
    expect(itHasOwnToStringMatcher(new TypeChecker(cc))).to.be.false;

    var itHasOwnSinMatcher = m.itHasOwn("sin");
    expect(itHasOwnSinMatcher(new TypeChecker(c))).to.be.false;
    expect(itHasOwnSinMatcher(new TypeChecker(cc))).to.be.false;

    var itHasOwnCosMatcher = m.itHasOwn("cos");
    expect(itHasOwnCosMatcher(new TypeChecker(c))).to.be.false;
    expect(itHasOwnCosMatcher(new TypeChecker(cc))).to.be.false;

    var itHasOwnTanMatcher = m.itHasOwn("tan");
    expect(itHasOwnTanMatcher(new TypeChecker(c))).to.be.false;
    expect(itHasOwnTanMatcher(new TypeChecker(cc))).to.be.false;

    var test  = { test : "test" };
    var itHasOwnTestMatcher = m.itHasOwn("test");
    expect(itHasOwnTanMatcher(new TypeChecker(test))).to.be.false;
  });

  it('should be able to match basic types \n', () => {
    var m = new Matcher();

    // numbers
    var numberMatcher = m.match(1);
    expect(numberMatcher(new TypeChecker(1))).to.be.true;
    expect(numberMatcher(new TypeChecker(1))).to.be.true;
    expect(numberMatcher(new TypeChecker("1"))).to.be.false;
    expect(numberMatcher(new TypeChecker(2))).to.be.false;
    expect(numberMatcher(new TypeChecker(new Date()))).to.be.false;

    // booleans
    var booleanMatcher = m.match(true);
    expect(booleanMatcher(new TypeChecker(true))).to.be.true;
    expect(booleanMatcher(new TypeChecker(false))).to.be.false;
    expect(booleanMatcher(new TypeChecker("true"))).to.be.false;
    expect(booleanMatcher(new TypeChecker(new Date()))).to.be.false;

    // strings
    var stringMatcher = m.match("test");
    expect(stringMatcher(new TypeChecker("test"))).to.be.true;
    expect(stringMatcher(new TypeChecker("test "))).to.be.false;
    expect(stringMatcher(new TypeChecker(false))).to.be.false;
    expect(stringMatcher(new TypeChecker(function(){}))).to.be.false;

    // null
    var nullMatcher = m.match(null);
    expect(nullMatcher(new TypeChecker(null))).to.be.true;
    expect(nullMatcher(new TypeChecker(undefined))).to.be.false;
    expect(nullMatcher(new TypeChecker(new Date()))).to.be.false;

    // undefined
    var undefinedMatcher = m.match(undefined);
    expect(undefinedMatcher(new TypeChecker(undefined))).to.be.true;
    expect(undefinedMatcher(new TypeChecker(null))).to.be.false;
    expect(undefinedMatcher(new TypeChecker(function(){}))).to.be.false;

    // regexp
    var regexpMatcher = m.match(new RegExp('ab+c', 'i'));
    expect(regexpMatcher(new TypeChecker(new RegExp('ab+c', 'i')))).to.be.true;
    expect(regexpMatcher(new TypeChecker(new RegExp('aa+c', 'i')))).to.be.false;
    expect(regexpMatcher(new TypeChecker(1))).to.be.false;
    expect(regexpMatcher(new TypeChecker("test"))).to.be.false;

    // date
    var d = new Date(1989,1,13,4,3,1);
    var dateMatcher = m.match(d);
    expect(dateMatcher(new TypeChecker(d))).to.be.true;
    expect(dateMatcher(new TypeChecker(new Date(1989,1,13,4,3,2)))).to.be.false;
    expect(dateMatcher(new TypeChecker({ getTime : "fake" }))).to.be.false;

    // functions
    var functionMatcher = m.match(function(){ return 5; });
    expect(functionMatcher(new TypeChecker(function(){ return 5; }))).to.be.true;
    expect(functionMatcher(new TypeChecker(function(){ return 6; }))).to.be.false;
    expect(functionMatcher(new TypeChecker(function a(){ return 5; }))).to.be.false;

    // array
    var arrayMatcher = m.match([1,2,3]);
    expect(arrayMatcher(new TypeChecker([1,2,3]))).to.be.true;
    expect(arrayMatcher(new TypeChecker([1,3,2]))).to.be.false;
    expect(arrayMatcher(new TypeChecker("[1,3,2]"))).to.be.false;
    expect(arrayMatcher(new TypeChecker(true))).to.be.false;
  });

  it('should be able to match complex types \n', () => {
    var c1 = new Calculator();
    var c2 = new Calculator();
    var cc1 = new ScientificCalculator();
    var cc2 = new ScientificCalculator();
    var cc3 = new ScientificCalculator();
    (<any>cc3).PI = 3.141516;

    // objects
    var m = new Matcher();
    var c1Matcher = m.match(c1);
    var c2Matcher = m.match(c2);
    expect(c1Matcher(new TypeChecker(c1))).to.be.true;
    expect(c2Matcher(new TypeChecker(c1))).to.be.true;
    expect(c2Matcher(new TypeChecker(cc1))).to.be.false;

    var cc1Matcher = m.match(cc1);
    var cc2Matcher = m.match(cc2);
    expect(cc1Matcher(new TypeChecker(cc1))).to.be.true;
    expect(cc1Matcher(new TypeChecker(cc2))).to.be.true;
    expect(cc2Matcher(new TypeChecker(cc3))).to.be.false;

    // arrays of objects
    var a1 = [c1,cc1,cc3];
    var a2 = [c1,cc1,cc3];
    var a3 = [c1,cc3,cc1];
    var a4 = [c1,c2,cc2];
    var a1Matcher = m.match(a1);
    expect(a1Matcher(new TypeChecker(a1))).to.be.true;
    expect(a1Matcher(new TypeChecker(a2))).to.be.true;
    expect(a1Matcher(new TypeChecker(a3))).to.be.false;
    expect(a1Matcher(new TypeChecker(a4))).to.be.false;
  });
});
