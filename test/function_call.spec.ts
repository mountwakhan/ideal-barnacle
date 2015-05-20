///<reference path="../typings/tsd.d.ts" />

import FunctionCall = require("../source/function_call");

var expect = chai.expect;

describe("Spy Class \n", () => {

  it('should initialize correctly when instanciated \n', () => {
    var expected = [2, "3"];
    var fCall = new FunctionCall({ test : "test" }, false, expected);

    expect(fCall.args).to.be.a('array');
    expect(fCall.args.length).to.equals(2);
    var expected = [2, "3"];
    for(var i; i < expected.length; i++) {
      expect(fCall.args[i]).to.equals(expect[i]);
    }

    expect(fCall.thisValue).to.be.a('object');
    expect(fCall.thisValue.test).to.equals('test');

    expect(fCall.calledWithNew).to.be.a('boolean');
    expect(fCall.thisValue.test).to.equals(false);

    expect(fCall.exception).to.equals(undefined);
    expect(fCall.returnValue).to.equals(undefined);
  });

  // Work in progress (Contributions are wellcome)

});
