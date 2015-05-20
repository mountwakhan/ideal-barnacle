/// <reference path="./spy.d.ts"/>
/// <reference path="./function_call.d.ts"/>

class Spy implements SpyInterface {

  private calls: ICall[];

  constructor() {
    this.calls = [];
  }

  public getCalls() : ICall[] {
    return this.calls;
  }

  public withArgs(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  }

  public callCount(): number {
    return this.calls.length;
  };

  public called(): boolean {
    return (this.calls.length > 0);
  };

  public calledOnce(): boolean {
    return (this.calls.length === 1);
  };

  public calledTwice(): boolean {
    return (this.calls.length === 2);
  };

  public calledThrice(): boolean {
    return (this.calls.length === 3);
  };

  public firstCall(): ICall {
    return (this.calls.length > 1) ? this.calls[0] : null;
  };

  public secondCall(): ICall {
    return (this.calls.length > 1) ? this.calls[1] : null;
  };

  public thirdCall(): ICall {
    return (this.calls.length > 1) ? this.calls[2] : null;
  };

  public lastCall(): ICall {
    return this.calls[this.calls.length - 1];
  };

  public getCall(n: number): ICall {
    return (this.calls.length >= n) ? this.calls[n - 1] : null;
  };

  // NOTE based on SinonJS not sure aboit being able to do this with the
  // decorator approach. Maybe we can store the performance now() API ?
  // http://updates.html5rocks.com/2012/08/When-milliseconds-are-not-enough-performance-now
  public calledBefore(anotherSpy): boolean {
    throw new Error("Not implemented exception");
  };

  // NOTE based on SinonJS not sure aboit being able to do this with the
  // decorator approach. Maybe we can store the performance now() API ?
  // http://updates.html5rocks.com/2012/08/When-milliseconds-are-not-enough-performance-now
  public calledAfter(anotherSpy): boolean {
    throw new Error("Not implemented exception");
  };

  public calledOn(obj): boolean {
    throw new Error("Not implemented exception");
  };

  public alwaysCalledOn(obj): boolean {
    throw new Error("Not implemented exception");
  };

  public calledWith(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  };

  public alwaysCalledWith(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  };

  public calledWithExactly(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  };

  public alwaysCalledWithExactly(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  };

  public calledWithMatch(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  };

  public alwaysCalledWithMatch(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  };

  public calledWithNew(): boolean {
    throw new Error("Not implemented exception");
  };

  public neverCalledWith(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  };

  public neverCalledWithMatch(...args: any[]): boolean {
    throw new Error("Not implemented exception");
  };

  public threw(obj?: any): boolean {
    throw new Error("Not implemented exception");
  };

  public alwaysThrew(obj?: any): boolean {
    throw new Error("Not implemented exception");
  };

  public returned(obj: any): boolean {
    throw new Error("Not implemented exception");
  };

  public alwaysReturned(obj: any): boolean {
    throw new Error("Not implemented exception");
  };

  public reset(): void {
    this.calls = [];
  };
}

export = Spy;
