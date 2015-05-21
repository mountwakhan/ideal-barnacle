interface AtSpy {
  getSpies(obj : any) : ISpy[];
  decorators : {
    class : ClassDecorator,
    method : MethodDecorator
  }
}
