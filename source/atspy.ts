/// <reference path="./atspy.d.ts"/>
/// <reference path="./call.d.ts"/>
/// <reference path="./matcher.d.ts"/>
/// <reference path="./spy.d.ts"/>

import decorators = require("./decorators");

class AtSpy {
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
}

var atspy = new AtSpy;
export = atspy;
