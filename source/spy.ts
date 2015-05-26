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
    return (this.calls.length >= n) ? this.calls[n - 1] : null;
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

  public calledBefore(anotherSpy): boolean {
    throw new Error("Not implemented exception");
  }

  public calledAfter(anotherSpy): boolean {
    throw new Error("Not implemented exception");
  }

  public withArgs(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  }

  public calledWith(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  }

  public alwaysCalledWith(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  }

  public calledWithExactly(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  }

  public alwaysCalledWithExactly(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  }

  public calledWithMatch(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  }

  public alwaysCalledWithMatch(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  }

  public calledWithNew(): boolean {
    throw new Error("Not implemented exception");
  }

  public neverCalledWith(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  }

  public neverCalledWithMatch(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  }

  public threw(obj?: any): boolean {
    throw new Error("Not implemented exception");
  }

  public alwaysThrew(obj?: any): boolean {
    throw new Error("Not implemented exception");
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
