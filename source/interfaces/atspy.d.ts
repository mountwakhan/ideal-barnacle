/*
* The AtSpy root module provides access to the
* available decorators and utilities.
*/

interface IAtSpy {
  getSpies(obj : any) : ISpy[];
  decorators : {
    class : ClassDecorator,
    method : MethodDecorator
  }
}
