/// <reference path="./type_checker.d.ts"/>

/*
* When a funciton being observed by a Spy is invoked a new
* instance of Call is created. Some of the details a about the
* function Call (eg. returnValue) are wrapped with a TypeChecker.
*
* The Spy is not in charge of creating the Call instances. That
* responsibility  is in hands of the decorators.
*/
interface ICall {
  highResTimeStamp : number;
  thisValue: ITypeChecker;
  args: ITypeChecker[];
  returnValue: ITypeChecker;
  exception: any;
  calledWithNew : boolean;

  // Returns true if obj was this for this call.
  calledOn(obj: any): boolean;

  // Returns true if call received provided arguments (and possibly others).
  calledWith(...args: any[]): boolean;

  // Returns true if call received provided arguments and no others.
  calledWithExactly(...args: any[]): boolean;

  // Returns true if call did not receive provided arguments.
  notCalledWith(...args: any[]): boolean;

  // Returns true if call received matching arguments (and possibly others).
  calledWithMatch(...args : ((tc : ITypeChecker) => boolean)[]) : boolean;

  // Returns true if call did not receive matching arguments.
  notCalledWithMatch(...args: ((tc : ITypeChecker) => boolean)[]): boolean;

  // Returns true if call threw an exception / threw exception of provided type.
  threw(obj?: any): boolean;
}
