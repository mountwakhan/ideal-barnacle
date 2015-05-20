///<reference path="../typings/tsd.d.ts" />

import Spy = require("../source/spy");
import FunctionCall = require("../source/call");

var expect = chai.expect;

describe("Spy Class \n", () => {

  it('should initialize calls when instanciated \n', () => {
    var spy = new Spy();
    expect(spy.getCalls()).to.be.a('array');
    expect(spy.getCalls().length).to.equals(0);
  });

  // Work in progress (Contributions are wellcome)

});
