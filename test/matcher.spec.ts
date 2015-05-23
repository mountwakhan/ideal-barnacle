///<reference path="../typings/tsd.d.ts" />
/// <reference path="../source/interfaces/type_checker.d.ts"/>

import TypeChecker = require("../source/type_checker");
import Matcher = require("../source/matcher");

var expect = chai.expect;

describe("Matcher Class \n", () => {

  it('should be able to validate a number \n', () => {
    var m = new Matcher();
    var isNumberMatcher = m.isNumber;
    expect(isNumberMatcher(new TypeChecker(5))).to.be.true;
    expect(isNumberMatcher(new TypeChecker(true))).to.be.false;
    expect(isNumberMatcher(new TypeChecker("test"))).to.be.false;
    expect(isNumberMatcher(new TypeChecker({ test : "test" }))).to.be.false;
  });

  // Work in progress (Contributions are wellcome)

});
