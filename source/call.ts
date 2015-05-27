/// <reference path="./interfaces/call.d.ts"/>
/// <reference path="./interfaces/type_checker.d.ts"/>

import TypeChecker = require("./type_checker");

// Check ICall (call.d.ts) for documentation.

class Call implements ICall {

  public highResTimeStamp;
  public thisValue: ITypeChecker;
  public args: ITypeChecker[];
  public returnValue: ITypeChecker;
  public exception: ITypeChecker;
  public calledWithNew : boolean;

  constructor(thisValue: any, calledWithNew : boolean, args: any[]) {
    if(typeof performance !== "undefined" && typeof performance.now === "function") {
      this.highResTimeStamp =  performance.now();
    }
    this.thisValue = new TypeChecker(thisValue);
    this.calledWithNew = calledWithNew;
    this.args = [];
    for(var i = 0; i < args.length; i++) {
      this.args.push(new TypeChecker(args[i]));
    }
  }

  public calledOn(obj: any): boolean {
    return this.thisValue.match(obj);
  }

  public calledWith(...args: any[]): boolean {
    var l = args.length;
    if (l > this.args.length) {
        return false;
    }
    for (var i = 0; i < l; i++) {
        if (this.args[i].match(arguments[i]) === false) {
            return false;
        }
    }
    return true;
  }

  public calledWithExactly(...args: any[]): boolean {
    return arguments.length == this.args.length &&
           this.calledWith(...args);
  }

  public notCalledWith(...args: any[]): boolean {
    return !this.calledWith(...args);
  }

  public calledWithMatch(...args : ((tc : ITypeChecker) => boolean)[]) : boolean {
    var l = args.length;
    if (l > this.args.length) {
        return false;
    }
    for (var i = 0; i < l; i++) {
        var comparer = args[i];
        if (!comparer(this.args[i])) {
            return false;
        }
    }
    return true;
  }

  public notCalledWithMatch(...args: ((tc : ITypeChecker) => boolean)[]): boolean {
    return !this.calledWithMatch(...args);
  }

  public threw(error?: any): boolean {
    if (typeof this.exception === "undefined") { return false; }
    if(typeof error === "undefined") { return true; }
    return this.exception.value && this.exception.value().toString() === error.toString();
  }
}

export = Call;
