/// <reference path="./interfaces/spy.d.ts"/>
/// <reference path="./interfaces/call.d.ts"/>

// Check ISpy (spy.d.ts) for documentation.

class Spy implements ISpy {

  private calls: ICall[];

  constructor() {
    this.calls = [];
  }

  public getCalls() : ICall[] {
    return this.calls;
  }

  public callCount(): number {
    return this.calls.length;
  }

  public called(): boolean {
    return (this.calls.length > 0);
  }

  public calledOnce(): boolean {
    return (this.calls.length === 1);
  }

  public calledTwice(): boolean {
    return (this.calls.length === 2);
  }

  public calledThrice(): boolean {
    return (this.calls.length === 3);
  }

  public firstCall(): ICall {
    return this.getCall(1);
  }

  public secondCall(): ICall {
    return this.getCall(2);
  }

  public thirdCall(): ICall {
    return this.getCall(3);
  }

  public lastCall(): ICall {
    return this.getCall(this.calls.length);
  }

  public getCall(n: number): ICall {
    var l = this.calls.length;
    return (l !== 0 &&  l >= n) ? this.calls[n - 1] : null;
  }

  public calledOn(obj): boolean {
    for(var i = 0; i < this.calls.length; i++) {
      if(this.calls[i].thisValue.match(obj)) {
        return true;
      }
    }
    return false;
  }

  public alwaysCalledOn(obj): boolean {
    var count = 0;
    for(var i = 0; i < this.calls.length; i++) {
      if(this.calls[i].thisValue.match(obj)) {
        count = count + 1;
      }
    }
    return (count === this.calls.length);
  }

  public calledBefore(anotherSpy : ISpy) : boolean {

    if(typeof performance === "undefined" || typeof performance.now !== "function") {
      var e = "This feature is only available in enviroments with performance timing API support.";
      throw new Error(e);
    }

    var l  = this.calls.length,
        c = anotherSpy.getCalls(),
        l2 = c.length,
        max1 = 0, max2 = 0;

    for(var i = 0; i < l; i++) {
      var val = this.calls[i].highResTimeStamp;
      if(val > max1) {
        max1 = val;
      }
    }

    for(var j = 0; j < l2; j++) {
      var val = c[j].highResTimeStamp;
      if(val > max2) {
        max2 = val;
      }
    }

    return (max1 > max2);
  }

  public calledAfter(anotherSpy : ISpy): boolean {
    return !this.calledBefore(anotherSpy);
  }

  public calledWith(...args: any[]): boolean {
    for(var i = 0; i < this.calls.length; i++) {
      if(this.calls[i].calledWith(...args)) {
        return true;
      }
    }
    return false;
  }

  public alwaysCalledWith(...args: any[]): boolean {
    var l = this.calls.length;
    var calledWithCount = 0;
    for(var i = 0; i < l; i++) {
      if(this.calls[i].calledWith(...args)) {
        calledWithCount++;
      }
    }
    return (calledWithCount === l);
  }

  public calledWithExactly(...args: any[]): boolean {
    for(var i = 0; i < this.calls.length; i++) {
      if(this.calls[i].calledWithExactly(...args)) {
        return true;
      }
    }
    return false;
  }

  public alwaysCalledWithExactly(...args: any[]): boolean {
    var l = this.calls.length;
    var calledWithExactlyCount = 0;
    for(var i = 0; i < l; i++) {
      if(this.calls[i].calledWithExactly(...args)) {
        calledWithExactlyCount++;
      }
    }
    return (calledWithExactlyCount === l);
  }

  public calledWithMatch(...args: any[]): boolean {
    for(var i = 0; i < this.calls.length; i++) {
      if(this.calls[i].calledWithMatch(...args)) {
        return true;
      }
    }
    return false;
  }

  public alwaysCalledWithMatch(...args: any[]): boolean {
    var l = this.calls.length;
    var calledWithMatchCount = 0;
    for(var i = 0; i < l; i++) {
      if(this.calls[i].calledWithMatch(...args)) {
        calledWithMatchCount++;
      }
    }
    return (calledWithMatchCount === l);
  }

  public calledWithNew(): boolean {
    for(var i = 0; i < this.calls.length; i++) {
      if(this.calls[i].calledWithNew === true) {
        return true;
      }
    }
    return false;
  }

  public neverCalledWith(...args: any[]): boolean {
    return !this.calledWith(...args);
  }

  public neverCalledWithMatch(...args: ((tc : ITypeChecker) => boolean)[]): boolean {
    return !this.calledWithMatch(...args);
  }

  public threw(obj?: any): boolean {
    for(var i = 0; i < this.calls.length; i++) {
      if(this.calls[i].threw(obj)) {
        return true;
      }
    }
    return false;
  }

  public alwaysThrew(obj?: any): boolean {
    var l = this.calls.length;
    var threwCount = 0;
    for(var i = 0; i < l; i++) {
      if(this.calls[i].threw(obj)) {
        threwCount++;
      }
    }
    return (threwCount === l);
  }

  public returned(obj: any): boolean {
    for(var i = 0; i < this.calls.length; i++) {
      if(this.calls[i].returnValue.match(obj)) {
        return true;
      }
    }
    return false;
  }

  public alwaysReturned(obj: any): boolean {
    var count = 0;
    for(var i = 0; i < this.calls.length; i++) {
      if(this.calls[i].returnValue.match(obj)) {
        count = count + 1;
      }
    }
    return (count === this.calls.length);
  }

  public reset(): void {
    this.calls = [];
  }
}

export = Spy;
