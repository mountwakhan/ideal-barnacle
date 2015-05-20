///<reference path="../typings/tsd.d.ts" />

import Matcher = require("../source/matcher");

var expect = chai.expect;

describe("Spy Class \n", () => {

  it('should set value correctly when instanciated\n', () => {
    var m = new Matcher(1);
    expect(m.isNumber()).to.be.true;
    expect(m.match(1)).to.be.true;
  });

  // Work in progress (Contributions are wellcome)

});
