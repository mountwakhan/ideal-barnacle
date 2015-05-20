/// <reference path="./function_call.d.ts"/>

interface SpyInterface {

  //Return the recorded calls.
  getCalls(): FunctionCallInterface[];

  // The number of recorded calls.
  callCount(): number;

  // true if the spy was called at least once
  called(): boolean;

  // true if spy was called exactly once
  calledOnce(): boolean;

  // true if the spy was called exactly twice
  calledTwice(): boolean;

  // true if the spy was called exactly thrice
  calledThrice(): boolean;

  // The first call
  firstCall(): FunctionCallInterface;

  // The second call
  secondCall(): FunctionCallInterface;

  // The third call
  thirdCall(): FunctionCallInterface;

  // The last call
  lastCall(): FunctionCallInterface;

  // The n call
  getCall(n: number): FunctionCallInterface;

  // Returns true if the spy was called before anotherSpy
  calledBefore(anotherSpy): boolean;

  // Returns true if the spy was called after anotherSpy
  calledAfter(anotherSpy): boolean;

  //  Returns true if the spy was called at least once with obj as this.
  calledOn(obj): boolean;

  // Returns true if the spy was always called with obj as this.
  alwaysCalledOn(obj): boolean;

  // Returns true if spy was called at least once with the provided arguments.
  calledWith(...args: any[]): boolean;

  // Returns true if spy was always called with the provided arguments (and possibly others).
  alwaysCalledWith(...args: any[]): boolean;

  // Returns true if spy was called at least once with the provided arguments and no others.
  calledWithExactly(...args: any[]): boolean;

  // Returns true if spy was always called with the exact provided arguments.
  alwaysCalledWithExactly(...args: any[]): boolean;

  // Returns true if spy was called with matching arguments (and possibly others).
  calledWithMatch(...args: any[]): boolean;

  // Returns true if spy was always called with matching arguments (and possibly others).
  alwaysCalledWithMatch(...args: any[]): boolean;

  // Returns true if spy was called the new operator.
  calledWithNew(): boolean;

  // Returns true if the spy/stub was never called with the provided arguments.
  neverCalledWith(...args: any[]): boolean;

  // Returns true if the spy/stub was never called with matching arguments.
  neverCalledWithMatch(...args: any[]): boolean;

  // Returns true if spy threw an exception or  an exception of the provided type at least once.
  threw(obj?: any): boolean;

  // Returns true if spy always threw an exception.
  alwaysThrew(obj?: any): boolean;

  // Returns true if spy returned the provided value at least once.
  returned(obj: any): boolean;

  // Returns true if spy always returned the provided value.
  alwaysReturned(obj: any): boolean;

  // Resets the state of a spy.
  reset(): void;
}
