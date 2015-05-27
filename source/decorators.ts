/// <reference path="./interfaces/spy.d.ts"/>
/// <reference path="./interfaces/call.d.ts"/>
/// <reference path="./interfaces/type_checker.d.ts"/>

declare var Reflect;

import Spy = require("./spy");
import Call = require("./call");
import TypeChecker = require("./type_checker");

// The __decorate is provided by the TypeScript compiler when @ is present in
// the code. We will include this function manually in order to allow developers
// to use the library even if they are not using TypeScript.
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {

    // Reflection metadata API
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") {
      return Reflect.decorate(decorators, target, key, desc);
    }

    // fallback
    switch (arguments.length) {

        // class
        case 2: return decorators.reduceRight(function(o, d) {
                  return (d && d(o)) || o;
                }, target);

        // ??
        case 3: return decorators.reduceRight(function(o, d) {
                  return (d && d(target, key)), void 0;
                }, void 0);

        // methods
        case 4: return decorators.reduceRight(function(o, d) {
                  return (d && d(target, key, o)) || o;
                }, desc);
    }
};

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
function spyPropertyDecorator(target: any, key : string) {
  throw new Error("Not implemented exception");
}

// parameter decorator
function spyParameterDecorator(target: any, key : string, index : number) {
  throw new Error("Not implemented exception");
}

// A wrapper to abstract developers from concrete decorator types
function universalSpyDecorator(...args : any[]) {
  switch(args.length) {
    case 1:
      return spyClassDecorator.apply(this, args);
    case 2:
      return spyPropertyDecorator.apply(this, args);
    case 3:
      if(typeof args[2] === "number") {
        return spyParameterDecorator.apply(this, args);
      }
      return spyMethodDecorator.apply(this, args);
    default:
      throw new Error("Invalid operation excepion");
  }
}

var decorators = {
  universal : universalSpyDecorator,
  class : spyClassDecorator,
  method : spyMethodDecorator,
  property : spyPropertyDecorator,
  parameter : spyParameterDecorator
};

export = decorators;
