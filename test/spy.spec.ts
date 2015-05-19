///<reference path="../typings/tsd.d.ts" />

import Spy = require("../source/spy");
import FunctionCall = require("../source/function_call");

var expect = chai.expect;

describe("Spy Class \n", () => {

  it('should initialize calls when instanciated \n', () => {
    var spy = new Spy();
    expect(spy.calls).to.be.a('array');
    expect(spy.calls.length).to.equals(0);
  });

  it('should reset calls when reset is incoked \n', () => {
    var spy = new Spy();
    var fCall = new FunctionCall(null, null, null);
    spy.calls.push(fCall);
    expect(spy.calls).to.be.a('array');
    expect(spy.calls.length).to.equals(1);
    spy.reset();
    expect(spy.calls).to.be.a('array');
    expect(spy.calls.length).to.equals(0);
  });

  // Work in progress (Contributions are wellcome)

});
