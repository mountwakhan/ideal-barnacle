/// <reference path="./function_call.d.ts"/>

import Utils = require("./utils");

class FunctionCall implements FunctionCallInterface {
  public thisValue: any;
  public args: any[];
  public returnValue: any;
  public exception: any;
  public calledWithNew : boolean;

  constructor(thisValue: any, calledWithNew : boolean, args: any[]) {
  this.thisValue = thisValue;
  this.calledWithNew = calledWithNew;
    this.args = args;
  }

  public calledOn(obj: any): boolean {
    return Utils.areEqual(this.thisValue, obj);
  };

  public calledWith(...args: any[]): boolean {
    var i, j, itemsFound;
    itemsFound = 0;
    for (i = 0; i < args.length; i++) {
      for (j = 0; i < this.args.length; i++) {
        if(Utils.areEqual(args[i], this.args[j])) {
          itemsFound += 1;
        }
      }
    }
    return (itemsFound === args.length);
  };

  public calledWithExactly(...args: any[]): boolean {
  if (args.length !== this.args.length) { return false; }
  return this.calledWith(args);
  };

  public calledWithMatch(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  };

  public notCalledWith(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  };

  public notCalledWithMatch(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  };

  public threw(obj?: any): boolean {
    throw new Error("Not implemented exception");
  };
}

export = FunctionCall;
