# TypeScript @spy decorator

[![Join the chat at https://gitter.im/AtSpy/typescript-spy-decorator](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/AtSpy/typescript-spy-decorator?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## @spy is a TypeScript decorator which allows developers to spy method calls during the software testing process.

## What is a spy?
A spy is a function that records some details  about a function when it is invoked. Some of these details recored include:

- Arguments.
- Return value.
- The value of this.
- A exception thrown (if any).

Spies are useful to test how certain methods are used throughout a system under test. The following example shows how to use the @spy decorator to observe some methods.

Using @spy is really easy.

## 1. Write some code
Let's write a simple class to demonstrate how to use the @spy decorator.

```
class Calculator {
  public sume(a : number, b : number) : number {
    return a + b;
  }
  public multiply(a : number, b : number) : number {
   return a * b;
  }
}
```

## 2. Decorate classes or methods with the @spy decorator
@spy can spy on methods. When doing so, the original function will behave just as normal but you will have access to data about all calls.

```
class Calculator {
  public sume(a : number, b : number) : number {
    return a + b;
  }
  @spy
  public multiply(a : number, b : number) : number {
   return a * b;
  }
}
```
We are also working on a class decorator (coming soon):
```
@spy
class Calculator {
  public sume(a : number, b : number) : number {
    return a + b;
  }
  public multiply(a : number, b : number) : number {
   return a * b;
  }
}
```
> **Note: We can add spy to the class declaration and use a gulp task (coming soon) to remove Atspy annotations when deploying to a production environment.**

## 3. Test your code
When the method decorated is invoked the @spy decorator will record the call details.

```
var calculator = new Calculator();
var result1 = calculator.multiply(2, 3);
var result2 = calculator.multiply(5, 5);

var spies = AtSpy.getSpies(calculator).multiply;

s.called();                            // true
s.calledOnce();                        // false
s.calledTwice();                       // true
s.calledThrice();                      // false
s.callCount();                         // 2
s.threw();                             // false
s.firstCall().returnValue;             // Matcher(5)
s.firstCall().returnValue.isDefined(); // true
s.firstCall().returnValue.match(5);    // true
s.firstCall().returnValue.value();     // 5
s.firstCall().returnValue.isNumber();  // true
s.secondCall().args[0].value();        // [5,5]
s.getCalls();                          // Call[] *
s.firstCall();                         // getCalls()[0] *

// * see image bellow

// easy to use with an assertion library
var expect = chai.expect;

expect(s.getCalls().length).to.equal(2);
expect(s.getCalls()[0].returnValue.match(result1)).to.be.true;
expect(s.getCalls()[1].returnValue.match(result1)).to.be.true;
expect(s.getCalls()[0].thisValue.isDefined()).to.be.true;
expect(s.getCalls()[1].thisValue.match(calculator)).to.be.true;
```

![multiply calls](https://upload.wikimedia.org/wikipedia/commons/a/a3/Multiply_calls.png)

## What exactly @spy is able to spy?
Take a look to interfaces to get a sneak peek of what's coming:
- [ISpy](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/spy.d.ts)
- [ICall](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/call.d.ts)


## Work in progress - Pull request are welcome!

There are a good few not implemented methods at:
- [/source/spy.ts](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/spy.ts)
- [/source/call.ts](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/call.ts)

If you are going to contribute check interfaces for implementation details:
- [ISpy](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/spy.d.ts)
- [ICall](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/call.d.ts)

Check out the [issues](https://github.com/AtSpy/typescript-spy-decorator/issues) and use the [chat](https://gitter.im/AtSpy/typescript-spy-decorator) to find a way to collaborate.

Please don't forget to add unit test if you do contribute!
