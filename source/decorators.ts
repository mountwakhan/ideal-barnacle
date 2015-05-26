/// <reference path="./interfaces/spy.d.ts"/>
/// <reference path="./interfaces/call.d.ts"/>
/// <reference path="./interfaces/type_checker.d.ts"/>

declare function __decorate(decorators, target, key, desc);

import Spy = require("./spy");
import Call = require("./call");
import TypeChecker = require("./type_checker");

// method decorator
function spyMethodDecorator(target: any, key: string, descriptor: any) {

  // save a reference to the method
  var originalMethod = descriptor.value;

  // set spy value
  target.spies = target.spies || {};
  target.spies[key] = new Spy();

  descriptor.value = function (...args: any[]) {
    var thisValue, calledWithNew, call, returnValue;

    thisValue = this;
    calledWithNew = (thisValue.constructor == target);
    call = new Call(thisValue, calledWithNew, args);
    returnValue = null;

    try {
      returnValue = originalMethod.apply(thisValue, args);
      call.returnValue = new TypeChecker(returnValue);
      target.spies[key].calls.push(call);
      return returnValue;
    }
    catch (e) {
      call.exception = e;
      call.returnValue = new TypeChecker(undefined);
      target.spies[key].calls.push(call);
      throw e;
    }
  }

  return descriptor;
}

// class decorator
function spyClassDecorator(target: any) {

  // invoked once of each property in class being decorated
  function addSpy(proto, key) {
    var descriptor = Object.getOwnPropertyDescriptor(proto, key);
    if (descriptor) {
      if (typeof descriptor.value === "function") {
        Object.defineProperty(target.prototype, key,
          __decorate([
            spyMethodDecorator
          ], target.prototype, key, descriptor));
      }
      else {
        // TODO property decorator
      }
    }
    else {
      addSpy(Object.getPrototypeOf(proto), key);
    }
  }
  var proto = target.prototype;
  for (var key in proto) {
    if (proto[key] !== target) {
      addSpy(proto, key);
    }
  }
  return target;
}

var decorators = {
  class : spyClassDecorator,
  method : spyMethodDecorator
};

export = decorators;
