///<reference path="../typings/tsd.d.ts" />

import Call = require("../source/call");

var expect = chai.expect;

describe("Spy Class \n", () => {

  it('should initialize correctly when instanciated \n', () => {
    var expected = [2, "3"];
    var value = { test : "test" };
    var fCall = new Call({ test : "test" }, false, expected);

    expect(fCall.args).to.be.a('array');
    expect(fCall.args.length).to.equals(2);
    var expected = [2, "3"];
    for(var i; i < expected.length; i++) {
      expect(fCall.args[i]).to.equals(expect[i]);
    }

    expect(fCall.thisValue).to.be.a('object');
    expect(fCall.thisValue.match(value)).to.equals('test');

    expect(fCall.calledWithNew).to.be.a('boolean');
    expect(fCall.thisValue.match(value)).to.equals(false);

    expect(fCall.exception).to.equals(undefined);
    expect(fCall.returnValue).to.equals(undefined);
  });

  // Work in progress (Contributions are wellcome)

});
