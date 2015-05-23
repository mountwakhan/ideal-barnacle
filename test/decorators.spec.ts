///<reference path="../typings/tsd.d.ts" />

import Spy = require("../source/spy");
import FunctionCall = require("../source/call");
import decorators = require("../source/decorators");

var spy = decorators.method;

var expect = chai.expect;

class Calculator {
  @spy
  public sume(a : number, b : number) : number {
    return a + b;
  }
  @spy
  public multiply(a : number, b : number) : number {
   return a * b;
  }
}

describe("Method Decorator \n", () => {

  it('should log a function call when decorated method is invoked \n', () => {
    var calculator = new Calculator();
    var result1 = calculator.multiply(2,3);
    var result2 = calculator.multiply(5,5);

    var mSpy : ISpy = (<any>calculator).spies.multiply;

    expect(mSpy.getCalls().length).to.equal(2);
    expect(mSpy.getCalls()[0].returnValue.value()).to.equal(result1);
    expect(mSpy.getCalls()[1].returnValue.value()).to.equal(result2);
    expect(mSpy.getCalls()[0].thisValue.value()).to.be.a("object");
    expect(mSpy.getCalls()[1].thisValue.value()).to.equal(calculator);
  });

  // Work in progress (Contributions are wellcome)

});
