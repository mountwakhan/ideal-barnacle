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

  it('should know if a function was invoked \n');                       // TODO
  it('should know if a function was invoked 2 times \n');               // TODO
  it('should know if a function was invoked 3 times \n');               // TODO
  it('should know how many times a function was invoked \n');           // TODO
  it('should be able to return the details of the firt call \n');       // TODO
  it('should be able to return the details of the second call \n');     // TODO
  it('should be able to return the details of the third call \n');      // TODO
  it('should be able to return the details of the last call \n');       // TODO
  it('should be able to return the details of a call by its index \n'); // TODO
  
});
