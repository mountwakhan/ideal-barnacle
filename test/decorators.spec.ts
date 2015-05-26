///<reference path="../typings/tsd.d.ts" />

import Spy = require("../source/spy");
import FunctionCall = require("../source/call");
import decorators = require("../source/decorators");

var spyClass = decorators.class;
var spyMethod = decorators.method;

var expect = chai.expect;

class Calculator {
  @spyMethod
  public sume(a : number, b : number) : number {
    return a + b;
  }
  @spyMethod
  public multiply(a : number, b : number) : number {
   return a * b;
  }
}

class Animal {
    name:string;
    constructor(theName: string) { this.name = theName; }
    move(meters: number = 0) {
        return this.name + " moved " + meters + "m.";
    }
}

class Bad {
  @spyMethod
  public throw() {
    throw new Error("someError");
  }
}

@spyClass
class Snake extends Animal {
    constructor(name: string) { super(name); }
    bite(posion : boolean){
      if(posion === true) {
        return "you are going to die!";
      }
      else {
        return "don't worry too much about it!";
      }
    }
}

describe("Method Decorator \n", () => {

  it('should log a function call when decorated method is invoked \n', () => {
    var calculator = new Calculator();
    var result1 = calculator.multiply(2,3);
    var result2 = calculator.multiply(5,5);

    var mSpy : ISpy = (<any>calculator).spies.multiply;

    expect(mSpy.getCalls().length).to.equal(2);
    expect(mSpy.getCalls()[0].returnValue.value()).to.equal(result1);
    expect(mSpy.getCalls()[1].returnValue.value()).to.equal(result2);
    expect(mSpy.getCalls()[0].thisValue.value()).to.be.a("object");
    expect(mSpy.getCalls()[1].thisValue.value()).to.equal(calculator);
  });

  it('should log a function call when decorated class method are invoked \n', () => {
    var snake = new Snake("peter");
    var result1 = snake.move();
    var result2 = snake.bite(true);
    var result3 = snake.bite(false);

    var s = (<any>snake).spies;
    var moveSpy : ISpy = s.move;
    var biteSpy : ISpy = s.bite;

    // expected spies for methods "move" & "bite"
    expect(Object.getOwnPropertyNames(s).length).to.equal(2);

    expect(moveSpy.getCalls().length).to.equal(1);
    expect(biteSpy.getCalls().length).to.equal(2);
    expect(moveSpy.getCalls()[0].args.length).to.equal(0);
    expect(biteSpy.getCalls()[0].args.length).to.equal(1);
    expect(biteSpy.getCalls()[0].args[0].value()).to.equal(true);
    expect(biteSpy.getCalls()[1].args.length).to.equal(1);
    expect(biteSpy.getCalls()[1].args[0].value()).to.equal(false);
    expect(biteSpy.getCalls()[0].returnValue.match("you are going to die!")).to.be.true;
    expect(biteSpy.getCalls()[1].returnValue.match("don't worry too much about it!")).to.be.true;
    expect(biteSpy.getCalls()[0].thisValue.value()).to.equal(snake);
    expect(moveSpy.getCalls()[0].thisValue.value()).to.equal(snake);
  });

  it('should log a function call when decorated class method are invoked \n', () => {
    var bad = new Bad();
    try {
      bad.throw();
    }
    catch(e) { /* DO NOTHING */ }
    finally {
      var s : Spy = (<any>bad).spies.throw;
      expect(Object.getOwnPropertyNames(s).length).to.equal(1);
      expect(s.getCalls()[0].args.length).to.equal(0);
      expect(s.getCalls()[0].returnValue.isDefined()).to.be.false;
      expect(s.getCalls()[0].exception.message).to.equal("someError");
    }
  });

});
