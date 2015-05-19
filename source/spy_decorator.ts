/// <reference path="./spy.d.ts"/>
/// <reference path="./function_call.d.ts"/>

import Spy = require("./spy");
import FunctionCall = require("./function_call");

function spy(target: any, key: string, value: any) {

  target.spies = target.spies || {};
  target.spies[key] = new Spy();

  return {
  value: function (...args: any[]) {

  var thisValue = this, calledWithNew, call, returnValue;

  calledWithNew = (thisValue.constructor == target);
  call = new FunctionCall(thisValue, calledWithNew, args);
  returnValue = null;

      try {
        returnValue = value.value.apply(thisValue, args);
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
  };
}

export = spy;
