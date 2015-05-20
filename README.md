# TypeScript @spy decorator

[![Join the chat at https://gitter.im/AtSpy/typescript-spy-decorator](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/AtSpy/typescript-spy-decorator?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## @spy is a open-source TypeScript decorator which allows developers to spy method calls during the software testing process. 

## What is a spy?
A spy is a function that records some details  about a function when it is invoked. Some of these details recored include:

- Arguments.
- Return value.
- The value of this. 
- A exception thrown (if any). 

Spies are useful to test how certain methods are used throughout a system under test. The following example shows how to use the @spy decorator to observe some methods.

## Code
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
## Spy
@spy can spy on existing methods. When doing so, the original function will behave just as normal but you will have access to data about all calls. 
```
import spy = require("spy-decorator");

class CalculatorSpy extends Calculator {
  public spies: any; // Set by decorator
  @spy
  public sume(a : number, b : number) : number {
    return super.sume(a, b);
  }
  @spy
  public multiply(a : number, b : number) : number {
    return super.multiply(a, b);
  }
}
```
Alternatively, we can add spy directly to the class declaration and use a gulp task (coming soon) to remove @spy annotations when deploying top a production environment.
```
class Calculator {
  @spy
  public sume(a : number, b : number) : number {
    return a + b;
  }
  @spy
  public multiply(a : number, b : number) : number {
   return a * b;
  }
}
```
We are also going to develop a class decorator:
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

## Test
When the method decorated is invoked the @spy decorator will record the call details.
```
var calculator = new CalculatorSpy();

// sume spy

calculator.sume(2, 3);
calculator.sume(5, 5);

calculator.spies.sume.called();                    // true
calculator.spies.sume.calledOnce();                // false
calculator.spies.sume.calledTwice();               // true
calculator.spies.sume.calledThrice();              // false
calculator.spies.sume.callCount();                 // 2
calculator.spies.sume.threw();                     // false
calculator.spies.sume.calls;                       // FunctionCall[] (see image bellow)
calculator.spies.sume.firstCall();                 // calls[0] (see image bellow)
calculator.spies.sume.firstCall().returnValue;     // 5
calculator.spies.sume.secondCall().args;           // [5,5]

// multiply spy

calculator.multiply(2, 3);
calculator.multiply(5, 5);

calculator.spies.multiply.called();                // true
calculator.spies.multiply.calledOnce();            // false
calculator.spies.multiply.firstCall().args;        // [2,3]
calculator.spies.multiply.firstCall().returnValue; // 6
```
![multiply calls](https://upload.wikimedia.org/wikipedia/commons/a/a3/Multiply_calls.png)

## What exactly @spy is able to spy?
Take a look to interfaces to get a sneak peek of what's coming:
- [SpyInterface](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/spy.d.ts)
- [FunctionCallInterface](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/function_call.d.ts)


## Work in progress - Pull request are welcome!

There are a good few not implemented methods at:
- [/source/spy.ts](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/spy.ts)
- [/source/function_call.ts](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/function_call.ts)

If you are going to contribute check interfaces for implementation details:
- [SpyInterface](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/spy.d.ts)
- [FunctionCallInterface](https://github.com/remojansen/typescript-spy-decorator/tree/master/source/function_call.d.ts)

Please don't forget to add unit test id you do contribute!
