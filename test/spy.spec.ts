///<reference path="../typings/tsd.d.ts" />
/// <reference path="../source/interfaces/type_checker.d.ts"/>
/// <reference path="../source/interfaces/matcher.d.ts"/>

import Matcher = require("../source/matcher");
import TypeChecker = require("../source/type_checker");
import Spy = require("../source/spy");
import FunctionCall = require("../source/call");
import Call = require("../source/call");

var expect = chai.expect;

describe("Spy Class \n", () => {

  it('should initialize calls when instanciated \n', () => {
    var spy = new Spy();
    expect(spy.getCalls()).to.be.a('array');
    expect(spy.getCalls().length).to.equals(0);
  });

  it('should know if a function was invoked \n', () => {
    var expected = [2, "3"];
    var value = { test : "test" };
    var fCall = new Call(value, false, expected);

    var spy = new Spy();
    expect(spy.called()).to.be.false;
    (<any>spy).calls.push(fCall);
    expect(spy.called()).to.be.true;
  });

  it('should know if a function was invoked 2 times \n', () => {
    var expected = [2, "3"];
    var value = { test : "test" };
    var fCall = new Call(value, false, expected);

    var spy = new Spy();
    expect(spy.called()).to.be.false;

    (<any>spy).calls.push(fCall);
    expect(spy.calledOnce()).to.be.true;
    expect(spy.calledTwice()).to.be.false;

    (<any>spy).calls.push(fCall);
    expect(spy.calledOnce()).to.be.false;
    expect(spy.calledTwice()).to.be.true;
  });

  it('should know if a function was invoked 3 times \n', () => {
    var expected = [2, "3"];
    var value = { test : "test" };
    var fCall = new Call(value, false, expected);

    var spy = new Spy();
    expect(spy.called()).to.be.false;

    (<any>spy).calls.push(fCall);
    expect(spy.calledOnce()).to.be.true;
    expect(spy.calledTwice()).to.be.false;
    expect(spy.calledThrice()).to.be.false;

    (<any>spy).calls.push(fCall);
    expect(spy.calledOnce()).to.be.false;
    expect(spy.calledTwice()).to.be.true;
    expect(spy.calledThrice()).to.be.false;

    (<any>spy).calls.push(fCall);
    expect(spy.calledOnce()).to.be.false;
    expect(spy.calledTwice()).to.be.false;
    expect(spy.calledThrice()).to.be.true;
  });

  it('should know how many times a function was invoked \n', () => {
    var expected = [2, "3"];
    var value = { test : "test" };
    var fCall = new Call(value, false, expected);

    var spy = new Spy();
    expect(spy.called()).to.be.false;

    (<any>spy).calls.push(fCall);
    expect(spy.callCount() === 1).to.be.true;

    (<any>spy).calls.push(fCall);
    expect(spy.callCount() === 2).to.be.true;

    (<any>spy).calls.push(fCall);
    expect(spy.callCount() === 3).to.be.true;
  });

  it('should be able to return the details of the firt call \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3"]);
    var spy = new Spy();

    expect(spy.called()).to.be.false;
    expect(spy.firstCall() === null).to.be.true;

    (<any>spy).calls.push(fCall1);
    expect(spy.firstCall() === null).to.be.false;
    expect(spy.firstCall().thisValue.match({ test : "test" })).to.be.true;
    expect(spy.firstCall().thisValue.match({ test : "test1" })).to.be.false;
  });

  it('should be able to return the details of the second call \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3"]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);
    var spy = new Spy();

    expect(spy.called()).to.be.false;
    expect(spy.firstCall() === null).to.be.true;

    (<any>spy).calls.push(fCall1);
    expect(spy.firstCall() === null).to.be.false;

    (<any>spy).calls.push(fCall2);
    expect(spy.secondCall() === null).to.be.false;
    expect(spy.secondCall().thisValue.match({ test : "test" })).to.be.false;
    expect(spy.secondCall().thisValue.match({ test : "test1" })).to.be.true;
  });

  it('should be able to return the details of the third call \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3"]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);
    var fCall3 = new Call({ test : "test2" }, false, [4, "5"]);
    var spy = new Spy();

    expect(spy.called()).to.be.false;
    expect(spy.firstCall() === null).to.be.true;

    (<any>spy).calls.push(fCall1);
    expect(spy.firstCall() === null).to.be.false;

    (<any>spy).calls.push(fCall2);
    expect(spy.secondCall() === null).to.be.false;

    (<any>spy).calls.push(fCall3);
    expect(spy.thirdCall() === null).to.be.false;

    expect(spy.thirdCall().thisValue.match({ test : "test1" })).to.be.false;
    expect(spy.thirdCall().thisValue.match({ test : "test2" })).to.be.true;
  });


  it('should be able to return the details of the last call \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3"]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);
    var fCall3 = new Call({ test : "test2" }, false, [4, "5"]);
    var spy = new Spy();

    expect(spy.called()).to.be.false;
    expect(spy.lastCall() === null).to.be.true;

    (<any>spy).calls.push(fCall1);
    expect(spy.lastCall() === null).to.be.false;
    expect(spy.lastCall().thisValue.match({ test : "test" })).to.be.true;
    expect(spy.lastCall().thisValue.match({ test : "test1" })).to.be.false;

    (<any>spy).calls.push(fCall2);
    expect(spy.lastCall() === null).to.be.false;
    expect(spy.lastCall().thisValue.match({ test : "test1" })).to.be.true;
    expect(spy.lastCall().thisValue.match({ test : "test" })).to.be.false;

    (<any>spy).calls.push(fCall3);
    expect(spy.lastCall() === null).to.be.false;
    expect(spy.lastCall().thisValue.match({ test : "test2" })).to.be.true;
    expect(spy.lastCall().thisValue.match({ test : "test1" })).to.be.false;
  });

  it('should be able to return the details of a call by its index \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3"]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);
    var fCall3 = new Call({ test : "test2" }, false, [4, "5"]);
    var spy = new Spy();

    expect(spy.called()).to.be.false;
    expect(spy.lastCall() === null).to.be.true;

    (<any>spy).calls.push(fCall1);
    (<any>spy).calls.push(fCall2);
    (<any>spy).calls.push(fCall3);

    var call1 = spy.getCall(1);
    expect(call1.thisValue.match({ test : "test" })).to.be.true;

    var call2 = spy.getCall(2);
    expect(call2.thisValue.match({ test : "test1" })).to.be.true;

    var call3 = spy.getCall(3);
    expect(call3.thisValue.match({ test : "test2" })).to.be.true;

    var call4 = spy.getCall(4);
    expect(call4).to.be.null;
  });

  it('Should know if it was called at least once with obj as this \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3"]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);
    var fCall3 = new Call({ test : "test2" }, false, [4, "5"]);
    var spy = new Spy();
    (<any>spy).calls.push(fCall1);
    (<any>spy).calls.push(fCall2);
    (<any>spy).calls.push(fCall3);

    expect(spy.calledOn({ test : "test" })).to.be.true;
    expect(spy.calledOn({ test : "test1" })).to.be.true;
    expect(spy.calledOn({ test : "test2" })).to.be.true;
    expect(spy.calledOn({ test : "test3" })).to.be.false;
  });

  it('Should know if it was always called with obj as this \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3"]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);
    var fCall3 = new Call({ test : "test2" }, false, [4, "5"]);

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);
    (<any>spy1).calls.push(fCall2);
    (<any>spy1).calls.push(fCall3);
    expect(spy1.alwaysCalledOn({ test : "test" })).to.be.false;
    expect(spy1.alwaysCalledOn({ test : "test1" })).to.be.false;
    expect(spy1.alwaysCalledOn({ test : "test2" })).to.be.false;

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall1);
    expect(spy2.alwaysCalledOn({ test : "test" })).to.be.true;
    expect(spy2.alwaysCalledOn({ test : "test1" })).to.be.false;
    expect(spy2.alwaysCalledOn({ test : "test2" })).to.be.false;
  });

  it('Should know if it was called before another function \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3"]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);
    var fCall3 = new Call({ test : "test2" }, false, [4, "5"]); // latest

    expect(fCall1.highResTimeStamp).to.be.below(fCall2.highResTimeStamp);
    expect(fCall2.highResTimeStamp).to.be.below(fCall3.highResTimeStamp);
    expect(fCall3.highResTimeStamp).to.be.above(fCall2.highResTimeStamp);

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);
    (<any>spy1).calls.push(fCall2);
    (<any>spy1).calls.push(fCall3);

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall1);

    expect(spy1.calledBefore(spy2)).to.be.true;
    expect(spy2.calledBefore(spy1)).to.be.false;
  });


  it('Should know if it was called after another function \n', ()=> {
    var fCall1 = new Call({ test : "test" }, false, [2, "3"]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);
    var fCall3 = new Call({ test : "test2" }, false, [4, "5"]); // latest

    expect(fCall1.highResTimeStamp).to.be.below(fCall2.highResTimeStamp);
    expect(fCall2.highResTimeStamp).to.be.below(fCall3.highResTimeStamp);
    expect(fCall3.highResTimeStamp).to.be.above(fCall2.highResTimeStamp);

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);
    (<any>spy1).calls.push(fCall2);
    (<any>spy1).calls.push(fCall3);

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall1);

    expect(spy1.calledAfter(spy2)).to.be.false;
    expect(spy2.calledAfter(spy1)).to.be.true;
  });

  it('Should know if it was called at least once with the provided arguments \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3", 4]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall2);

    var spy3 = new Spy();
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);

    expect(spy1.calledWith(2,"3")).to.be.true;
    expect(spy1.calledWith(2,"3",4)).to.be.true;
    expect(spy1.calledWith(3,"3")).to.be.false;

    expect(spy2.calledWith(2,"3")).to.be.true;
    expect(spy2.calledWith(3,"3")).to.be.true;
    expect(spy2.calledWith(2,"3",4)).to.be.true;

    expect(spy3.calledWith(2,"3")).to.be.false;
    expect(spy3.calledWith(3,"3")).to.be.true;
    expect(spy3.calledWith(2,"3",4)).to.be.false;
  });

  it('Should know if it was always called with the provided arguments \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3", 4]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall2);

    var spy3 = new Spy();
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);

    expect(spy1.alwaysCalledWith(2,"3")).to.be.true;
    expect(spy1.alwaysCalledWith(2,"3", 4)).to.be.true;
    expect(spy1.alwaysCalledWith(3,"3")).to.be.false;

    expect(spy2.alwaysCalledWith(2,"3")).to.be.false;
    expect(spy2.alwaysCalledWith(3,"3")).to.be.false;
    expect(spy2.alwaysCalledWith(2,"3",4)).to.be.false;

    expect(spy3.alwaysCalledWith(2,"3")).to.be.false;
    expect(spy3.alwaysCalledWith(3,"3")).to.be.true;
    expect(spy3.alwaysCalledWith(2,"3",4)).to.be.false;
  });

  it('Should know if it was called at least once with the exact provided arguments \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3", 4]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall2);

    var spy3 = new Spy();
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);

    expect(spy1.calledWithExactly(2,"3")).to.be.false;
    expect(spy1.calledWithExactly(2,"3", 4)).to.be.true;
    expect(spy1.calledWithExactly(3,"3")).to.be.false;

    expect(spy2.calledWithExactly(2,"3")).to.be.false;
    expect(spy2.calledWithExactly(3,"3")).to.be.true;
    expect(spy2.calledWithExactly(2,"3",4)).to.be.true;

    expect(spy3.calledWithExactly(2,"3")).to.be.false;
    expect(spy3.calledWithExactly(3,"3")).to.be.true;
    expect(spy3.calledWithExactly(2,"3",4)).to.be.false;
  });

  it('Should know if it was always called with the exact provided arguments \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3", 4]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall2);

    var spy3 = new Spy();
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);

    expect(spy1.alwaysCalledWithExactly(2,"3")).to.be.false;
    expect(spy1.alwaysCalledWithExactly(2,"3",4)).to.be.true;
    expect(spy1.alwaysCalledWithExactly(3,"3")).to.be.false;

    expect(spy2.alwaysCalledWithExactly(2,"3")).to.be.false;
    expect(spy2.alwaysCalledWithExactly(3,"3")).to.be.false;
    expect(spy2.alwaysCalledWithExactly(2,"3",4)).to.be.false;

    expect(spy3.alwaysCalledWithExactly(2,"3")).to.be.false;
    expect(spy3.alwaysCalledWithExactly(3,"3")).to.be.true;
    expect(spy3.alwaysCalledWithExactly(2,"3",4)).to.be.false;
  });

  it('Should know if it was called with matching arguments \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3", 4]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);
    var fCall3 = new Call({ test : "test1" }, false, [true, "3"]);

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall2);
    (<any>spy2).calls.push(fCall3);

    var m = new Matcher();
    expect(spy1.calledWithMatch(m.isNumber, m.isString, m.isNumber)).to.be.true;
    expect(spy1.calledWithMatch(m.isString, m.isNumber)).to.be.false;
    expect(spy2.calledWithMatch(m.isBool, m.isString)).to.be.true;
  });

  it('Should know if it was always called with matching arguments \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3", 4]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);
    var fCall3 = new Call({ test : "test1" }, false, [true, "3"]);

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall2);
    (<any>spy2).calls.push(fCall3);

    var spy3 = new Spy();
    (<any>spy3).calls.push(fCall1);
    (<any>spy3).calls.push(fCall1);

    var m = new Matcher();
    expect(spy1.alwaysCalledWithMatch(m.isNumber, m.isString, m.isNumber)).to.be.true;
    expect(spy1.alwaysCalledWithMatch(m.isString, m.isNumber)).to.be.false;
    expect(spy2.alwaysCalledWithMatch(m.isNumber, m.isString)).to.be.false;
    expect(spy3.alwaysCalledWithMatch(m.isNumber, m.isString)).to.be.true;
  });

  it('Should know if it was never called with matching arguments \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3", 4]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall2);

    var m = new Matcher();
    expect(spy1.neverCalledWithMatch(m.isNumber, m.isString, m.isNumber)).to.be.false;
    expect(spy1.neverCalledWithMatch(m.isString, m.isNumber)).to.be.true;
    expect(spy2.neverCalledWithMatch(m.isNumber, m.isString)).to.be.false;
  });

  it('Should know if it was called with the new operator \n', () => {
    var fCall1 = new Call({ test : "test" }, true, [2, "3", 4]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall2);

    var spy3 = new Spy();
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);

    expect(spy1.calledWithNew()).to.be.true;
    expect(spy2.calledWithNew()).to.be.true;
    expect(spy3.calledWithNew()).to.be.false;
  });

  it('Should know if it was never called with the provided arguments \n', ()=> {
    var fCall1 = new Call({ test : "test" }, false, [2, "3", 4]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall2);

    var spy3 = new Spy();
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);

    expect(spy1.neverCalledWith(2,"3")).to.be.false;
    expect(spy1.neverCalledWith(2,"3",4)).to.be.false;
    expect(spy1.neverCalledWith(3,"3")).to.be.true;

    expect(spy2.neverCalledWith(2,"3")).to.be.false;
    expect(spy2.neverCalledWith(3,"3")).to.be.false;
    expect(spy2.neverCalledWith(2,"3",4)).to.be.false;

    expect(spy3.neverCalledWith(2,"3")).to.be.true;
    expect(spy3.neverCalledWith(3,"3")).to.be.false;
    expect(spy3.neverCalledWith(2,"3",4)).to.be.true;
  });

  it('Should know if it threw an exception at least once \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3"]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);
    fCall2.exception = new TypeChecker(new Error());

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall2);

    var spy3 = new Spy();
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);

    expect(spy1.threw()).to.be.false;
    expect(spy2.threw()).to.be.true;
    expect(spy3.threw()).to.be.true;
  });

  it('Should know if it always threw an exception \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3"]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);
    fCall2.exception = new TypeChecker(new Error());

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall2);

    var spy3 = new Spy();
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);
    (<any>spy3).calls.push(fCall2);

    expect(spy1.alwaysThrew()).to.be.false;
    expect(spy2.alwaysThrew()).to.be.false;
    expect(spy3.alwaysThrew()).to.be.true;
  });

  it('Should know if it returned the provided value at least once \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3"]);
    fCall1.returnValue = new TypeChecker(1);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);
    fCall2.returnValue = new TypeChecker(2);

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);
    (<any>spy1).calls.push(fCall2);

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall1);

    expect(spy1.returned(1)).to.be.true;
    expect(spy1.returned(2)).to.be.true;
    expect(spy2.returned(2)).to.be.false;
    expect(spy2.returned(1)).to.be.true;
  });

  it('Should know if it always returned the provided value \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3"]);
    fCall1.returnValue = new TypeChecker(1);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);
    fCall2.returnValue = new TypeChecker(2);

    var spy1 = new Spy();
    (<any>spy1).calls.push(fCall1);
    (<any>spy1).calls.push(fCall2);

    var spy2 = new Spy();
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall1);
    (<any>spy2).calls.push(fCall1);

    expect(spy1.alwaysReturned(1)).to.be.false;
    expect(spy1.alwaysReturned(2)).to.be.false;
    expect(spy2.alwaysReturned(2)).to.be.false;
    expect(spy2.alwaysReturned(1)).to.be.true;
  });

  it('Should be able to reset its state \n', () => {
    var fCall1 = new Call({ test : "test" }, false, [2, "3"]);
    var fCall2 = new Call({ test : "test1" }, false, [3, "3"]);
    var fCall3 = new Call({ test : "test2" }, false, [4, "5"]);

    var spy = new Spy();
    (<any>spy).calls.push(fCall1);
    (<any>spy).calls.push(fCall2);
    (<any>spy).calls.push(fCall3);

    expect(spy.callCount() === 3).to.be.true;
    spy.reset();
    expect(spy.called()).to.be.false;
    expect(spy.callCount() === 0).to.be.true;
  });
});
