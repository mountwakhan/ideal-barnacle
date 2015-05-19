///<reference path="../typings/tsd.d.ts" />

import Spy = require("../source/spy");
import FunctionCall = require("../source/function_call");
import spy = require("../source/spy_decorator");

var expect = chai.expect;

class Calculator {
  public sume(a : number, b : number) : number {
    return a + b;
  }
  public multiply(a : number, b : number) : number {
   return a * b;
  }
}

class CalculatorSpy extends Calculator {
  public spies: any; // Set by decorator
  @spy
  public sume(a : number, b : number) : number {
    return super.sume(a, b);
  }
  @spy
  public multiply(a : number, b : number) : number {
    return super.multiply(a, b);
  }
}

describe("Spy Class \n", () => {

  it('should log a function call when decorated method is invoked \n', () => {
    var tester = new CalculatorSpy();
    var result1 = tester.multiply(2, 3);
    var result2 = tester.multiply(5, 5);
    var multiplySpy : SpyInterface = tester.spies.multiply;
    expect(multiplySpy.calls.length).to.equal(2);
    expect(multiplySpy.calls[0].returnValue).to.equal(result1);
    expect(multiplySpy.calls[1].returnValue).to.equal(result2);
    expect(multiplySpy.calls[0].thisValue).to.equal(tester);
    expect(multiplySpy.calls[1].thisValue).to.equal(tester);
  });

  // Work in progress (Contributions are wellcome)

});
