/// <reference path="./interfaces/atspy.d.ts"/>
/// <reference path="./interfaces/call.d.ts"/>
/// <reference path="./interfaces/matcher.d.ts"/>
/// <reference path="./interfaces/spy.d.ts"/>

import decorators = require("./decorators");

// Check IAtSpy (atspy.d.ts) for documentation.

class AtSpy implements IAtSpy{
  public decorators : {
    class : ClassDecorator,
    method : MethodDecorator
  }

  constructor() {
    this.decorators.class = decorators.class;
    this.decorators.method = decorators.method;
  }

  public getSpies(obj : any) : ISpy[] {
    return (<any>obj).spies;
  }

  public getCallStack(spies : ISpy[]) : ICall[] {
    throw new Error("Not implemented exception");
  }
}

var atspy = new AtSpy;
export = atspy;
