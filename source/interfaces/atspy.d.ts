/// <reference path="./call.d.ts"/>
/// <reference path="./spy.d.ts"/>

/*
* The AtSpy root module provides access to the
* available decorators and utilities.
*/

interface IAtSpy {
  getSpies(obj : any) : ISpy[];
  getCallStack(spies : ISpy[]) : ICall[];
  decorators : {
    class : ClassDecorator,
    method : MethodDecorator
  }
}
