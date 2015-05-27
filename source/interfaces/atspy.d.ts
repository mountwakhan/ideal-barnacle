/// <reference path="./call.d.ts"/>
/// <reference path="./spy.d.ts"/>

/*
* The AtSpy root module provides access to the
* available decorators and utilities.
*/

interface IAtSpy {

  // gets list of spies form an instance of a class being observed
  getSpies(obj : any) : ISpy[];

  // get the class in an array of spies sorted by highResTimeStamp
  getCallStack(spies : ISpy[]) : ICall[];

  // Provides access to the spy decorators
  decorators : {
    class : ClassDecorator,
    method : MethodDecorator
  }
}
