///<reference path="../typings/tsd.d.ts" />

import Utils = require("../source/utils");

var expect = chai.expect;

describe("Spy Class \n", () => {

  it('should be able to compare primitives \n', () => {
    expect(Utils.areEqual("test", "test")).to.equals(true);
    expect(Utils.areEqual(1, 1)).to.equals(true);
    expect(Utils.areEqual(true, true)).to.equals(true);
    expect(Utils.areEqual("test", "tset")).to.equals(false);
    expect(Utils.areEqual(1, 2)).to.equals(false);
    expect(Utils.areEqual(true, false)).to.equals(false);
  });

  it('should be able to compare complex values \n', () => {
    var address = { number : 1, street : "5th Avenue" };
    var user1 = { name : "User 1", address : address  };

    var user2 = { number : 3, street : "5th Avenue" };
    var user = { name : "User 1", address : address  };

    expect(Utils.areEqual(user1, user2)).to.equals(false);
  });

  // Work in progress (Contributions are wellcome)

});
