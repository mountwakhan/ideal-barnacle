/// <reference path="./call.d.ts"/>
/// <reference path="./matcher.d.ts"/>

import Matcher = require("./matcher");

class Call implements ICall {

  public thisValue: IMatcher;
  public args: IMatcher[];
  public returnValue: IMatcher;
  public exception: Error;
  public calledWithNew : boolean;

  constructor(thisValue: any, calledWithNew : boolean, args: any[]) {
    this.thisValue = new Matcher(thisValue);
    this.calledWithNew = calledWithNew;
    this.args = [];
    for(var i = 0; i < args.length; i++) {
      this.args.push(new Matcher(args[i]));
    }
  }

  public calledOn(obj: any): boolean {
    return this.thisValue.match(obj);
  }

  public calledWith(...args: any[]): boolean {
    var i, j, itemsFound;
    itemsFound = 0;
    for (i = 0; i < args.length; i++) {
      for (j = 0; i < this.args.length; i++) {
        var m = new Matcher(args[i]);
        if(m.match(this.args[j])) {
          itemsFound += 1;
        }
      }
    }
    return (itemsFound === args.length);
  }

  public calledWithExactly(...args: any[]): boolean {
  if (args.length !== this.args.length) { return false; }
  return this.calledWith(args);
  }

  public calledWithMatch(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  }

  public notCalledWith(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  }

  public notCalledWithMatch(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  }

  public threw(obj?: any): boolean {
    throw new Error("Not implemented exception");
  }
}

export = Call;
