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

    var tc = new TypeChecker(obj);
    var vtc = new TypeChecker(this._value);

    // stirct equal is used for number, bool, string, null & undefined
    if(tc.isNumber()) {
      if(vtc.isNumber() === false) return false;
      return this._value === obj;
    }
    else if(tc.isBool()) {
      if(vtc.isBool() === false) return false;
      return this._value === obj;
    }
    else if(tc.isString()) {
      if(vtc.isString() === false) return false;
      return this._value === obj;
    }
    else if(!tc.isDefined()) {
      if(!vtc.isDefined() === false) return false;
      return this._value === obj;
    }
    // toString() is used for func
    else if(tc.isFunc()) {
      if(vtc.isFunc() === false) return false;
      return this._value.toString() == obj.toString();
    }
    // regexp
    else if(tc.isRegexp()) {
      if(vtc.isRegexp() === false) return false;
      return (this._value.source === obj.source) &&
             (this._value.global === obj.global) &&
             (this._value.ignoreCase === obj.ignoreCase) &&
             (this._value.multiline === obj.multiline);
    }
    // valueOf is used for date
    else if(tc.isDate()) {
      if(vtc.isDate() === false) return false;
      return this._value.valueOf() === obj.valueOf();
    }
    else if(tc.isArray()) {
      if(vtc.isArray() === false) return false;
      // length of arrays is taken into account
      if(this._value.length !== obj.length) {
        return false;
      }
      // order of items in array is taken into account
      for(var i = 0; i < this._value.length; i++) {
        if(new TypeChecker(this._value[i]).match(obj[i]) === false) {
          return false;
        }
      }
      return true;
    }
    else {
      // deep equal
      var prop, aLength = 0, bLength = 0;
      for (prop in this._value) {
          aLength += 1;
          if (!(prop in obj)) {
              return false;
          }
          var pTc = new TypeChecker(this._value[prop]);
          if (!pTc.match(obj[prop])) {
              return false;
          }
      }
      for (prop in obj) {
          bLength += 1;
      }
      return aLength == bLength;
    }
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
