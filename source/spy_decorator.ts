/// <reference path="./spy.d.ts"/>
/// <reference path="./function_call.d.ts"/>

import Spy = require("./spy");
import FunctionCall = require("./function_call");

// method decorator
function spy(target: any, key: string, descriptor: any) {

  // save a reference to the method
  var originalMethod = descriptor.value;

  // set spy value
  target.spies = target.spies || {};
  target.spies[key] = new Spy();

  descriptor.value = function (...args: any[]) {
    var thisValue = this, calledWithNew, call, returnValue;
    calledWithNew = (thisValue.constructor == target);
    call = new FunctionCall(thisValue, calledWithNew, args);
    returnValue = null;
    try {
      returnValue = descriptor.value.apply(thisValue, args);
      call.returnValue = returnValue;
      target.spies[key].calls.push(call);
      return returnValue;
    }
    catch (e) {
      call.exception = e;
      target.spies[key].calls.push(call);
      throw e;
    }
  }

  return descriptor;
}

export = spy;
