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

      // search in object's own property
      if (typeof descriptor.value === "function") {

        // decorate methods
        Object.defineProperty(target.prototype, key,
          __decorate([
            spyMethodDecorator
          ], target.prototype, key, descriptor));
      }
      else {

        // decorate properties
        // TODO
      }
    }
    else {

      // search in object's prototype chain
      addSpy(Object.getPrototypeOf(proto), key);
    }
  }
  var proto = target.prototype;

  // iterate object properties
  for (var key in proto) {

    // avoid decorating "cosntructor" method
    if (proto[key] !== target) {
      addSpy(proto, key);
    }
  }
  return target;
}

// property decorator
function spyPropertyDecorator() {
  throw new Error("Not implemented exception");
}

// parameter decorator
function spyParameterDecorator() {
  throw new Error("Not implemented exception");
}

// TODO wrap all decorators into an universal decorator

var decorators = {
  class : spyClassDecorator,
  method : spyMethodDecorator,
  property : spyPropertyDecorator,
  parameter : spyParameterDecorator
};

export = decorators;
