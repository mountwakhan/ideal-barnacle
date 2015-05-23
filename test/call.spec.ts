///<reference path="../typings/tsd.d.ts" />

import Call = require("../source/call");

var expect = chai.expect;

describe("Call Class \n", () => {

  it('should initialize correctly when instanciated \n', () => {
    var expected = [2, "3"];
    var value = { test : "test" };
    var fCall = new Call(value, false, expected);

    expect(fCall.args).to.be.a('array');
    expect(fCall.args.length).to.equals(2);
    var expected = [2, "3"];
    for(var i; i < expected.length; i++) {
      expect(fCall.args[i]).to.equals(expect[i]);
    }

    expect(fCall.thisValue.value()).to.be.a('object');
    expect(fCall.thisValue.value().test).to.equals(value.test);

    expect(fCall.calledWithNew).to.be.a('boolean');
    expect(fCall.calledWithNew).to.equals(false);

    expect(fCall.exception).to.equals(undefined);
    expect(fCall.returnValue).to.equals(undefined);
  });

  // Work in progress (Contributions are wellcome)

});
