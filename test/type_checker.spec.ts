///<reference path="../typings/tsd.d.ts" />

import TypeChecker = require("../source/type_checker");

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

describe("TypeChecker Class \n", () => {

  it('should set value correctly when instanciated \n', () => {
    var m = new TypeChecker(1);
    expect(m.value()).to.equal(1);
    expect(m.value()).to.be.a("number");
  });

  it('should be able to check the type of any \n', () => {
    expect(new TypeChecker(1).isAny()).to.equal(true);
    expect(new TypeChecker("test").isAny()).to.equal(true);
    expect(new TypeChecker(false).isAny()).to.equal(true);
    expect(new TypeChecker({ test : "test" }).isAny()).to.equal(true);
  });

  it('should be able to identify undefined \n', () => {
    expect(new TypeChecker(1).isDefined()).to.equal(true);
    expect(new TypeChecker("test").isDefined()).to.equal(true);
    expect(new TypeChecker(false).isDefined()).to.equal(true);
    expect(new TypeChecker({ test : "test" }).isDefined()).to.equal(true);
    expect(new TypeChecker(null).isDefined()).to.equal(false);
    expect(new TypeChecker(undefined).isDefined()).to.equal(false);
  });

  it('should be able to identify when something is truthy \n', () => {
    expect(new TypeChecker(0).isTruthy()).to.equal(false);
    expect(new TypeChecker(1).isTruthy()).to.equal(true);
    expect(new TypeChecker(2).isTruthy()).to.equal(true);
    expect(new TypeChecker("").isTruthy()).to.equal(false);
    expect(new TypeChecker("test").isTruthy()).to.equal(true);
    expect(new TypeChecker(true).isTruthy()).to.equal(true);
    expect(new TypeChecker(false).isTruthy()).to.equal(false);
    expect(new TypeChecker({ test : "test" }).isTruthy()).to.equal(true);
  });

  it('should be able to identify when something is falsy \n', () => {
    expect(new TypeChecker(0).isFalsy()).to.equal(true);
    expect(new TypeChecker(1).isFalsy()).to.equal(false);
    expect(new TypeChecker(2).isFalsy()).to.equal(false);
    expect(new TypeChecker("").isFalsy()).to.equal(true);
    expect(new TypeChecker("test").isFalsy()).to.equal(false);
    expect(new TypeChecker(true).isFalsy()).to.equal(false);
    expect(new TypeChecker(false).isFalsy()).to.equal(true);
    expect(new TypeChecker({ test : "test" }).isFalsy()).to.equal(false);
  });

  it('should be able to identify numbers \n', () => {

    // using isTypeOf()
    expect(new TypeChecker(0).isTypeOf("number")).to.equal(true);
    expect(new TypeChecker(0).isTypeOf("boolean")).to.equal(false);

    // using isNumber()
    expect(new TypeChecker(1).isNumber()).to.equal(true);
    expect(new TypeChecker("1").isNumber()).to.equal(false);
  });

  it('should be able to identify booleans \n', () => {

    // using isTypeOf()
    expect(new TypeChecker(true).isTypeOf("boolean")).to.equal(true);
    expect(new TypeChecker({}).isTypeOf("boolean")).to.equal(false);

    // using isBool()
    expect(new TypeChecker(true).isBool()).to.equal(true);
    expect(new TypeChecker(false).isBool()).to.equal(true);
    expect(new TypeChecker("true").isBool()).to.equal(false);
  });

  it('should be able to identify strings \n', () => {

    // using isTypeOf()
    expect(new TypeChecker("hello!").isTypeOf("string")).to.equal(true);
    expect(new TypeChecker({}).isTypeOf("string")).to.equal(false);

    // using isString()
    expect(new TypeChecker("").isString()).to.equal(true);
    expect(new TypeChecker("hello!").isString()).to.equal(true);
    expect(new TypeChecker({}).isString()).to.equal(false);
  });

  it('should be able to identify functions \n', () => {

    // using isTypeOf()
    expect(new TypeChecker(function foo(){}).isTypeOf("function")).to.equal(true);
    expect(new TypeChecker({}).isTypeOf("function")).to.equal(false);
    expect(new TypeChecker(function foo(){}).isFunc()).to.equal(true);

    // using isFunc()
    expect(new TypeChecker(1).isFunc()).to.equal(false);
    expect(new TypeChecker({}).isFunc()).to.equal(false);
  });

  it('should be able to identify arrays \n', () => {

    // using isTypeOf()
    expect(new TypeChecker([]).isTypeOf("array")).to.equal(true);
    expect(new TypeChecker([1,2,3]).isTypeOf("array")).to.equal(true);
    expect(new TypeChecker(function foo(){}).isTypeOf("array")).to.equal(false);

    // using isArray()
    expect(new TypeChecker([]).isArray()).to.equal(true);
    expect(new TypeChecker([1,2,3]).isArray()).to.equal(true);
    expect(new TypeChecker({ 1 : 1, 2 : 2 }).isArray()).to.equal(false);
    expect(new TypeChecker(true).isArray()).to.equal(false);
  });

  it('should be able to identify objects \n', () => {

    // using isTypeOf()
    expect(new TypeChecker(new Date()).isTypeOf("object")).to.equal(true);
    expect(new TypeChecker(new RegExp('ab+c', 'i')).isTypeOf("object")).to.equal(true);
    expect(new TypeChecker({ test : "test" }).isTypeOf("object")).to.equal(true);
    expect(new TypeChecker([1,2,3]).isTypeOf("object")).to.equal(true);
    expect(new TypeChecker("test").isTypeOf("object")).to.equal(false);
    expect(new TypeChecker(1).isTypeOf("object")).to.equal(false);
    expect(new TypeChecker(true).isTypeOf("object")).to.equal(false);

    // using isObject()
    expect(new TypeChecker(new Date()).isObject()).to.equal(true);
    expect(new TypeChecker(new RegExp('ab+c', 'i')).isObject()).to.equal(true);
    expect(new TypeChecker({ test : "test" }).isObject()).to.equal(true);
    expect(new TypeChecker([1,2,3]).isObject()).to.equal(true);
    expect(new TypeChecker("test").isObject()).to.equal(false);
    expect(new TypeChecker(1).isObject()).to.equal(false);
    expect(new TypeChecker(true).isObject()).to.equal(false);
  });

  it('should be able to identify dates \n', () => {

    // using isTypeOf()
    expect(new TypeChecker(new Date()).isTypeOf("date")).to.equal(true);
    expect(new TypeChecker(function foo(){}).isTypeOf("date")).to.equal(false);
    expect(new TypeChecker(1).isTypeOf("date")).to.equal(false);
    expect(new TypeChecker({}).isTypeOf("date")).to.equal(false);

    // using isDate()
    expect(new TypeChecker(new Date()).isDate()).to.equal(true);
    expect(new TypeChecker(function foo(){}).isDate()).to.equal(false);
    expect(new TypeChecker(1).isDate()).to.equal(false);
    expect(new TypeChecker({}).isDate()).to.equal(false);
  });

  it('should be able to identify regular expressions \n', () => {

    // using isTypeOf()
    expect(new TypeChecker(new RegExp('ab+c', 'i')).isTypeOf("regexp")).to.equal(true);
    expect(new TypeChecker(new Date()).isTypeOf("regexp")).to.equal(false);
    expect(new TypeChecker(function foo(){}).isTypeOf("regexp")).to.equal(false);
    expect(new TypeChecker(1).isTypeOf("regexp")).to.equal(false);
    expect(new TypeChecker({}).isTypeOf("regexp")).to.equal(false);

    // using isRegExp()
    expect(new TypeChecker(new RegExp('ab+c', 'i')).isRegexp()).to.equal(true);
    expect(new TypeChecker(new Date()).isRegexp()).to.equal(false);
    expect(new TypeChecker(function foo(){}).isRegexp()).to.equal(false);
    expect(new TypeChecker(1).isRegexp()).to.equal(false);
    expect(new TypeChecker({}).isRegexp()).to.equal(false);
  });

  it('should be able to identify strict equal objects \n', () => {
    var r = new RegExp('ab+c', 'i');
    var d = new Date();
    var o = { test : "test" };
    var co = { test : { test : "test" } };
    expect(new TypeChecker(r).isSame(r)).to.equal(true);
    expect(new TypeChecker(r).isSame(new RegExp('ab+c', 'i'))).to.equal(false);
    expect(new TypeChecker(d).isSame(d)).to.equal(true);
    expect(new TypeChecker(d).isSame(new Date())).to.equal(false);
    expect(new TypeChecker(1).isSame(1)).to.equal(true);
    expect(new TypeChecker(1).isSame(2)).to.equal(false);
    expect(new TypeChecker(o).isSame(o)).to.equal(true);
    expect(new TypeChecker(o).isSame({ test : "test" })).to.equal(false);
    expect(new TypeChecker(o).isSame({ test : "test1" })).to.equal(false);
    expect(new TypeChecker(co).isSame(co)).to.equal(true);
    expect(new TypeChecker(co).isSame({ test : { test : "test" } })).to.equal(false);
    expect(new TypeChecker(co).isSame({ test : { test : "test1" } })).to.equal(false);
  });

  it('should be able to identify instances of a type \n', () => {
    var r = new RegExp('ab+c', 'i');
    var d = new Date();
    var c = new Calculator();
    var cc = new ScientificCalculator();

    expect(new TypeChecker(r).isInstanceOf(RegExp)).to.equal(true);
    expect(new TypeChecker(r).isInstanceOf(Date)).to.equal(false);
    expect(new TypeChecker(r).isInstanceOf(Calculator)).to.equal(false);

    expect(new TypeChecker(d).isInstanceOf(Date)).to.equal(true);
    expect(new TypeChecker(d).isInstanceOf(RegExp)).to.equal(false);
    expect(new TypeChecker(d).isInstanceOf(Calculator)).to.equal(false);

    expect(new TypeChecker(c).isInstanceOf(Calculator)).to.equal(true);
    expect(new TypeChecker(c).isInstanceOf(ScientificCalculator)).to.equal(false);
    expect(new TypeChecker(c).isInstanceOf(RegExp)).to.equal(false);
    expect(new TypeChecker(c).isInstanceOf(Date)).to.equal(false);

    expect(new TypeChecker(cc).isInstanceOf(Calculator)).to.equal(true);
    expect(new TypeChecker(cc).isInstanceOf(ScientificCalculator)).to.equal(true);
    expect(new TypeChecker(cc).isInstanceOf(RegExp)).to.equal(false);
    expect(new TypeChecker(cc).isInstanceOf(Date)).to.equal(false);
  });

  it('should be able to identify the properties of an object \n', () => {
    var c = new Calculator();
    expect(new TypeChecker(c).itHas("multiply")).to.equal(true);
    expect(new TypeChecker(c).itHas("sume")).to.equal(true);
    expect(new TypeChecker(c).itHas("toString")).to.equal(true);
    expect(new TypeChecker(c).itHas("sin")).to.equal(false);
    expect(new TypeChecker(c).itHas("cos")).to.equal(false);
    expect(new TypeChecker(c).itHas("tan")).to.equal(false);

    var cc = new ScientificCalculator();
    expect(new TypeChecker(cc).itHas("multiply")).to.equal(true);
    expect(new TypeChecker(cc).itHas("sume")).to.equal(true);
    expect(new TypeChecker(cc).itHas("toString")).to.equal(true);
    expect(new TypeChecker(cc).itHas("sin")).to.equal(true);
    expect(new TypeChecker(cc).itHas("cos")).to.equal(true);
    expect(new TypeChecker(cc).itHas("tan")).to.equal(true);
  });

  it('should be able to identify the own properties of an object \n', () => {
    var c = new Calculator();
    expect(new TypeChecker(c).itHasOwn("multiply")).to.equal(false);
    expect(new TypeChecker(c).itHasOwn("sume")).to.equal(false);
    expect(new TypeChecker(c).itHasOwn("toString")).to.equal(false);
    expect(new TypeChecker(c).itHasOwn("sin")).to.equal(false);
    expect(new TypeChecker(c).itHasOwn("cos")).to.equal(false);
    expect(new TypeChecker(c).itHasOwn("tan")).to.equal(false);

    var cc = new ScientificCalculator();
    expect(new TypeChecker(cc).itHasOwn("multiply")).to.equal(false);
    expect(new TypeChecker(cc).itHasOwn("sume")).to.equal(false);
    expect(new TypeChecker(cc).itHasOwn("toString")).to.equal(false);
    expect(new TypeChecker(cc).itHasOwn("sin")).to.equal(false);
    expect(new TypeChecker(cc).itHasOwn("cos")).to.equal(false);
    expect(new TypeChecker(cc).itHasOwn("tan")).to.equal(false);

    var test  = { test : "test" };
    expect(new TypeChecker(test).itHas("test")).to.equal(true);
  });

  it('should be able to match basic types \n', () => {

    // numbers
    expect(new TypeChecker(1).match(1)).to.equal(true);
    expect(new TypeChecker(1).match("1")).to.equal(false);
    expect(new TypeChecker(1).match(2)).to.equal(false);
    expect(new TypeChecker(1).match(new Date())).to.equal(false);

    // booleans
    expect(new TypeChecker(true).match(true)).to.equal(true);
    expect(new TypeChecker(true).match("true")).to.equal(false);
    expect(new TypeChecker(true).match(false)).to.equal(false);
    expect(new TypeChecker(true).match(function(){})).to.equal(false);

    // strings
    expect(new TypeChecker("test").match("test")).to.equal(true);
    expect(new TypeChecker("test").match("test ")).to.equal(false);
    expect(new TypeChecker("test").match(false)).to.equal(false);
    expect(new TypeChecker("test").match(function(){})).to.equal(false);

    // null & undefined
    expect(new TypeChecker(null).match(null)).to.equal(true);
    expect(new TypeChecker(undefined).match(undefined)).to.equal(true);
    expect(new TypeChecker(null).match(undefined)).to.equal(false);
    expect(new TypeChecker(null).match(function(){})).to.equal(false);

    // regexp
    expect(new TypeChecker(new RegExp('ab+c', 'i')).match(new RegExp('ab+c', 'i'))).to.equal(true);
    expect(new TypeChecker(new RegExp('ab+c', 'i')).match(new RegExp('aa+c', 'i'))).to.equal(false);
    expect(new TypeChecker(1).match(new RegExp('ab+c', 'i'))).to.equal(false);
    expect(new TypeChecker("test").match(new RegExp('ab+c', 'i'))).to.equal(false);

    // dates
    var d = new Date(1989,1,13,4,3,1);
    expect(new TypeChecker(d).match(d)).to.equal(true);
    expect(new TypeChecker(new Date(1989,1,13,4,3,2)).match(d)).to.equal(false);
    expect(new TypeChecker("date").match(d)).to.equal(false);

    // arrays
    expect(new TypeChecker([1,2,3]).match([1,2,3])).to.equal(true);
    expect(new TypeChecker([1,2,3]).match([1,3,2])).to.equal(false);
    expect(new TypeChecker("[1,2,3]").match([1,3,2])).to.equal(false);
    expect(new TypeChecker(true).match([1,3,2])).to.equal(false);
  });

  it('should be able to match complex types \n', () => {
    var c1 = new Calculator();
    var c2 = new Calculator();
    var cc1 = new ScientificCalculator();
    var cc2 = new ScientificCalculator();
    var cc3 = new ScientificCalculator();
    (<any>cc3).PI = 3.141516;

    // objects
    expect(new TypeChecker(c1).match(c1)).to.equal(true);
    expect(new TypeChecker(c2).match(c1)).to.equal(true);
    expect(new TypeChecker(c2).match(cc1)).to.equal(false);

    // objects with inheritance
    expect(new TypeChecker(cc1).match(cc1)).to.equal(true);
    expect(new TypeChecker(cc1).match(cc2)).to.equal(true);
    expect(new TypeChecker(cc2).match(cc3)).to.equal(false);

    // arrays with objects
    var a1 = [c1,cc1,cc3];
    var a2 = [c1,cc1,cc3];
    var a3 = [c1,cc3,cc1];
    var a4 = [c1,c2,cc2];
    expect(new TypeChecker(a1).match(a1)).to.equal(true);
    expect(new TypeChecker(a1).match(a2)).to.equal(true);
    expect(new TypeChecker(a1).match(a3)).to.equal(false);
    expect(new TypeChecker(a1).match(a4)).to.equal(false);
  });

});
