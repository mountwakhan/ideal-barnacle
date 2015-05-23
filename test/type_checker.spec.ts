///<reference path="../typings/tsd.d.ts" />

import TypeChecker = require("../source/type_checker");

var expect = chai.expect;

describe("TypeChecker Class \n", () => {

  it('should set value correctly when instanciated \n', () => {
    var m = new TypeChecker(1);
    expect(m.value()).to.equal(1);
    expect(m.value()).to.be.a("number");
  });

  // Work in progress (Contributions are wellcome)

});
