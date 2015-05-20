/// <reference path="./matcher.d.ts"/>

interface ICall {
  thisValue: IMatcher;
  args: IMatcher[];
  returnValue: IMatcher;
  exception: any;
  calledWithNew : boolean;

  // Returns true if obj was this for this call.
  calledOn(obj: any): boolean;

  // Returns true if call received provided arguments (and possibly others).
  calledWith(...args: any[]): boolean;

  // Returns true if call received provided arguments and no others.
  calledWithExactly(...args: any[]): boolean;

  // Returns true if call received matching arguments (and possibly others).
  calledWithMatch(...args: any[]): boolean;

  // Returns true if call did not receive provided arguments.
  notCalledWith(...args: any[]): boolean;

  // Returns true if call did not receive matching arguments.
  notCalledWithMatch(...args: any[]): boolean;

  // Returns true if call threw an exception / threw exception of provided type.
  threw(obj?: any): boolean;
}
