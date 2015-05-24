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
    return true;
  }

  public isDefined() : boolean {
    return (this._value !== null && this._value !== undefined);
  }

  public isTruthy() : boolean {
    return !!this._value;
  }

  public isFalsy() : boolean {
    return !this._value;
  }

  public isTypeOf(t : string) : boolean {
    switch(t){
      case "array":
        return this.isArray();
        break;
      case "date":
        return this.isDate();
        break;
      case "regexp":
        return this.isRegexp();
        break;
      default:
        return (typeof this._value === t);
    }
  }

  public isBool() : boolean {
    return this.isTypeOf("boolean");
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

  public isSame(expectation) : boolean {
    return (this._value === expectation);
  }

  public isInstanceOf(c : any) : boolean {
    return (this._value instanceof c);
  }

  public itHas(property : string) : boolean {
    if (typeof this._value === "object") {
        return property in this._value;
    }
    return this._value[property] !== undefined;
  }

  public itHasOwn(property : string) : boolean {
    return this._value.hasOwnProperty(property);
  }
}

export = TypeChecker;
