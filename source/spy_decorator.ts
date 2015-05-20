/// <reference path="./spy.d.ts"/>
/// <reference path="./call.d.ts"/>
/// <reference path="./matcher.d.ts"/>

import Spy = require("./spy");
import Call = require("./call");
import Matcher = require("./matcher");

// method decorator
function spy(target: any, key: string, descriptor: any) {

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
      call.returnValue = new Matcher(returnValue);
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
