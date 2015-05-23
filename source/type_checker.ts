/// <reference path="./interfaces/type_checker.d.ts"/>

// Check ITypeChecker (type_checker.d.ts) for documentation.

class TypeChecker implements ITypeChecker {

  private _value : any;

  constructor(value : any){
    this._value = value;
  }

  public value() {
    return this._value;
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
    return this._value === true;
  }

  public isFalsy() : boolean {
    return this._value === false;
  }

  public isTypeOf(t : string) : boolean {
    return (typeof this._value === t);
  }

  public isBool() : boolean {
    throw new Error("Not implemented exception");
  }

  public isNumber() : boolean {
    return this.isTypeOf("number");
  }

  public isString() : boolean {
    return this.isTypeOf("string");
  }

  public isObject() : boolean {
    return this.isTypeOf("object");
  }

  public isFunc() : boolean {
    return this.isTypeOf("function");
  }

  public isArray() : boolean {
    if(typeof Array.isArray === "undefined") {
      return (typeof this._value === "[object Array]");
    }
    else {
      return Array.isArray(this._value);
    }
  }

  public isRegexp() : boolean {
    return this.isInstanceOf(RegExp);
  }

  public isDate() : boolean {
    return (typeof this._value.getMonth === 'function');
  }

  public isSame(ref) : boolean {
    throw new Error("Not implemented exception");
  }

  public isInstanceOf(c : any) : boolean {
    return (this._value instanceof c);
  }

  public itHas(property) : boolean {
    throw new Error("Not implemented exception");
  }

  public itHasOwn(property) : boolean {
    throw new Error("Not implemented exception");
  }
}

export = TypeChecker;
