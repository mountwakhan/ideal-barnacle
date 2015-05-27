///<reference path="../typings/tsd.d.ts" />
/// <reference path="../source/interfaces/type_checker.d.ts"/>
/// <reference path="../source/interfaces/matcher.d.ts"/>

import TypeChecker = require("../source/type_checker");
import Matcher = require("../source/matcher");
import Call = require("../source/call");

var expect = chai.expect;

describe("Call Class \n", () => {

  it('should initialize correctly when instancated \n', () => {
    var expected = [2, "3"];
    var value = { test : "test" };
    var fCall = new Call(value, false, expected);

    expect(fCall.args).to.be.a('array');
    expect(fCall.args.length).to.equals(2);
    var expected = [2, "3"];
    for(var i; i < expected.length; i++) {
      expect(fCall.args[i]).to.equals(expect[i]);
    }

    expect(fCall.highResTimeStamp).to.be.a('number');
    expect(fCall.thisValue.value()).to.be.a('object');
    expect(fCall.thisValue.value().test).to.equals(value.test);
    expect(fCall.calledWithNew).to.be.a('boolean');
    expect(fCall.calledWithNew).to.equals(false);
    expect(fCall.exception).to.equals(undefined);
    expect(fCall.returnValue).to.equals(undefined);
  });

  it('should know if it was invoked by the value of this \n', () => {
    var expected = [2, "3"];
    var value = { test : "test" };
    var fCall = new Call(value, false, expected);
    expect(fCall.calledOn(value)).to.be.true;
    expect(fCall.calledOn({ test : "test1" })).to.be.false;
    expect(fCall.calledOn(this)).to.be.false;
  });

  it('should know if it was invoked with some arguments \n', () => {
    var expected = [2, "3"];
    var value = { test : "test" };
    var fCall = new Call(value, false, expected);
    expect(fCall.args[0].value()).to.equals(2);
    expect(fCall.args[1].value()).to.equals("3");
    expect(fCall.args.length).to.equals(2);
    expect(fCall.calledWith(2,"3")).to.be.true;
    expect(fCall.calledWith(2,"3",6)).to.be.false;
  });

  it('should know if it was invoked with some exact arguments \n', function(){
    var expected = [2, "3"];
    var value = { test : "test" };
    var fCall = new Call(value, false, expected);
    expect(fCall.calledWithExactly(2,"3")).to.be.true;
    expect(fCall.calledWithExactly("3",2)).to.be.false;
    expect(fCall.calledWithExactly(3)).to.be.false;
    expect(fCall.calledWithExactly(2,3)).to.be.false;
    expect(fCall.calledWithExactly(2,4,6)).to.be.false;
  });

  it('should know if it was NOT invoked with some arguments \n', () => {
    var expected = [2, "3"];
    var value = { test : "test" };
    var fCall = new Call(value, false, expected);
    expect(fCall.args[0].value()).to.equals(2);
    expect(fCall.args[1].value()).to.equals("3");
    expect(fCall.args.length).to.equals(2);
    expect(fCall.notCalledWith(2,"2",6)).to.be.true;
    expect(fCall.notCalledWith(2,"3")).to.be.false;
  });

  it('should know if it was invoked with some matching arguments \n', () => {
    var expected = [2, "3"];
    var value = { test : "test" };
    var fCall = new Call(value, false, expected);
    var m = new Matcher();
    expect(fCall.calledWithMatch(m.isNumber, m.isString)).to.be.true;
    expect(fCall.calledWithMatch(m.isString, m.isNumber)).to.be.false;
  });

  it('should know if it was invoked with some custom matching arguments \n', () => {
    var expected = [2, "3"];
    var value = { test : "test" };
    var fCall = new Call(value, false, expected);
    var m = new Matcher();
    var customMatcher = function(tc : ITypeChecker) { return (tc.value() % 2) === 0 };
    var customMatcher2 = function(tc : ITypeChecker) { return (tc.value() % 2) !== 0 };
    expect(fCall.calledWithMatch(customMatcher, m.isString)).to.be.true;
    expect(fCall.calledWithMatch(customMatcher2, m.isString)).to.be.false;
  });

  it('should know if it was NOT invoked with some matching arguments \n', () => {
    var expected = [2, "3"];
    var value = { test : "test" };
    var fCall = new Call(value, false, expected);
    var m = new Matcher();
    expect(fCall.notCalledWithMatch(m.isNumber, m.isString)).to.be.false;
    expect(fCall.notCalledWithMatch(m.isString, m.isNumber)).to.be.true;
  });

  it('should know if it throw an exception when it was invoked \n', () => {
    var expected = [2, "3"];
    var value = { test : "test" };
    var fCall = new Call(value, false, expected);
    var fCall2 = new Call(value, false, expected);
    var e = new Error();
    fCall.exception = new TypeChecker(e);
    expect(fCall.threw(e)).to.be.true;
    expect(fCall.threw("Error")).to.be.true;
    expect(fCall.threw(new Error())).to.be.true;
    expect(fCall.threw(new RangeError())).to.be.false;
    expect(fCall.threw("Error: another custom error")).to.be.false;
    expect(fCall2.threw(e)).to.be.false;
  });
});
