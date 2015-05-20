/// <reference path="./matcher.d.ts"/>

class Matcher implements IMatcher {

  private _value : any;

  constructor(value : any){
    this._value = value;
  }

  public value() {
    throw new Error("Not implemented exception");
  }

  public match(obj : any) : boolean {
    throw new Error("Not implemented exception");
  }

  public isAny() : boolean {
    throw new Error("Not implemented exception");
  }

  public isDefined() : boolean {
    throw new Error("Not implemented exception");
  }

  public isTruthy() : boolean {
    throw new Error("Not implemented exception");
  }

  public isFalsy() : boolean {
    throw new Error("Not implemented exception");
  }

  public isTypeOf(type) : boolean {
    throw new Error("Not implemented exception");
  }

  public isBool() : boolean {
    throw new Error("Not implemented exception");
  }

  public isNumber() : boolean {
    throw new Error("Not implemented exception");
  }

  public isString() : boolean {
    throw new Error("Not implemented exception");
  }

  public isObject() : boolean {
    throw new Error("Not implemented exception");
  }

  public isFunc() : boolean {
    throw new Error("Not implemented exception");
  }

  public isArray() : boolean {
    throw new Error("Not implemented exception");
  }

  public isRegexp() : boolean {
    throw new Error("Not implemented exception");
  }

  public isDate() : boolean {
    throw new Error("Not implemented exception");
  }

  public isSame(ref) : boolean {
    throw new Error("Not implemented exception");
  }

  public isInstanceOf(type) : boolean {
    throw new Error("Not implemented exception");
  }

  public itHas(property) : boolean {
    throw new Error("Not implemented exception");
  }

  public itHasOwn(property) : boolean {
    throw new Error("Not implemented exception");
  }
}

export = Matcher;
